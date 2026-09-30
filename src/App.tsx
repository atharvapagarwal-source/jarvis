import { useState } from 'react';
import type { UserRole, NotificationItem } from './types';
import { mockNotifications } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { JarvisBot } from './components/common/JarvisBot';

import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { DigitalTwinView } from './views/DigitalTwinView';
import { CCTVView } from './views/CCTVView';
import { EmergencyView } from './views/EmergencyView';
import { EnergyView } from './views/EnergyView';
import { AttendanceView } from './views/AttendanceView';
import { ParkingView } from './views/ParkingView';
import { ComplaintsView } from './views/ComplaintsView';
import { WasteView } from './views/WasteView';
import { MaintenanceView } from './views/MaintenanceView';
import { AnalyticsView } from './views/AnalyticsView';
import { SettingsView } from './views/SettingsView';
import { AboutView } from './views/AboutView';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [role, setRole] = useState<UserRole>('Administrator');
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <LoginView
        onLogin={(selectedRole) => {
          setRole(selectedRole);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNavigate={(view) => setActiveView(view)} />;
      case 'digital-twin':
        return <DigitalTwinView />;
      case 'cctv':
        return <CCTVView />;
      case 'emergency':
        return <EmergencyView />;
      case 'energy':
        return <EnergyView />;
      case 'attendance':
        return <AttendanceView />;
      case 'parking':
        return <ParkingView />;
      case 'complaints':
        return <ComplaintsView />;
      case 'waste':
        return <WasteView />;
      case 'maintenance':
        return <MaintenanceView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'ai-assistant':
        return (
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-4">
            <h2 className="text-xl font-bold font-display text-white">JARVIS AI Assistant Portal</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Click the floating <strong className="text-cyan-400">"JARVIS AI"</strong> button in the bottom-right corner to open the interactive copilot window.
            </p>
          </div>
        );
      case 'settings':
        return <SettingsView />;
      case 'about':
        return <AboutView />;
      default:
        return <DashboardView onNavigate={(view) => setActiveView(view)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        role={role}
        setRole={setRole}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Header
          onMenuToggle={() => setIsSidebarOpen(true)}
          activeView={activeView}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating JARVIS AI Assistant Widget */}
      <JarvisBot />
    </div>
  );
}

export default App;
