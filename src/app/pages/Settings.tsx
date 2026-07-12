import Sidebar from '../components/Sidebar';
import { Settings as SettingsIcon, Shield, Database, Bell, User } from 'lucide-react';

export default function Settings() {
  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-dark-slate mb-2">Settings</h1>
          <p className="text-gray">System configuration and preferences</p>
        </div>

        <div className="space-y-6">
          {/* System Configuration */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-ocean-blue to-sky-blue rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-dark-slate">System Configuration</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray">System Name</label>
                  <input
                    type="text"
                    defaultValue="JollyIsland Management System"
                    className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray">Time Zone</label>
                  <select className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors">
                    <option value="est">Eastern Time (ET)</option>
                    <option value="pst">Pacific Time (PT)</option>
                    <option value="cst">Central Time (CT)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* RFID Configuration */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-green to-mint-green rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-dark-slate">RFID Configuration</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray">Auto-refresh Interval (seconds)</label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="autoAssign" className="w-5 h-5" defaultChecked />
                <label htmlFor="autoAssign" className="text-gray">Enable auto-assignment for scanned cards</label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-400 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-dark-slate">Notification Settings</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="timeExpiring" className="w-5 h-5" defaultChecked />
                <label htmlFor="timeExpiring" className="text-gray">Alert when session is expiring (15 min)</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="accessDenied" className="w-5 h-5" defaultChecked />
                <label htmlFor="accessDenied" className="text-gray">Alert on access denied</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="newCustomer" className="w-5 h-5" />
                <label htmlFor="newCustomer" className="text-gray">Notify on new customer registration</label>
              </div>
            </div>
          </div>

          {/* Backup & Security */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-400 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-dark-slate">Backup & Security</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all">
                  Backup Database
                </button>
                <button className="px-6 py-3 border-2 border-ocean-blue text-ocean-blue rounded-xl hover:bg-ocean-blue hover:text-white transition-all">
                  Restore Database
                </button>
                <button className="px-6 py-3 border-2 border-gray/30 text-gray rounded-xl hover:bg-gray/10 transition-all">
                  View Activity Logs
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-8 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
