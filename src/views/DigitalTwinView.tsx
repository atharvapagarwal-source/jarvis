import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Thermometer,
  Droplets,
  Zap,
  Users,
  Video,
  MessageSquareWarning,
  Activity,
  Layers,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { mockBuildingData } from '../data/mockData';
import type { BuildingFloor } from '../types';
import { Badge } from '../components/common/Badge';

export const DigitalTwinView: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedFloor, setSelectedFloor] = useState<BuildingFloor>(mockBuildingData.floors[1]); // Floor 3 by default
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0B0F19');
    scene.fog = new THREE.FogExp2('#0B0F19', 0.03);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 12, 16);
    camera.lookAt(0, 2.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x06b6d4, 1.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 1, 30);
    pointLight.position.set(-10, 10, -10);
    scene.add(pointLight);

    // Grid Floor Base
    const gridHelper = new THREE.GridHelper(30, 30, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // Multi-Floor Building Group
    const buildingGroup = new THREE.Group();
    const floorMeshes: THREE.Mesh[] = [];

    // Building Dimensions
    const floorWidth = 7;
    const floorDepth = 5;
    const floorHeight = 1.0;
    const gap = 0.4;

    mockBuildingData.floors.forEach((floor, index) => {
      const yPos = index * (floorHeight + gap);

      // Color coding based on status
      let colorHex = 0x10b981; // Green
      if (floor.status === 'warning') colorHex = 0xf59e0b; // Yellow
      if (floor.status === 'critical') colorHex = 0xf43f5e; // Red

      // Floor Slab (Glassmorphic Box)
      const geometry = new THREE.BoxGeometry(floorWidth, floorHeight, floorDepth);
      const material = new THREE.MeshPhongMaterial({
        color: colorHex,
        transparent: true,
        opacity: selectedFloor.id === floor.id ? 0.85 : 0.45,
        shininess: 90,
        wireframe: false,
      });

      const slab = new THREE.Mesh(geometry, material);
      slab.position.set(0, yPos, 0);
      slab.userData = { floorId: floor.id };
      buildingGroup.add(slab);
      floorMeshes.push(slab);

      // Floor Edge Glow Lines
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMat = new THREE.LineBasicMaterial({
        color: selectedFloor.id === floor.id ? 0x06b6d4 : 0x475569,
        linewidth: 2,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      wireframe.position.set(0, yPos, 0);
      buildingGroup.add(wireframe);

      // Status Indicator Light Pillar
      const lightGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.4, 16);
      const lightMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const lightMesh = new THREE.Mesh(lightGeo, lightMat);
      lightMesh.position.set(floorWidth / 2 - 0.4, yPos + floorHeight / 2 + 0.2, floorDepth / 2 - 0.4);
      buildingGroup.add(lightMesh);
    });

    scene.add(buildingGroup);

    // Mouse Interaction / Raycasting for selecting floor
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(floorMeshes);

      if (intersects.length > 0) {
        const clickedId = intersects[0].object.userData.floorId;
        const matched = mockBuildingData.floors.find((f) => f.id === clickedId);
        if (matched) setSelectedFloor(matched);
      }
    };

    renderer.domElement.addEventListener('click', handlePointerDown);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (autoRotate) {
        buildingGroup.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handlePointerDown);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedFloor.id, autoRotate]);

  return (
    <div className="space-y-6">
      {/* Page Description */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">JARVIS Multi-Floor 3D Mesh Engine</h2>
            <p className="text-xs text-slate-400">
              Interactive 3D Three.js Digital Twin of physical building structure with floor isolation raycasting.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center space-x-1.5 transition-colors ${
              autoRotate
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
            <span>{autoRotate ? 'Auto-Rotating' : 'Paused Rotation'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas + Floor Telemetry Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Three.js Canvas */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-slate-800 relative h-[520px] overflow-hidden flex flex-col">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* 3D Visual Legend Overlay */}
          <div className="absolute top-4 left-4 z-10 glass-card p-3 rounded-xl border border-slate-700/80 text-xs space-y-2 pointer-events-none">
            <p className="font-semibold text-slate-200 uppercase tracking-wider text-[10px]">Floor Status Index</p>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-300 text-[11px]">Green = Normal</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-300 text-[11px]">Yellow = Warning Alert</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-slate-300 text-[11px]">Red = Critical Anomaly</span>
            </div>
          </div>

          {/* Instruction Tooltip */}
          <div className="absolute bottom-4 left-4 z-10 glass-card px-3 py-1.5 rounded-lg border border-slate-700/80 text-[11px] text-cyan-300 flex items-center space-x-2">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Click any 3D floor slab to view telemetry</span>
          </div>
        </div>

        {/* Selected Floor Telemetry Panel */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div>
            {/* Floor Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Selected Telemetry</span>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">{selectedFloor.name}</h3>
              </div>
              <Badge variant={selectedFloor.status === 'warning' ? 'warning' : 'success'} size="md">
                {selectedFloor.status.toUpperCase()}
              </Badge>
            </div>

            {/* Floor Selection Buttons */}
            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {mockBuildingData.floors.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFloor(f)}
                  className={`py-2 text-center rounded-lg text-xs font-bold transition-all border ${
                    selectedFloor.id === f.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {f.floorNumber === 0 ? 'GF' : `F${f.floorNumber}`}
                </button>
              ))}
            </div>

            {/* Metrics Breakdown */}
            <div className="mt-6 space-y-3">
              {/* Temp */}
              <div className="glass-card p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Temperature</span>
                    <span className="text-sm font-bold text-white">{selectedFloor.temperature}°C</span>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold ${selectedFloor.temperature > 26 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {selectedFloor.temperature > 26 ? 'Elevated' : 'Optimal'}
                </span>
              </div>

              {/* Humidity */}
              <div className="glass-card p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Humidity</span>
                    <span className="text-sm font-bold text-white">{selectedFloor.humidity}%</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400">Normal</span>
              </div>

              {/* Electricity */}
              <div className="glass-card p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Electricity Usage</span>
                    <span className="text-sm font-bold text-white">{selectedFloor.electricityUsage} kWh</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-300">Live Load</span>
              </div>

              {/* Occupancy */}
              <div className="glass-card p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Occupancy Count</span>
                    <span className="text-sm font-bold text-white">{selectedFloor.occupancy} People</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-cyan-400 font-mono">Sensors Active</span>
              </div>

              {/* CCTV & Complaints */}
              <div className="grid grid-cols-2 gap-2">
                <div className="glass-card p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center space-x-2 text-emerald-400 mb-1">
                    <Video className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold">CCTV Status</span>
                  </div>
                  <span className="text-xs font-bold text-white">{selectedFloor.cctvStatus}</span>
                </div>

                <div className="glass-card p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center space-x-2 text-rose-400 mb-1">
                    <MessageSquareWarning className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold">Complaints</span>
                  </div>
                  <span className="text-xs font-bold text-white">{selectedFloor.complaintsCount} Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Status Notice */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3 text-xs">
            <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-slate-300">
              <span className="font-semibold text-white">Equipment Status: </span>
              {selectedFloor.equipmentAlerts > 0
                ? `${selectedFloor.equipmentAlerts} Maintenance Alert Required`
                : 'All Equipment Operating Normally'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
