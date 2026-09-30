import type {
  Building,
  AIInsight,
  CCTVCamera,
  DetectionEvent,
  EmergencyAlert,
  EmergencyEquipment,
  EnergyReading,
  Worker,
  VehicleActivity,
  Complaint,
  WasteBin,
  MaintenanceEquipment,
  NotificationItem,
} from '../types';

export const mockBuildingData: Building = {
  id: 'bldg-001',
  name: 'JARVIS Apex Smart Tower',
  healthScore: 92,
  healthStatus: 'Excellent',
  floors: [
    {
      id: 'f-4',
      floorNumber: 4,
      name: 'Floor 4 - Executive Suites & AI Labs',
      temperature: 23.5,
      humidity: 48,
      electricityUsage: 210,
      occupancy: 42,
      cctvStatus: 'Operational',
      complaintsCount: 1,
      equipmentAlerts: 0,
      status: 'normal',
    },
    {
      id: 'f-3',
      floorNumber: 3,
      name: 'Floor 3 - Engineering & Tech Wing',
      temperature: 28.0,
      humidity: 62,
      electricityUsage: 320,
      occupancy: 74,
      cctvStatus: 'Operational',
      complaintsCount: 4,
      equipmentAlerts: 1,
      status: 'warning',
    },
    {
      id: 'f-2',
      floorNumber: 2,
      name: 'Floor 2 - Corporate Offices & Conference',
      temperature: 24.1,
      humidity: 51,
      electricityUsage: 285,
      occupancy: 65,
      cctvStatus: 'Operational',
      complaintsCount: 2,
      equipmentAlerts: 0,
      status: 'normal',
    },
    {
      id: 'f-1',
      floorNumber: 1,
      name: 'Floor 1 - Reception, Cafe & Visitor Lounge',
      temperature: 22.8,
      humidity: 50,
      electricityUsage: 250,
      occupancy: 88,
      cctvStatus: 'Operational',
      complaintsCount: 3,
      equipmentAlerts: 0,
      status: 'normal',
    },
    {
      id: 'f-0',
      floorNumber: 0,
      name: 'Ground Floor - Parking Hub & Utilities',
      temperature: 26.4,
      humidity: 55,
      electricityUsage: 180,
      occupancy: 35,
      cctvStatus: 'Operational',
      complaintsCount: 8,
      equipmentAlerts: 2,
      status: 'warning',
    },
  ],
};

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ins-01',
    severity: 'warning',
    message: 'Electricity consumption is 18% higher than the normal weekday pattern.',
    timestamp: '10:45 AM Today',
    module: 'Electricity & Solar',
    details: 'HVAC load spike detected on Floor 3 between 09:00 AM and 10:30 AM. Recommend adjusting setpoint by +1.5°C.',
  },
  {
    id: 'ins-02',
    severity: 'warning',
    message: 'Fire equipment inspection is due for 3 units on Floor 3.',
    timestamp: '09:15 AM Today',
    module: 'Fire & Emergency',
    details: 'Emergency Light EL-F3-04 and 2 Extinguishers missed quarterly audit cycle.',
  },
  {
    id: 'ins-03',
    severity: 'success',
    message: 'Solar performance is within the expected optimal range.',
    timestamp: '11:00 AM Today',
    module: 'Electricity & Solar',
    details: 'Photovoltaic efficiency measured at 82% efficiency with peak generation yielding 380 kWh.',
  },
  {
    id: 'ins-04',
    severity: 'warning',
    message: '3 complaints have exceeded their expected resolution SLA.',
    timestamp: '08:30 AM Today',
    module: 'Complaints',
    details: 'Plumbing ticket #CMP-104 on Ground Floor pending for 48 hours. Auto-escalated to Facility Lead.',
  },
  {
    id: 'ins-05',
    severity: 'success',
    message: 'Parking capacity is currently available with 28 open slots.',
    timestamp: '11:12 AM Today',
    module: 'Smart Parking',
    details: 'Ground floor Deck A has 18 slots open; Deck B has 10 EV charging slots free.',
  },
];

export const mockCCTVCameras: CCTVCamera[] = [
  {
    id: 'cam-01',
    name: 'Camera 01',
    location: 'Main Entrance & Lobby',
    status: 'LIVE',
    detectedObjects: { people: 18, cars: 5, motorcycles: 3 },
  },
  {
    id: 'cam-02',
    name: 'Camera 02',
    location: 'Ground Floor Parking Deck A',
    status: 'LIVE',
    detectedObjects: { people: 4, cars: 32, motorcycles: 12, trucks: 1 },
  },
  {
    id: 'cam-03',
    name: 'Camera 03',
    location: 'Floor 3 Engineering Corridor',
    status: 'LIVE',
    detectedObjects: { people: 24, cars: 0, motorcycles: 0 },
  },
  {
    id: 'cam-04',
    name: 'Camera 04',
    location: 'West Wing Emergency Stairwell',
    status: 'LIVE',
    detectedObjects: { people: 2, cars: 0, motorcycles: 0 },
  },
];

export const mockDetectionEvents: DetectionEvent[] = [
  { id: 'det-1', cameraId: 'cam-01', cameraName: 'Camera 01', objectType: 'Person', confidence: 0.96, timestamp: '11:14:02 AM' },
  { id: 'det-2', cameraId: 'cam-01', cameraName: 'Camera 01', objectType: 'Car', confidence: 0.94, timestamp: '11:13:45 AM' },
  { id: 'det-3', cameraId: 'cam-02', cameraName: 'Camera 02', objectType: 'Motorcycle', confidence: 0.89, timestamp: '11:12:10 AM' },
  { id: 'det-4', cameraId: 'cam-01', cameraName: 'Camera 01', objectType: 'Person', confidence: 0.98, timestamp: '11:11:05 AM' },
  { id: 'det-5', cameraId: 'cam-03', cameraName: 'Camera 03', objectType: 'Person', confidence: 0.92, timestamp: '11:08:30 AM' },
];

export const mockEmergencyAlerts: EmergencyAlert[] = [
  { id: 'em-01', type: 'Smoke Sensor Alarm', location: 'Floor 3 - Server Room B', severity: 'Warning', timestamp: '10:42 AM Today', status: 'Active' },
  { id: 'em-02', type: 'Water Pressure Drop', location: 'Ground Floor Utility Shaft', severity: 'Info', timestamp: '08:15 AM Today', status: 'Investigating' },
];

export const mockEmergencyEquipment: EmergencyEquipment[] = [
  { id: 'eq-01', name: 'Fire Extinguisher (CO2)', location: 'Floor 1 - Lobby East', status: 'Available', lastInspection: '12 Aug', nextInspection: '12 Nov' },
  { id: 'eq-02', name: 'Addressable Fire Alarm Node', location: 'Floor 2 - Hallway B', status: 'Operational', lastInspection: '10 Aug', nextInspection: '10 Nov' },
  { id: 'eq-03', name: 'Emergency Backup Light Unit', location: 'Floor 3 - West Stairwell', status: 'Inspection Due', lastInspection: '15 May', nextInspection: '15 Aug' },
  { id: 'eq-04', name: 'Wet Pipe Hose Reel Station', location: 'Ground Floor Deck A', status: 'Operational', lastInspection: '01 Sep', nextInspection: '01 Dec' },
];

export const mockEmergencyCosts = [
  { month: 'January', cost: 12500 },
  { month: 'February', cost: 8400 },
  { month: 'March', cost: 15200 },
  { month: 'April', cost: 10800 },
];

export const mockEnergyReadings: EnergyReading[] = [
  { time: '00:00', gridUsage: 35, solarYield: 0, cost: 280 },
  { time: '03:00', gridUsage: 28, solarYield: 0, cost: 224 },
  { time: '06:00', gridUsage: 45, solarYield: 12, cost: 360 },
  { time: '09:00', gridUsage: 140, solarYield: 85, cost: 1120 },
  { time: '12:00', gridUsage: 185, solarYield: 140, cost: 1480 },
  { time: '15:00', gridUsage: 160, solarYield: 110, cost: 1280 },
  { time: '18:00', gridUsage: 120, solarYield: 33, cost: 960 },
  { time: '21:00', gridUsage: 70, solarYield: 0, cost: 560 },
];

export const mockWorkers: Worker[] = [
  { id: 'w-1', workerId: 'W001', name: 'Rahul Sharma', department: 'Security', entryTime: '08:02 AM', exitTime: '05:05 PM', status: 'Present', attendanceRate: 92 },
  { id: 'w-2', workerId: 'W002', name: 'Priya Patel', department: 'HVAC Maintenance', entryTime: '08:15 AM', exitTime: '04:45 PM', status: 'Present', attendanceRate: 96 },
  { id: 'w-3', workerId: 'W003', name: 'Amit Verma', department: 'Electrical Tech', entryTime: '09:00 AM', exitTime: '06:00 PM', status: 'Present', attendanceRate: 88 },
  { id: 'w-4', workerId: 'W004', name: 'Suresh Kumar', department: 'Cleaning & Waste', entryTime: '07:30 AM', exitTime: '03:30 PM', status: 'Present', attendanceRate: 90 },
  { id: 'w-5', workerId: 'W005', name: 'Neha Gupta', department: 'IT Systems', entryTime: '-', exitTime: '-', status: 'Absent', attendanceRate: 78 },
  { id: 'w-6', workerId: 'W006', name: 'Vikram Singh', department: 'Facility Lead', entryTime: '08:30 AM', exitTime: '05:30 PM', status: 'Present', attendanceRate: 98 },
  { id: 'w-7', workerId: 'W007', name: 'Ananya Roy', department: 'Plumbing Specialist', entryTime: '-', exitTime: '-', status: 'On Leave', attendanceRate: 85 },
];

export const mockVehicleActivities: VehicleActivity[] = [
  { id: 'v-1', vehicleNumber: 'MH12AB1234', vehicleType: 'Car', entryTime: '09:12 AM', exitTime: '02:30 PM', parkingSlot: 'A-24', duration: '5h 18m' },
  { id: 'v-2', vehicleNumber: 'MH14CD5678', vehicleType: 'EV', entryTime: '08:45 AM', exitTime: 'Active', parkingSlot: 'EV-03', duration: '2h 30m' },
  { id: 'v-3', vehicleNumber: 'MH12EF9012', vehicleType: 'Motorcycle', entryTime: '09:30 AM', exitTime: 'Active', parkingSlot: 'M-12', duration: '1h 45m' },
  { id: 'v-4', vehicleNumber: 'MH12GH3456', vehicleType: 'SUV', entryTime: '10:05 AM', exitTime: '11:20 AM', parkingSlot: 'B-08', duration: '1h 15m' },
];

export const mockComplaints: Complaint[] = [
  { id: 'cmp-101', complaintId: 'CMP-101', category: 'Electrical', description: 'Flickering LED panel in Floor 2 Conference Room B', priority: 'Medium', assignedTo: 'Amit Verma', status: 'In Progress', date: '2026-09-15' },
  { id: 'cmp-102', complaintId: 'CMP-102', category: 'Plumbing', description: 'Water leakage observed from ceiling near Floor 3 restroom', priority: 'High', assignedTo: 'Ananya Roy', status: 'Registered', date: '2026-09-16' },
  { id: 'cmp-103', complaintId: 'CMP-103', category: 'Cleaning', description: 'Overflowing recyclable bin in Floor 1 lobby area', priority: 'Low', assignedTo: 'Suresh Kumar', status: 'Solved', date: '2026-09-16' },
  { id: 'cmp-104', complaintId: 'CMP-104', category: 'Lift', description: 'Elevator 01 producing abnormal grinding sound on 3rd floor stop', priority: 'Critical', assignedTo: 'Otis Tech Service', status: 'Overlooked', date: '2026-09-14' },
  { id: 'cmp-105', complaintId: 'CMP-105', category: 'Security', description: 'Visitor badge scanner slow to recognize QR codes at entrance', priority: 'Low', assignedTo: 'Rahul Sharma', status: 'Solved', date: '2026-09-16' },
];

export const mockWasteBins: WasteBin[] = [
  { id: 'bin-01', binId: 'Bin 01', location: 'Floor 1 - West Lobby', fillPercentage: 72, status: 'Normal', lastEmptied: '08:00 AM' },
  { id: 'bin-02', binId: 'Bin 02', location: 'Floor 2 - Cafeteria Zone', fillPercentage: 34, status: 'Normal', lastEmptied: '09:30 AM' },
  { id: 'bin-03', binId: 'Bin 03', location: 'Floor 3 - Service Corridor', fillPercentage: 91, status: 'Full', lastEmptied: 'Yesterday 05:00 PM' },
];

export const mockMaintenanceEquipment: MaintenanceEquipment[] = [
  { id: 'm-1', name: 'Elevator Lift 01', health: 87, status: 'Normal', predictedFailureDays: 45, lastMaintained: '15 Aug 2026', nextPredictedDate: '31 Oct 2026', reason: 'Vibration levels baseline normal (0.4 mm/s). Cable tension verified.', vibrationLevel: '0.4 mm/s', temp: '34°C' },
  { id: 'm-2', name: 'Primary Hydro Water Pump', health: 62, status: 'Maintenance Recommended', predictedFailureDays: 14, lastMaintained: '10 Jun 2026', nextPredictedDate: '30 Sep 2026', reason: 'Abnormal vibration spectral peak at 120Hz detected. Bearing wear predicted.', vibrationLevel: '2.8 mm/s', temp: '48°C' },
  { id: 'm-3', name: 'Diesel Emergency Generator', health: 91, status: 'Normal', predictedFailureDays: 60, lastMaintained: '01 Sep 2026', nextPredictedDate: '15 Nov 2026', reason: 'Fuel pressure steady. Battery load test passed.', vibrationLevel: '0.2 mm/s', temp: '31°C' },
  { id: 'm-4', name: 'Central Chiller AC Unit 02', health: 48, status: 'High Risk', predictedFailureDays: 5, lastMaintained: '20 Apr 2026', nextPredictedDate: '21 Sep 2026', reason: 'Refrigerant pressure drop (-15%) and thermal delta anomaly (+4°C above limit).', vibrationLevel: '3.6 mm/s', temp: '59°C' },
];

export const mockNotifications: NotificationItem[] = [
  { id: 'n-1', title: 'High Electricity Consumption', description: 'Floor 3 HVAC usage exceeded baseline by 18%.', timestamp: '12m ago', severity: 'warning', module: 'Electricity & Solar', read: false },
  { id: 'n-2', title: 'Fire Inspection Audit Due', description: '3 emergency lighting units require quarterly signoff.', timestamp: '1h ago', severity: 'danger', module: 'Fire & Emergency', read: false },
  { id: 'n-3', title: 'Complaint SLA Overdue', description: 'Ticket #CMP-104 exceeded 48h resolution SLA.', timestamp: '3h ago', severity: 'warning', module: 'Complaints', read: true },
  { id: 'n-4', title: 'Solar Generation Optimal', description: 'Peak yield reached 380 kWh under clear skies.', timestamp: '5h ago', severity: 'success', module: 'Electricity & Solar', read: true },
  { id: 'n-5', title: 'Parking Deck Available', description: '28 spaces currently vacant on Ground Floor.', timestamp: '6h ago', severity: 'info', module: 'Smart Parking', read: true },
];
