import Sidebar from '../components/Sidebar';
import { Users, Plus, Edit, UserX } from 'lucide-react';

export default function CashierManagement() {
  const cashiers = [
    { id: 'EMP-001', name: 'John Smith', username: 'jsmith', role: 'Cashier', status: 'active', lastLogin: '2026-06-08 2:00 PM' },
    { id: 'EMP-002', name: 'Sarah Johnson', username: 'sjohnson', role: 'Cashier', status: 'active', lastLogin: '2026-06-08 1:30 PM' },
    { id: 'EMP-003', name: 'Michael Brown', username: 'mbrown', role: 'Admin', status: 'active', lastLogin: '2026-06-08 9:00 AM' },
    { id: 'EMP-004', name: 'Emily Davis', username: 'edavis', role: 'Cashier', status: 'inactive', lastLogin: '2026-06-05 5:00 PM' },
  ];

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-dark-slate mb-2">Cashier Management</h1>
            <p className="text-gray">Manage staff accounts and permissions</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Cashier
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray/20">
                  <th className="text-left py-3 px-4 text-gray">Employee ID</th>
                  <th className="text-left py-3 px-4 text-gray">Name</th>
                  <th className="text-left py-3 px-4 text-gray">Username</th>
                  <th className="text-left py-3 px-4 text-gray">Role</th>
                  <th className="text-left py-3 px-4 text-gray">Status</th>
                  <th className="text-left py-3 px-4 text-gray">Last Login</th>
                  <th className="text-left py-3 px-4 text-gray">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cashiers.map((cashier) => (
                  <tr key={cashier.id} className="border-b border-gray/10 hover:bg-light-gray transition-colors">
                    <td className="py-4 px-4 text-dark-slate font-mono">{cashier.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-ocean-blue to-sky-blue rounded-full flex items-center justify-center text-white text-xs">
                          {cashier.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-dark-slate">{cashier.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray">{cashier.username}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                        cashier.role === 'Admin' ? 'bg-purple-100 text-purple-600' : 'bg-ocean-blue/10 text-ocean-blue'
                      }`}>
                        {cashier.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                        cashier.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray/10 text-gray'
                      }`}>
                        {cashier.status.charAt(0).toUpperCase() + cashier.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray">{cashier.lastLogin}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-error hover:bg-error/10 rounded-lg transition-all">
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
