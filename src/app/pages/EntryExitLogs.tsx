import Sidebar from '../components/Sidebar';
import { Search, Download, FileText, Filter } from 'lucide-react';

export default function EntryExitLogs() {
  const logs = [
    { id: 1, rfid: 'RFID-001', name: 'Emma Johnson', zone: 'Trampoline Area', entry: '2:00 PM', exit: '-', duration: '50 min', status: 'inside' },
    { id: 2, rfid: 'RFID-002', name: 'Liam Smith', zone: 'Ball Pit', entry: '2:18 PM', exit: '-', duration: '32 min', status: 'inside' },
    { id: 3, rfid: 'RFID-008', name: 'Sophia Martinez', zone: 'Toddler Zone', entry: '1:30 PM', exit: '2:38 PM', duration: '1 hr 8 min', status: 'exited' },
    { id: 4, rfid: 'RFID-009', name: 'Ethan Garcia', zone: 'Climbing Area', entry: '12:45 PM', exit: '2:15 PM', duration: '1 hr 30 min', status: 'exited' },
    { id: 5, rfid: 'RFID-003', name: 'Olivia Brown', zone: 'Climbing Area', entry: '1:10 PM', exit: '-', duration: '1 hr 40 min', status: 'inside' },
  ];

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="cashier" />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-dark-slate mb-2">Entry & Exit Logs</h1>
          <p className="text-gray">Complete activity history and tracking</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" />
              <input
                type="text"
                placeholder="Search by name, RFID, or zone..."
                className="w-full pl-10 pr-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
              />
            </div>
            <input
              type="date"
              className="px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
            />
            <select className="px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors">
              <option value="">All Zones</option>
              <option value="trampoline">Trampoline Area</option>
              <option value="ball-pit">Ball Pit</option>
              <option value="toddler">Toddler Zone</option>
              <option value="climbing">Climbing Area</option>
              <option value="arcade">Arcade Area</option>
            </select>
            <button className="px-6 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray/20">
                  <th className="text-left py-3 px-4 text-gray">RFID ID</th>
                  <th className="text-left py-3 px-4 text-gray">Child Name</th>
                  <th className="text-left py-3 px-4 text-gray">Zone</th>
                  <th className="text-left py-3 px-4 text-gray">Entry Time</th>
                  <th className="text-left py-3 px-4 text-gray">Exit Time</th>
                  <th className="text-left py-3 px-4 text-gray">Duration</th>
                  <th className="text-left py-3 px-4 text-gray">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray/10 hover:bg-light-gray transition-colors">
                    <td className="py-4 px-4 text-dark-slate font-mono">{log.rfid}</td>
                    <td className="py-4 px-4 text-dark-slate">{log.name}</td>
                    <td className="py-4 px-4 text-gray">{log.zone}</td>
                    <td className="py-4 px-4 text-gray">{log.entry}</td>
                    <td className="py-4 px-4 text-gray">{log.exit}</td>
                    <td className="py-4 px-4 text-dark-slate">{log.duration}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                        log.status === 'inside' ? 'bg-success/10 text-success' : 'bg-gray/10 text-gray'
                      }`}>
                        {log.status === 'inside' ? 'Inside' : 'Exited'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-gray/20">
            <button className="px-6 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="px-6 py-3 border-2 border-emerald-green text-emerald-green rounded-xl hover:bg-emerald-green hover:text-white transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Excel
            </button>
            <button className="px-6 py-3 border-2 border-gray/30 text-gray rounded-xl hover:bg-gray/10 transition-all flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
