import { Link, useLocation, useNavigate } from 'react-router';
import adminLogo from '../../imports/4cf06a33233964ee2276865a5206b0ca.jpg';
import cashierLogo from '../../imports/ec4967089710f65f16ad716326613389.jpg';
import {
  LayoutDashboard,
  UserPlus,
  CreditCard,
  Monitor,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  Package,
  Users,
  BarChart3,
  Radio
} from 'lucide-react';
import { useAuth } from '../App';

interface SidebarProps {
  role?: 'cashier' | 'admin';
}

export default function Sidebar({ role = 'cashier' }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cashierLinks = [
    { to: '/cashier', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/register', icon: UserPlus, label: 'Register Customer' },
    { to: '/live-monitoring', icon: Monitor, label: 'Live Monitoring' },
    { to: '/zone-monitoring', icon: MapPin, label: 'Zone Monitoring' },
    { to: '/playtime', icon: Clock, label: 'Playtime Tracking' },
    { to: '/access-validation', icon: ShieldCheck, label: 'Access Validation' },
    { to: '/logs', icon: FileText, label: 'Entry/Exit Logs' },
  ];

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics & Reports' },
    { to: '/packages', icon: Package, label: 'Package Management' },
    { to: '/rfid-management', icon: Radio, label: 'RFID Management' },
    { to: '/cashier-management', icon: Users, label: 'Cashier Management' },
    { to: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  const links = role === 'admin' ? adminLinks : cashierLinks;

  return (
    <div className="w-64 bg-white border-r border-sidebar-border h-screen flex flex-col">
     {/* Logo */}
<div className="border-b border-sidebar-border p-4 flex items-center gap-3">
  <img
    src={role === 'admin' ? adminLogo : cashierLogo}
    alt={role === 'admin' ? 'Admin Portal' : 'Cashier Portal'}
    className="h-12 w-12 object-contain rounded-lg"
  />

  <div>
    <h2 className="font-bold text-dark-slate">
      JollyIsland
    </h2>
    <p className="text-xs text-gray">
      {role === 'admin' ? 'Admin Portal' : 'Cashier Portal'}
    </p>
  </div>
</div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-ocean-blue to-sky-blue text-white shadow-md'
                      : 'text-gray hover:bg-light-gray hover:text-ocean-blue'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
