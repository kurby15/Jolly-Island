import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import {
  Users,
  DollarSign,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  getLiveSessions,
  getTapEvents,
  subscribeLiveMonitoring,
  type LiveSession,
  type TapEvent,
} from "../store/liveMonitoringStore";

export default function CashierDashboard() {
  const [activeChildren, setActiveChildren] = useState<LiveSession[]>(() =>
    getLiveSessions(),
  );
  const [recentActivity, setRecentActivity] = useState<TapEvent[]>(() =>
    getTapEvents(),
  );

  useEffect(() => {
    return subscribeLiveMonitoring(() => {
      setActiveChildren(getLiveSessions());
      setRecentActivity(getTapEvents());
    });
  }, []);

  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "Noah Davis - Session expiring in 5 minutes",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "warning",
      message: "Liam Smith - Session expiring in 12 minutes",
      time: "5 min ago",
    },
    {
      id: 3,
      type: "error",
      message: "RFID-099 - Access Denied: Invalid Card",
      time: "10 min ago",
    },
  ];

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="cashier" />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-dark-slate mb-2">Cashier Dashboard</h1>
            <p className="text-gray">
              Real-time monitoring and customer management
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Active Children"
              value={3}
              icon={Users}
              color="blue"
              trend="+5 today"
            />
            <StatCard
              title="Today's Revenue"
              value="₱1,245"
              icon={DollarSign}
              color="green"
              trend="+12%"
            />
            <StatCard
              title="Today's Customers"
              value={3}
              icon={Activity}
              color="purple"
            />
            <StatCard
              title="Expired Sessions"
              value={3}
              icon={Clock}
              color="orange"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live RFID Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-dark-slate">
                    Active Children - Live Monitoring
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray">Live</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray/20">
                        <th className="text-left py-3 px-2 text-gray">
                          RFID #
                        </th>
                        <th className="text-left py-3 px-2 text-gray">
                          Child Name
                        </th>
                        <th className="text-left py-3 px-2 text-gray">
                          Current Zone
                        </th>
                        <th className="text-left py-3 px-2 text-gray">
                          Time Remaining
                        </th>
                        <th className="text-left py-3 px-2 text-gray">
                          Last Tap
                        </th>
                        <th className="text-left py-3 px-2 text-gray">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeChildren.map((child) => (
                        <tr
                          key={child.id}
                          className="border-b border-gray/10 hover:bg-light-gray transition-colors"
                        >
                          <td className="py-4 px-2 text-dark-slate">
                            {child.id}
                          </td>
                          <td className="py-4 px-2 text-dark-slate">
                            {child.name}
                          </td>
                          <td className="py-4 px-2 text-gray">{child.zone}</td>
                          <td className="py-4 px-2 text-dark-slate">
                            {child.timeRemaining}
                          </td>
                          <td className="py-4 px-2 text-gray">
                            {child.lastTapAt}
                          </td>
                          <td className="py-4 px-2">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                                child.status === "active"
                                  ? "bg-success/10 text-success"
                                  : child.status === "warning"
                                    ? "bg-warning/10 text-warning"
                                    : "bg-error/10 text-error"
                              }`}
                            >
                              {child.status === "active" ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : child.status === "warning" ? (
                                <AlertCircle className="w-3 h-3" />
                              ) : (
                                <XCircle className="w-3 h-3" />
                              )}
                              {child.status === "active"
                                ? "Active"
                                : child.status === "warning"
                                  ? "Warning"
                                  : "Expiring"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6 mt-6">
                <h3 className="text-dark-slate mb-4">
                  Recent RFID Tap Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-light-gray rounded-xl hover:bg-gray/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            activity.result === "granted"
                              ? "bg-success/10 text-success"
                              : "bg-error/10 text-error"
                          }`}
                        >
                          {activity.result === "granted" ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <XCircle className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-dark-slate">{activity.name}</p>
                          <p className="text-xs text-gray">
                            {activity.rfid} · {activity.zone}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-dark-slate ${activity.result === "granted" ? "text-success" : "text-error"}`}
                        >
                          {activity.result === "granted" ? "Granted" : "Denied"}
                        </p>
                        <p className="text-xs text-gray">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts & Notifications */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
                <h3 className="text-dark-slate mb-4">Alerts & Notifications</h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-xl border-l-4 ${
                        alert.type === "warning"
                          ? "bg-warning/5 border-warning"
                          : "bg-error/5 border-error"
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5">
                          {alert.type === "warning" ? (
                            <AlertCircle className="w-5 h-5 text-warning" />
                          ) : (
                            <XCircle className="w-5 h-5 text-error" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-dark-slate mb-1">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6 mt-6">
                <h3 className="text-dark-slate mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all">
                    Register New Customer
                  </button>
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-emerald-green to-mint-green text-white rounded-xl hover:shadow-lg transition-all">
                    Assign RFID Card
                  </button>
                  <button className="w-full py-3 px-4 border-2 border-ocean-blue text-ocean-blue rounded-xl hover:bg-ocean-blue hover:text-white transition-all">
                    View All Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
