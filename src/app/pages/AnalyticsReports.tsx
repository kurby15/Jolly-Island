import Sidebar from '../components/Sidebar';
import { Download, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function AnalyticsReports() {
  const monthlyData = [
    { name: 'Jan', visitors: 1240, revenue: 18600 },
    { name: 'Feb', visitors: 1380, revenue: 20700 },
    { name: 'Mar', visitors: 1520, revenue: 22800 },
    { name: 'Apr', visitors: 1650, revenue: 24750 },
    { name: 'May', visitors: 1890, revenue: 28350 },
    { name: 'Jun', visitors: 680, revenue: 10200 },
  ];

  const zoneUsage = [
    { name: 'Kiddie', value: 245, color: '#0EA5E9' },
    { name: 'Bump Car', value: 198, color: '#10B981' },
    { name: 'Skating', value: 176, color: '#38BDF8' },
  ];

  const peakHours = [
    { hour: '10 AM', count: 12 },
    { hour: '11 AM', count: 25 },
    { hour: '12 PM', count: 42 },
    { hour: '1 PM', count: 55 },
    { hour: '2 PM', count: 68 },
    { hour: '3 PM', count: 72 },
    { hour: '4 PM', count: 65 },
    { hour: '5 PM', count: 48 },
    { hour: '6 PM', count: 35 },
  ];

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-dark-slate mb-2">Analytics & Reports</h1>
          <p className="text-gray">Comprehensive insights and data analysis</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block mb-2 text-gray">Time Period</label>
              <select className="px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray">Start Date</label>
              <input
                type="date"
                className="px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray">End Date</label>
              <input
                type="date"
                className="px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
            <div className="flex gap-2 ml-auto">
              <button className="px-6 py-3 border-2 border-ocean-blue text-ocean-blue rounded-xl hover:bg-ocean-blue hover:text-white transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button className="px-6 py-3 border-2 border-emerald-green text-emerald-green rounded-xl hover:bg-emerald-green hover:text-white transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Visitors & Revenue */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <h3 className="text-dark-slate mb-6">Monthly Visitors</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Bar dataKey="visitors" fill="url(#analyticsMonthlyVisitors)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="analyticsMonthlyVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Zone Usage Pie Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <h3 className="text-dark-slate mb-6">Zone Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={zoneUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {zoneUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <h3 className="text-dark-slate mb-6">Monthly Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Peak Activity Hours */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
            <h3 className="text-dark-slate mb-6">Peak Activity Hours</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Bar dataKey="count" fill="url(#analyticsPeakHours)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="analyticsPeakHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
