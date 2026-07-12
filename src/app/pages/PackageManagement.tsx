import Sidebar from '../components/Sidebar';
import { Package, Plus, Edit, Trash2 } from 'lucide-react';

export default function PackageManagement() {
  const packages = [
    { id: 1, name: 'Kiddie A', duration: 30, price: 99, zones: 'Kiddie Zones', active: true },
    { id: 2, name: 'Kiddie B', duration: 60, price: 130, zones: 'Kiddie Zones', active: true },
    { id: 3, name: 'Kiddie C', duration: 120, price: 180, zones: 'Kiddie Zones', active: true },
    { id: 4, name: 'Kiddie D', duration: -1, price: 250, zones: 'Kiddie Zones', active: true },
    { id: 5, name: 'Skating A', duration: 15, price: 60, zones: 'Skating Zones', active: true },
    { id: 6, name: 'Skating B', duration: 30, price: 99, zones: 'Skating Zones', active: true },
    { id: 7, name: 'Skating C', duration: 60, price: 150, zones: 'Skating Zones', active: true },
    { id: 8, name: 'Bump Car A', duration: 15, price: 100, zones: 'Bump Car Zones', active: true },
    { id: 0, name: 'Bump Car B', duration: 30, price: 130, zones: 'Bump Car Zones', active: true },
    { id: 10, name: 'Bump Car C', duration: 90, price: 150, zones: 'Bump Car Zone Only', active: true },
  ];

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-dark-slate mb-2">Package Management</h1>
            <p className="text-gray">Manage play packages and pricing</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Package
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-ocean-blue to-sky-blue rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ₱{
                  pkg.active ? 'bg-success/10 text-success' : 'bg-gray/10 text-gray'
                }`}>
                  {pkg.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <h3 className="text-dark-slate mb-4">{pkg.name}</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-gray">Duration:</span>
                  <span className="text-dark-slate">{pkg.duration === -1 ? 'Unlimited' : `${pkg.duration} minutes`}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray">Price:</span>
                  <span className="text-dark-slate text-xl">₱{pkg.price}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray">Zone Access:</span>
                  <span className="text-dark-slate">{pkg.zones}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 border-2 border-ocean-blue text-ocean-blue rounded-xl hover:bg-ocean-blue hover:text-white transition-all flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2 border-2 border-error text-error rounded-xl hover:bg-error hover:text-white transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
