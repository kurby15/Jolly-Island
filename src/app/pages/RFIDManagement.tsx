import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Radio, Plus, Search, X } from 'lucide-react';
import { getCards, addCard, updateCard, subscribe, type RFIDCard } from '../store/rfidStore';

export default function RFIDManagement() {
  const [cards, setCards] = useState<RFIDCard[]>(() => getCards());
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCardId, setNewCardId] = useState('');

  useEffect(() => {
    return subscribe(() => setCards(getCards()));
  }, []);

  const filtered = cards.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) || c.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? c.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: 'Available', count: cards.filter(c => c.status === 'available').length, color: 'from-emerald-green to-mint-green' },
    { label: 'Assigned', count: cards.filter(c => c.status === 'assigned').length, color: 'from-ocean-blue to-sky-blue' },
    { label: 'Lost', count: cards.filter(c => c.status === 'lost').length, color: 'from-orange-500 to-orange-400' },
    { label: 'Disabled', count: cards.filter(c => c.status === 'disabled').length, color: 'from-gray to-gray/70' },
  ];

  const handleAddCard = () => {
    if (!newCardId.trim()) return;
    const id = newCardId.trim().toUpperCase();
    if (cards.find(c => c.id === id)) return;
    addCard({ id, status: 'available', customer: '-', assignedDate: '-' });
    setNewCardId('');
    setShowAddModal(false);
  };

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-dark-slate mb-2">RFID Management</h1>
            <p className="text-gray">Manage RFID card inventory and status</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add RFID Card
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white`}>
              <p className="text-white/80 mb-1">{stat.label}</p>
              <p className="text-4xl">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* RFID Cards List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search RFID cards..."
                className="w-full pl-10 pr-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
              <option value="lost">Lost</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray/20">
                  <th className="text-left py-3 px-4 text-gray">RFID ID</th>
                  <th className="text-left py-3 px-4 text-gray">Status</th>
                  <th className="text-left py-3 px-4 text-gray">Assigned To</th>
                  <th className="text-left py-3 px-4 text-gray">Date</th>
                  <th className="text-left py-3 px-4 text-gray">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((card) => (
                  <tr key={card.id} className="border-b border-gray/10 hover:bg-light-gray transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-ocean-blue" />
                        <span className="text-dark-slate font-mono">{card.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                        card.status === 'assigned' ? 'bg-ocean-blue/10 text-ocean-blue' :
                        card.status === 'available' ? 'bg-success/10 text-success' :
                        card.status === 'lost' ? 'bg-warning/10 text-warning' :
                        'bg-gray/10 text-gray'
                      }`}>
                        {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray">{card.customer}</td>
                    <td className="py-4 px-4 text-gray">{card.assignedDate}</td>
                    <td className="py-4 px-4">
                      <select
                        value={card.status}
                        onChange={e => updateCard(card.id, { status: e.target.value as RFIDCard['status'] })}
                        className="px-3 py-1.5 text-sm bg-light-gray border border-gray/20 rounded-lg focus:border-ocean-blue focus:outline-none transition-colors"
                      >
                        <option value="available">Available</option>
                        <option value="assigned">Assigned</option>
                        <option value="lost">Lost</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-dark-slate">Add New RFID Card</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray hover:text-dark-slate">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray">RFID Card ID</label>
              <input
                type="text"
                value={newCardId}
                onChange={e => setNewCardId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddCard()}
                className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                placeholder="e.g. RFID-011"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddCard}
                className="flex-1 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all"
              >
                Add Card
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 border-2 border-gray/30 text-gray rounded-xl hover:bg-gray/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
