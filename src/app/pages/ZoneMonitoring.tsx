import Sidebar from '../components/Sidebar';
import { Users, TrendingUp, MapPin } from 'lucide-react';

export default function ZoneMonitoring() {
  const zones = [
    { id: 1, name: 'Trampoline Area', current: 12, max: 15, color: 'blue', percentage: 80, status: 'busy' },
    { id: 2, name: 'Ball Pit', current: 8, max: 20, color: 'green', percentage: 40, status: 'available' },
    { id: 3, name: 'Toddler Zone', current: 6, max: 10, color: 'purple', percentage: 60, status: 'available' },
    { id: 4, name: 'Climbing Area', current: 10, max: 12, color: 'orange', percentage: 83, status: 'busy' },
    { id: 5, name: 'Arcade Area', current: 6, max: 8, color: 'blue', percentage: 75, status: 'busy' },
  ];

  const getZoneColor = (status: string) => {
    if (status === 'full') return 'from-error to-red-400';
    if (status === 'busy') return 'from-warning to-yellow-400';
    return 'from-emerald-green to-mint-green';
  };

  const getZoneStatus = (percentage: number) => {
    if (percentage >= 90) return 'Full';
    if (percentage >= 70) return 'Busy';
    return 'Available';
  };

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="cashier" />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-dark-slate mb-2">Zone Monitoring</h1>
            <p className="text-gray">Interactive indoor play center zone management</p>
          </div>

          {/* Interactive Zone Map */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-8 mb-8">
            <h3 className="text-dark-slate mb-6">Interactive Play Center Map</h3>

            {/* Map Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {zones.map((zone) => {
                const statusColor = zone.percentage >= 90 ? 'error' : zone.percentage >= 70 ? 'warning' : 'success';

                return (
                  <div
                    key={zone.id}
                    className="relative bg-gradient-to-br from-light-gray to-white border-2 border-gray/20 rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group"
                  >
                    {/* Zone Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-dark-slate mb-1">{zone.name}</h4>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-ocean-blue" />
                          <span className="text-xs text-gray">Zone {zone.id}</span>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs ${
                          statusColor === 'error'
                            ? 'bg-error/10 text-error'
                            : statusColor === 'warning'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-success/10 text-success'
                        }`}
                      >
                        {getZoneStatus(zone.percentage)}
                      </div>
                    </div>

                    {/* Occupancy Stats */}
                    <div className="mb-4">
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl text-dark-slate">{zone.current}</span>
                        <span className="text-gray mb-1">/ {zone.max} children</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray" />
                        <span className="text-xs text-gray">Current Occupancy</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray">Capacity</span>
                        <span className="text-xs text-dark-slate">{zone.percentage}%</span>
                      </div>
                      <div className="h-3 bg-gray/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getZoneColor(zone.status)} transition-all`}
                          style={{ width: `${zone.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Visual Representation */}
                    <div className="grid grid-cols-5 gap-1 mt-4">
                      {Array.from({ length: zone.max }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 rounded ${
                            i < zone.current
                              ? statusColor === 'error'
                                ? 'bg-error'
                                : statusColor === 'warning'
                                ? 'bg-warning'
                                : 'bg-emerald-green'
                              : 'bg-gray/10'
                          }`}
                        ></div>
                      ))}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/5 to-emerald-green/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zone Details Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-dark-slate">Zone Activity Details</h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded"></div>
                  <span className="text-gray">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warning rounded"></div>
                  <span className="text-gray">Busy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-error rounded"></div>
                  <span className="text-gray">Full</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray/20">
                    <th className="text-left py-3 px-4 text-gray">Zone Name</th>
                    <th className="text-left py-3 px-4 text-gray">Current Occupancy</th>
                    <th className="text-left py-3 px-4 text-gray">Maximum Capacity</th>
                    <th className="text-left py-3 px-4 text-gray">Utilization</th>
                    <th className="text-left py-3 px-4 text-gray">Status</th>
                    <th className="text-left py-3 px-4 text-gray">RFID Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((zone) => (
                    <tr key={zone.id} className="border-b border-gray/10 hover:bg-light-gray transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-ocean-blue" />
                          <span className="text-dark-slate">{zone.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-dark-slate">{zone.current} children</td>
                      <td className="py-4 px-4 text-gray">{zone.max} children</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-ocean-blue to-sky-blue"
                              style={{ width: `${zone.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-dark-slate">{zone.percentage}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                            zone.percentage >= 90
                              ? 'bg-error/10 text-error'
                              : zone.percentage >= 70
                              ? 'bg-warning/10 text-warning'
                              : 'bg-success/10 text-success'
                          }`}
                        >
                          {getZoneStatus(zone.percentage)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="text-xs text-gray">Active</span>
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
    </div>
  );
}
