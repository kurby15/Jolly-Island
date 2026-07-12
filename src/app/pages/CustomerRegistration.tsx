import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { UserPlus, CreditCard, Save, X } from 'lucide-react';
import { getAvailableCards, assignCard, subscribe, type RFIDCard } from '../store/rfidStore';

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    gender: '',
    guardianName: '',
    contactNumber: '',
    package: '',
    rfidCard: '',
  });
  const [availableCards, setAvailableCards] = useState<RFIDCard[]>(() => getAvailableCards());
  useEffect(() => {
    return subscribe(() => setAvailableCards(getAvailableCards()));
  }, []);

  const packages = [
    { id: 'KiddieA', name: 'Kiddie A', duration: '30 mins', price: '₱ 99', zones: 'Kiddie' },
    { id: 'KiddieB', name: 'Kiddie B', duration: '1 hr', price: '₱ 130', zones: 'Kiddie' },
    { id: 'KiddieC', name: 'Kiddie C', duration: '2 hr', price: '₱ 180', zones: 'Kiddie' },
    { id: 'KiddieD', name: 'Kiddie D', duration: 'Unlimited', price: '₱ 250', zones: 'Kiddie' },

    { id: 'SkatingA', name: 'Skating A', duration: '15 mins', price: '₱ 60', zones: 'Skating' },
    { id: 'SkatingB', name: 'Skating B', duration: '30 mins', price: '₱ 99', zones: 'Skating' },
    { id: 'SkatingC', name: 'Skating C', duration: '1 hr', price: '₱ 150', zones: 'Skating' },

    { id: 'bumpcarA', name: 'Bump Car A', duration: '15 mins', price: '₱ 100', zones: 'Bump Car' },
    { id: 'bumpcarB', name: 'Bump Car B', duration: '30 mins', price: '₱ 130', zones: 'Bump Car' },
    { id: 'bumpcarC', name: 'Bump Car C', duration: '1 hr', price: '₱ 150', zones: 'Bump Car' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rfidCard) {
      assignCard(formData.rfidCard, formData.childName);
    }
    console.log('Registration submitted:', formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      childName: '',
      age: '',
      gender: '',
      guardianName: '',
      contactNumber: '',
      package: '',
      rfidCard: '',
    });
  };

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar role="cashier" />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-dark-slate mb-2">Customer Registration</h1>
            <p className="text-gray">Register new customers and assign packages</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-ocean-blue to-sky-blue rounded-xl flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-dark-slate">Registration Form</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Child Information */}
                  <div>
                    <h4 className="text-dark-slate mb-4">Child Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="childName" className="block mb-2 text-gray">
                          Child Name *
                        </label>
                        <input
                          id="childName"
                          type="text"
                          value={formData.childName}
                          onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                          className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                          placeholder="Enter child's name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="age" className="block mb-2 text-gray">
                          Age *
                        </label>
                        <input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                          placeholder="Age"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-gray">Gender *</label>
                        <div className="flex gap-4">
                          {['Male', 'Female', 'Other'].map((gender) => (
                            <label key={gender} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={formData.gender === gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-4 h-4 text-ocean-blue"
                              />
                              <span className="text-gray">{gender}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Guardian Information */}
                  <div className="pt-6 border-t border-gray/20">
                    <h4 className="text-dark-slate mb-4">Guardian Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="guardianName" className="block mb-2 text-gray">
                          Guardian Name *
                        </label>
                        <input
                          id="guardianName"
                          type="text"
                          value={formData.guardianName}
                          onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                          className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                          placeholder="Parent/Guardian name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contactNumber" className="block mb-2 text-gray">
                          Contact Number *
                        </label>
                        <input
                          id="contactNumber"
                          type="tel"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                          className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Package Selection */}
                  <div className="pt-6 border-t border-gray/20">
                    <h4 className="text-dark-slate mb-4">Package Selection</h4>
                    <select
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select a package</option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} - {pkg.duration} - {pkg.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* RFID Card */}
                  <div className="pt-6 border-t border-gray/20">
                    <h4 className="text-dark-slate mb-4">RFID Card Assignment</h4>
                    <div>
                      <label htmlFor="rfidCard" className="block mb-2 text-gray">
                        Select Available RFID Card
                      </label>
                      {availableCards.length === 0 ? (
                        <div className="w-full px-4 py-3 bg-light-gray border-2 border-orange-300 rounded-xl text-orange-500 text-sm flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          No available RFID cards. Ask admin to add more cards.
                        </div>
                      ) : (
                        <select
                          id="rfidCard"
                          value={formData.rfidCard}
                          onChange={(e) => setFormData({ ...formData, rfidCard: e.target.value })}
                          className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                        >
                          <option value="">— Select an RFID card —</option>
                          {availableCards.map((card) => (
                            <option key={card.id} value={card.id}>
                              {card.id}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-ocean-blue to-sky-blue text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save Registration
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 border-2 border-gray/30 text-gray rounded-xl hover:bg-gray/10 transition-all flex items-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Package List Sidebar */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6">
                <h3 className="text-dark-slate mb-4">Available Packages</h3>
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-4 bg-gradient-to-br from-light-gray to-white border border-gray/20 rounded-xl hover:shadow-md transition-all cursor-pointer"
                    >
                      <h4 className="text-dark-slate mb-2">{pkg.name}</h4>
                      <div className="space-y-1 text-xs text-gray">
                        <p>Duration: {pkg.duration}</p>
                        <p>Price: {pkg.price}</p>
                        <p>Access: {pkg.zones}</p>
                      </div>
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
