import Sidebar from '../components/Sidebar';
import { Clock, Play, Pause, AlertTriangle } from 'lucide-react';

export default function PlaytimeTracking() {
  const sessions = [
    { id: 'RFID-001', name: 'Emma Johnson', package: '2 Hour Play', started: '2:00 PM', total: 120, remaining: 45, progress: 62, status: 'active' },
    { id: 'RFID-002', name: 'Liam Smith', package: '1 Hour Play', started: '2:18 PM', total: 60, remaining: 12, progress: 80, status: 'warning' },
    { id: 'RFID-004', name: 'Noah Davis', package: '1 Hour Play', started: '2:25 PM', total: 60, remaining: 5, progress: 92, status: 'expiring' },
    { id: 'RFID-003', name: 'Olivia Brown', package: 'Unlimited Play', started: '1:10 PM', total: -1, remaining: -1, progress: 100, status: 'unlimited' },
  ];

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="cashier" />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-dark-slate mb-2">Playtime Tracking</h1>
          <p className="text-gray">Monitor and manage customer session durations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div key={session.id} className={`bg-white rounded-2xl shadow-sm border-2 p-6 ${
              session.status === 'expiring' ? 'border-error' : session.status === 'warning' ? 'border-warning' : 'border-gray/10'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-dark-slate mb-1">{session.name}</h3>
                  <p className="text-xs text-gray">{session.id}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${
                  session.status === 'unlimited' ? 'bg-purple-100 text-purple-600' :
                  session.status === 'expiring' ? 'bg-error/10 text-error' :
                  session.status === 'warning' ? 'bg-warning/10 text-warning' :
                  'bg-success/10 text-success'
                }`}>
                  {session.status === 'unlimited' ? 'Unlimited' : session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray mb-1">Package</p>
                <p className="text-dark-slate">{session.package}</p>
              </div>

              {session.status !== 'unlimited' && (
                <>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray">Time Remaining</span>
                      <span className="text-dark-slate">{session.remaining} min</span>
                    </div>
                    <div className="h-3 bg-gray/10 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${
                        session.status === 'expiring' ? 'bg-error' :
                        session.status === 'warning' ? 'bg-warning' :
                        'bg-gradient-to-r from-emerald-green to-mint-green'
                      }`} style={{ width: `${session.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray mb-4">
                    <span>Started: {session.started}</span>
                    <span>Total: {session.total} min</span>
                  </div>
                </>
              )}

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl text-xs hover:shadow-md transition-all">
                  Extend Time
                </button>
                {session.status === 'expiring' && (
                  <button className="px-4 py-2 bg-error/10 text-error rounded-xl text-xs hover:bg-error hover:text-white transition-all">
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
