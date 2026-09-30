export type UserRole = 'Administrator' | 'Facility Manager' | 'Security' | 'Resident';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface BuildingFloor {
  id: string;
  floorNumber: number;
  name: string;
  temperature: number; // °C
  humidity: number; // %
  electricityUsage: number; // kWh
  occupancy: number;
  cctvStatus: 'Operational' | 'Warning' | 'Offline';
  complaintsCount: number;
  equipmentAlerts: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface Building {
  id: string;
  name: string;
  healthScore: number;
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Critical';
  floors: BuildingFloor[];
}

export interface AIInsight {
  id: string;
  severity: 'warning' | 'info' | 'critical' | 'success';
  message: string;
  timestamp: string;
  module: string;
  details: string;
}

export interface CCTVCamera {
  id: string;
  name: string;
  location: string;
  status: 'LIVE' | 'OFFLINE' | 'RECORDING';
  detectedObjects: {
    people: number;
    cars: number;
    motorcycles: number;
    trucks?: number;
    bicycles?: number;
  };
  streamUrl?: string;
}

export interface DetectionEvent {
  id: string;
  cameraId: string;
  cameraName: string;
  objectType: string;
  confidence: number;
  timestamp: string;
}

export interface EmergencyAlert {
  id: string;
  type: string;
  location: string;
  severity: 'Warning' | 'Critical' | 'Info';
  timestamp: string;
  status: 'Active' | 'Resolved' | 'Investigating';
}

export interface EmergencyEquipment {
  id: string;
  name: string;
  location: string;
  status: 'Available' | 'Operational' | 'Inspection Due' | 'Maintenance Required';
  lastInspection: string;
  nextInspection: string;
}

export interface EnergyReading {
  time: string;
  gridUsage: number; // kWh
  solarYield: number; // kWh
  cost: number; // ₹
}

export interface Worker {
  id: string;
  workerId: string;
  name: string;
  department: string;
  entryTime: string;
  exitTime: string;
  status: 'Present' | 'Absent' | 'On Leave';
  attendanceRate: number; // %
}

export interface ParkingSlot {
  id: string;
  slotNumber: string;
  floor: string;
  status: 'Available' | 'Occupied' | 'Reserved';
  vehicleNumber?: string;
  entryTime?: string;
}

export interface VehicleActivity {
  id: string;
  vehicleNumber: string;
  vehicleType: 'Car' | 'Motorcycle' | 'SUV' | 'EV';
  entryTime: string;
  exitTime?: string;
  parkingSlot: string;
  duration: string;
}

export interface Complaint {
  id: string;
  complaintId: string;
  category: 'Electrical' | 'Plumbing' | 'Cleaning' | 'Security' | 'Parking' | 'Lift' | 'Other';
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo: string;
  status: 'Registered' | 'In Progress' | 'Solved' | 'Overlooked';
  date: string;
}

export interface WasteBin {
  id: string;
  binId: string;
  location: string;
  fillPercentage: number;
  status: 'Normal' | 'Warning' | 'Full';
  lastEmptied: string;
}

export interface WasteClassificationResult {
  detectedItem: string;
  category: 'Recyclable' | 'Organic' | 'General' | 'Hazardous';
  confidence: number;
}

export interface MaintenanceEquipment {
  id: string;
  name: string;
  health: number; // 0-100%
  status: 'Normal' | 'Maintenance Recommended' | 'High Risk';
  predictedFailureDays: number;
  lastMaintained: string;
  nextPredictedDate: string;
  reason: string;
  vibrationLevel: string;
  temp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: 'warning' | 'info' | 'success' | 'danger';
  module: string;
  read: boolean;
}
