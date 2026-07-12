import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import { Users, DollarSign, Activity, Radio, TrendingUp, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminDashboard() {
  const dailyVisitors = [
    { name: 'Mon', visitors: 45 },
    { name: 'Tue', visitors: 52 },
    { name: 'Wed', visitors: 48 },
    { name: 'Thu', visitors: 61 },
    { name: 'Fri', visitors: 75 },
    { name: 'Sat', visitors: 120 },
    { name: 'Sun', visitors: 95 },
  ];

  const revenueData = [
    { name: 'Mon', revenue: 675 },
    { name: 'Tue', revenue: 780 },
    { name: 'Wed', revenue: 720 },
    { name: 'Thu', revenue: 915 },
    { name: 'Fri', revenue: 1125 },
    { name: 'Sat', revenue: 1800 },
    { name: 'Sun', revenue: 1425 },
  ];

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-dark-slate mb-2">Admin Dashboard</h1>
          <p className="text-gray">System overview and analytics</p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Customers" value={1245} icon={Users} color="blue" trend="+12%" />
          <StatCard title="Monthly Revenue" value="₱35,420" icon={DollarSign} color="green" trend="+18%" />
          <StatCard title="Active Sessions" value={3} icon={Activity} color="purple" />
          <StatCard title="RFID Cards" value={5} icon={Radio} color="orange" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Daily Visitors Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <h3 className="text-dark-slate mb-6">Daily Visitors (This Week)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyVisitors}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Bar dataKey="visitors" fill="url(#adminVisitorsGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="adminVisitorsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <h3 className="text-dark-slate mb-6">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Zone Traffic & Peak Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <h3 className="text-dark-slate mb-6">Zone Popularity</h3>
            <div className="space-y-4">
              {[
                { zone: 'Kiddie', visits: 245, percentage: 85 },
                { zone: 'Bump Car', visits: 198, percentage: 70 },
                { zone: 'Skating', visits: 176, percentage: 62 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-ocean-blue" />
                      <span className="text-dark-slate">{item.zone}</span>
                    </div>
                    <span className="text-gray">{item.visits} visits</span>
                  </div>
                  <div className="h-2 bg-gray/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-ocean-blue to-sky-blue"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <h3 className="text-dark-slate mb-6">Peak Activity Hours</h3>
            <div className="space-y-4">
              {[
                { time: '2:00 PM - 4:00 PM', activity: 'Very High', percentage: 95, color: 'error' },
                { time: '12:00 PM - 2:00 PM', activity: 'High', percentage: 80, color: 'warning' },
                { time: '4:00 PM - 6:00 PM', activity: 'High', percentage: 75, color: 'warning' },
                { time: '10:00 AM - 12:00 PM', activity: 'Medium', percentage: 60, color: 'success' },
                { time: '6:00 PM - 8:00 PM', activity: 'Medium', percentage: 50, color: 'success' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-dark-slate">{item.time}</span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      item.color === 'error' ? 'bg-error/10 text-error' :
                      item.color === 'warning' ? 'bg-warning/10 text-warning' :
                      'bg-success/10 text-success'
                    }`}>
                      {item.activity}
                    </span>
                  </div>
                  <div className="h-2 bg-gray/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.color === 'error' ? 'bg-error' :
                        item.color === 'warning' ? 'bg-warning' :
                        'bg-emerald-green'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
