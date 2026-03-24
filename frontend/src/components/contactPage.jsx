import React, { useState } from 'react';

// --- SUB-COMPONENTS ---

const PrimaryContactCard = ({ name, relation, phone }) => (
  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl shadow-blue-100/20 max-w-md">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anushka" alt="avatar" />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-lg leading-tight">{name}</h4>
        <p className="text-sm text-gray-500 font-medium">{relation}</p>
        <p className="text-sm text-gray-400">{phone}</p>
      </div>
    </div>
    
    <button className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-md mb-4 hover:bg-gray-200 transition">
      Share Location <span className="text-xs">📍</span>
    </button>
    
    <div className="flex gap-3">
      <button className="bg-[#4C84FF] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-semibold hover:bg-blue-600 transition shadow-md shadow-blue-200">
        <span>🔔</span> Notify Now
      </button>
      <button className="bg-[#F0F5FF] text-[#4C84FF] px-5 py-2.5 rounded-full text-sm font-semibold border border-blue-100 hover:bg-blue-100 transition">
        Edit ✎
      </button>
    </div>
  </div>
);

const SecondaryContactCard = ({ name, initials, phone }) => (
  <div className="bg-white border border-gray-100 rounded-3xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
    <div className="w-14 h-14 rounded-full bg-[#DCE8FF] text-[#4C84FF] flex items-center justify-center font-bold mb-3">
      {initials}
    </div>
    <h4 className="font-bold text-gray-800 text-sm mb-1">{name}</h4>
    <p className="text-[10px] text-gray-400 mb-4">{phone}</p>
    
    <div className="flex gap-2">
      <button className="bg-[#4C84FF] text-white text-[10px] px-3 py-1.5 rounded-full font-bold">
        Notify Now
      </button>
      <button className="bg-blue-50 text-blue-400 text-[10px] px-2 py-1.5 rounded-full border border-blue-100">
        Edit ✎
      </button>
    </div>
  </div>
);

const ToggleSwitch = ({ label, defaultChecked }) => {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <div className="flex justify-between items-center py-2.5">
      <span className="text-gray-500 text-sm font-medium">{label}</span>
      <button 
        onClick={() => setEnabled(!enabled)}
        className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${enabled ? 'bg-[#2DD4BF]' : 'bg-gray-300'}`}
      >
        <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFF] p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SECTION: Emergency Contacts */}
        <div className="flex-[2] bg-white rounded-[40px] p-8 shadow-sm border border-blue-50">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-[#EBF2FF] p-2 rounded-xl">
              <span className="text-blue-500 text-xl">🔗</span>
            </div>
            <h2 className="text-[#4C84FF] font-bold text-2xl tracking-tight">Your Emergency Contacts</h2>
          </div>

          <div className="mb-12">
            <h3 className="text-gray-800 font-bold mb-6 text-lg">Primary Emergency Contacts</h3>
            <PrimaryContactCard 
              name="Anushka Kohli" 
              relation="Spouse" 
              phone="+91 2345678990" 
            />
          </div>

          <div>
            <h3 className="text-gray-800 font-bold mb-6 text-lg">Secondary Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <SecondaryContactCard name="Vijay sharma" initials="VS" phone="+91 2345678990" />
              <SecondaryContactCard name="Raj kumar" initials="RK" phone="+91 2345678980" />
              <SecondaryContactCard name="Manoj kumar" initials="MK" phone="+91 2345689990" />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: User Details */}
        <div className="flex-1 max-w-md lg:max-w-sm">
          <div className="bg-white rounded-[40px] shadow-sm border border-blue-50 overflow-hidden">
            {/* Header */}
            <div className="bg-[#F8FAFF] py-4 text-center border-b border-white">
              <h3 className="text-[#4C84FF] font-bold text-lg">Your Details</h3>
            </div>
            
            <div className="p-8">
              {/* Profile Info */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Virat" alt="profile" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-lg">Virat Sharma</h4>
                  <p className="text-sm text-gray-500 font-medium">28, Male</p>
                </div>
              </div>

              {/* Phone Input Box */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-8 shadow-sm shadow-blue-50">
                <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Your Phone</label>
                <div className="mt-2 text-gray-700 font-semibold border-b border-gray-100 pb-1">
                  +91 98XXX XXX41
                </div>
              </div>

              {/* Toggles */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm shadow-blue-50">
                <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest block mb-2">Allow</label>
                <ToggleSwitch label="SMS Alerts" defaultChecked={true} />
                <ToggleSwitch label="Automated Calls" defaultChecked={true} />
                <ToggleSwitch label="Share GPS Location" defaultChecked={true} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;