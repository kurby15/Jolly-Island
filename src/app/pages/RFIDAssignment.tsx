import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { CreditCard, Search, CheckCircle, XCircle } from 'lucide-react';

export default function RFIDAssignment() {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { id: 1, name: 'Emma Johnson', age: 7, guardian: 'Sarah Johnson', rfid: 'RFID-001', status: 'assigned', package: '2 Hour Play' },
    { id: 2, name: 'Liam Smith', age: 5, guardian: 'Michael Smith', rfid: '', status: 'unassigned', package: '1 Hour Play' },
    { id: 3, name: 'Olivia Brown', age: 8, guardian: 'Jennifer Brown', rfid: 'RFID-003', status: 'assigned', package: 'Unlimited Play' },
    { id: 4, name: 'Noah Davis', age: 6, guardian: 'David Davis', rfid: '', status: 'unassigned', package: '2 Hour Play' },
  ];

  const assignmentHistory = [
    { id: 1, rfid: 'RFID-001', customer: 'Emma Johnson', date: '2026-06-08', time: '2:00 PM', assignedBy: 'Cashier 1' },
    { id: 2, rfid: 'RFID-003', customer: 'Olivia Brown', date: '2026-06-08', time: '1:10 PM', assignedBy: 'Cashier 2' },
    { id: 3, rfid: 'RFID-005', customer: 'Ava Wilson', date: '2026-06-08', time: '2:02 PM', assignedBy: 'Cashier 1' },
  ];

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="cashier" />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-dark-slate mb-2">RFID Card Assignment</h1>
            <p className="text-gray">Assign and manage RFID cards for customers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* RFID Scanner */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-8">
                <h3 className="text-dark-slate mb-6">Scan RFID Card</h3>
                <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-ocean-blue/5 to-emerald-green/5 rounded-2xl border-2 border-dashed border-ocean-blue/30">
                  <div className="w-24 h-24 bg-gradient-to-br from-ocean-blue to-sky-blue rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="text-dark-slate mb-2">Ready to Scan</h4>
                  <p className="text-gray text-center mb-6">Place RFID card near the reader to detect</p>
                  <button className="px-8 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all">
                    Start Scanning
                  </button>
                </div>
              </div>

              {/* Customer List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-dark-slate">Customer List</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search customers..."
                      className="pl-10 pr-4 py-2 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {customers.map((customer) => (
                    <div key={customer.id} className="p-4 bg-light-gray rounded-xl hover:bg-gray/10 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-dark-slate mb-1">{customer.name}</h4>
                          <p className="text-xs text-gray">Age: {customer.age} | Guardian: {customer.guardian}</p>
                          <p className="text-xs text-ocean-blue mt-1">{customer.package}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          {customer.rfid ? (
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-success">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs">Assigned</span>
                              </div>
                              <p className="text-xs text-gray mt-1">{customer.rfid}</p>
                            </div>
                          ) : (
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-error">
                                <XCircle className="w-4 h-4" />
                                <span className="text-xs">Not Assigned</span>
                              </div>
                              <button className="mt-2 px-4 py-1 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-lg text-xs hover:shadow-md transition-all">
                                Assign Now
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Assignment History */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
                <h3 className="text-dark-slate mb-4">RFID Status</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-emerald-green/10 to-mint-green/10 rounded-xl">
                    <p className="text-xs text-gray mb-1">Assigned</p>
                    <p className="text-2xl text-emerald-green">32</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-gray/10 to-gray/5 rounded-xl">
                    <p className="text-xs text-gray mb-1">Available</p>
                    <p className="text-2xl text-gray">18</p>
                  </div>
                </div>

                <h3 className="text-dark-slate mb-4 mt-6">Assignment History</h3>
                <div className="space-y-3">
                  {assignmentHistory.map((item) => (
                    <div key={item.id} className="p-3 bg-light-gray rounded-xl">
                      <p className="text-dark-slate mb-1">{item.rfid}</p>
                      <p className="text-xs text-gray">{item.customer}</p>
                      <p className="text-xs text-gray mt-1">{item.date} at {item.time}</p>
                      <p className="text-xs text-ocean-blue mt-1">By: {item.assignedBy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
