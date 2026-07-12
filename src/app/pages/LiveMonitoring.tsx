import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { Users, Activity, TrendingUp, MapPin } from "lucide-react";
import {
  getLiveSessions,
  subscribeLiveMonitoring,
  type LiveSession,
} from "../store/liveMonitoringStore";

export default function LiveMonitoring() {
  const [liveData, setLiveData] = useState<LiveSession[]>(() =>
    getLiveSessions(),
  );

  useEffect(() => {
    return subscribeLiveMonitoring(() => setLiveData(getLiveSessions()));
  }, []);

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="cashier" />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-dark-slate mb-2">
                  Live Monitoring Dashboard
                </h1>
                <p className="text-gray">
                  Real-time RFID activity and tracking
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray/10">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-dark-slate">Auto-refreshing</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Children Inside"
              value={10}
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Active RFID Tags"
              value={10}
              icon={Activity}
              color="green"
            />
            <StatCard
              title="Occupancy Rate"
              value="70%"
              icon={TrendingUp}
              color="purple"
            />
            <StatCard
              title="Zones in Use"
              value="5/5"
              icon={MapPin}
              color="orange"
            />
          </div>

          {/* Live Monitoring Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-dark-slate">Real-Time Monitoring</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-xs text-gray">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-xs text-gray">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span className="text-xs text-gray">Expiring</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray/20">
                    <th className="text-left py-3 px-4 text-gray">
                      RFID Number
                    </th>
                    <th className="text-left py-3 px-4 text-gray">
                      Child Name
                    </th>
                    <th className="text-left py-3 px-4 text-gray">
                      Current Zone
                    </th>
                    <th className="text-left py-3 px-4 text-gray">
                      Entry Time
                    </th>
                    <th className="text-left py-3 px-4 text-gray">
                      Remaining Time
                    </th>
                    <th className="text-left py-3 px-4 text-gray">Last Tap</th>
                    <th className="text-left py-3 px-4 text-gray">Status</th>
                    <th className="text-left py-3 px-4 text-gray">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {liveData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray/10 hover:bg-light-gray transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="text-dark-slate font-mono">
                          {item.id}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-dark-slate">{item.name}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-ocean-blue/10 text-ocean-blue rounded-lg">
                          <MapPin className="w-3 h-3" />
                          {item.zone}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray">{item.entryTime}</td>
                      <td className="py-4 px-4 text-dark-slate">
                        {item.remaining}
                      </td>
                      <td className="py-4 px-4 text-gray">{item.lastTapAt}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                            item.status === "active"
                              ? "bg-success/10 text-success"
                              : item.status === "warning"
                                ? "bg-warning/10 text-warning"
                                : "bg-error/10 text-error"
                          }`}
                        >
                          {item.status === "active"
                            ? "Active"
                            : item.status === "warning"
                              ? "Warning"
                              : "Expiring Soon"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray/20 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                item.status === "active"
                                  ? "bg-gradient-to-r from-emerald-green to-mint-green"
                                  : item.status === "warning"
                                    ? "bg-warning"
                                    : "bg-error"
                              }`}
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray w-10 text-right">
                            {item.progress}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all">
              Export Current Data
            </button>
            <button className="px-6 py-3 border-2 border-ocean-blue text-ocean-blue rounded-xl hover:bg-ocean-blue hover:text-white transition-all">
              View Full Logs
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-green to-mint-green text-white rounded-xl hover:shadow-lg transition-all">
              Send Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
