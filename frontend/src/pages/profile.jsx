import React, { useState, useRef } from 'react';
import EditProfileModal from '../components/EditProfileModal';
import MedicationManagerModal from '../components/MedicationManagerModal'; // 2. Add these imports
import ReportsListOverlay from '../components/ReportsListOverlay';
import { Edit3, Heart, Activity, Plus, Pill, Upload, ChevronRight, ChevronUp } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const ProfileContent = () => {

// 🔹 MODAL STATE CONTROL

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  const navigate = useNavigate();

// 🔹 FILE INPUT REF (Hidden Upload Trigger)

   const fileInputRef = useRef(null);

// 🔹 MAIN USER DATA (Single Source of Truth)
  
const [userData, setUserData] = useState({
    name: "Virat Sharma",
    email: "v.sharma@gmail.com",
    avatar: "",
    dob: "5-Aug-1997",
    age: 28,
    weight: 75,
    height: "5'11 ft",
    gender: "Male",
    bloodGroup: "A+",
    address: "Near Lodha Garden, Sector 23, New Delhi, India",
    phoneNumber: "+91 - 63752 XXXXX",
    secondaryContact: "Anjali Sharma (Wife) - +91 98765 XXXX",
    diagnoses: ["Type 2 Diabetes", "Hypertension"],

    // Medications array
    medications: [
      { name: "Metterrin", dose: "500mg", time: "09:00 AM", reminderSet: true },
      { name: "Lisinpoil", dose: "10mg", time: "08:00 PM", reminderSet: true },
      { name: "Vitamin B12", dose: "", time: "02:00 PM", reminderSet: false }
    ],

    // Health vitals
    vitals: { bp: "121/75", pulse: "67" },

    // Reports (add url for backend future use)
    reports: [
      { title: "X-Ray-Virat Sharma", date: "01/10/2022" },
      { title: "Allergen-specific IgE", date: "17/05/2021" },
      { title: "Nascal Endoscopy", date: "18/04/2020" }
    ]
  });

// --- HANDLERS ---

  //  REPORT UPLOAD HANDLER
  // (Currently UI simulation)
  const handleReportUpload = (file) => {
    if (!file) return;

    const newReport = {
      title: file.name.replace(/\.[^/.]+$/, ""),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }),
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    };

    setUserData(prev => ({
      ...prev,
      reports: [newReport, ...prev.reports]
    }));
  };

    // FILE INPUT CHANGE

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleReportUpload(file);
    e.target.value = null; // reset input
    };

    // AVATAR CHANGE HANDLER

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            // This updates the local UI immediately
            setUserData({ ...userData, avatar: reader.result });
            console.log("File ready for backend upload:", file);
        };
        reader.readAsDataURL(file);
        }
    };

      // SAVE PROFILE (FAKE BACKEND)

    const handleSaveProfile = (updatedFields) => {
    // 1. Update the local UI state immediately
    const NewUserData = { ...userData, ...updatedFields };
    setUserData(NewUserData);

    // 2. THE FAKE SYNC: Save to LocalStorage
    localStorage.setItem("healthpulse_user_data", JSON.stringify(NewUserData));

    console.log("Fake Backend Sync Successful: Data saved to LocalStorage");
    setIsEditModalOpen(false);
    };

    // TOGGLE MEDICATION REMINDER

    const handleToggleReminder = (index) => {
        const updatedMeds = [...userData.medications];
        updatedMeds[index].reminderSet = !updatedMeds[index].reminderSet;
        setUserData({ ...userData, medications: updatedMeds });
    };

      // VITAL STATUS LOGIC

    const getVitalStatus = (bp, pulse) => {
        const [systolic, diastolic] = bp.split('/').map(Number);
        if (systolic >= 140 || pulse > 100) return { label: "Attention", color: "bg-red-500" };
        return { label: "Normal", color: "bg-[#22C55E]" };
    };

  const status = getVitalStatus(userData.vitals.bp, userData.vitals.pulse);

    // UI STARTS HERE

  return (
    <div className="p-4 md:p-8 grid grid-cols-12 gap-6 bg-[#E3EEFF]/50 min-h-screen">
        
      
      {/* LEFT COLUMN: PRIMARY INFO & HEALTH STATUS */}
      <div className="col-span-12 lg:col-span-8 space-y-4">
        
        {/* MAIN IDENTITY CARD */}
        <section className="col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl border-[2px] border-[#1B80FD]/20 relative flex flex-col md:flex-row gap-8 lg:gap-12 max-w-[1000px]">
          <div className="flex flex-col items-center w-full md:w-[40%] shrink-0">

            {/* AVATAR SECTION WITH EDIT CAPABILITY */}
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full border-2 border-blue-50 overflow-hidden mb-3 bg-slate-100 relative shadow-inner">
                <img 
                  src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              {/* Trigger for Avatar Change */}
              <label htmlFor="avatar-upload" className="absolute bottom-3 right-0 bg-[#1B80FD] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform">
                <Plus size={14} />
              </label>
              <input 
                id="avatar-upload" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleAvatarChange} 
              />
            </div>
            <h2 className="font-bold text-xl text-slate-800 mb-4 tracking-tight">{userData.name}</h2>
            <div className="w-full border-t border-slate-50 mb-5"></div>
            <div className="grid grid-cols-2 gap-2.5 w-full">
              <StatBox label="DOB" value={userData.dob} />
              <StatBox label="AGE" value={userData.age} />
              <StatBox label="WEIGHT" value={`${userData.weight} kg`} />
              <StatBox label="HEIGHT" value={userData.height} />
              <StatBox label="GENDER" value={userData.gender} />
              <StatBox label="BLOOD GROUP" value={userData.bloodGroup} />
            </div>
          </div>

          <div className="hidden md:block w-[5px] bg-slate-100 self-stretch my-2"></div>

          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="space-y-8">
              <InfoBox label="Home Address" value={userData.address} />
              <InfoBox label="Mobile Phone" value={userData.phoneNumber} />
              <InfoBox label="Email" value={userData.email} />
              <div className="pt-2 border-t border-slate-50 flex justify-between items-center group cursor-pointer" onClick={() => navigate("/contact")}>
                <div>
                  <p className="text-slate-400 font-medium text-sm">Secondary Contact</p>
                  <p className="text-slate-600 font-semibold text-sm italic">{userData.secondaryContact}</p>
                </div>
                <ChevronRight size={18} className="text-[#1B80FD] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="mt-8 w-fit flex items-center gap-2 px-8 py-2.5 bg-[#EBF3FF] text-[#1B80FD] rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#1B80FD] hover:text-white transition-all duration-300 shadow-sm"
            >
              <Edit3 size={14}/> Edit Profile
            </button>
          </div>
        </section>

        {/* HEALTH STATUS (FROM OCR) */}
        <section className="bg-white rounded-[2.5rem] p-10 shadow-xl border-[2px] border-[#1B80FD]/10">
          <div className="mb-6">
            <h3 className="text-2xl font-light text-slate-400 tracking-tight">Current Health Status</h3>
            <div className="w-16 h-1 bg-[#1B80FD] rounded-full mt-2"></div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <StatusItem label="Active Diagnoses" value={userData.diagnoses.join(", ")} />
            <StatusItem label="Severity/Status" value="Controlled, Chronic" />
            <StatusItem label="Type of Diagnosis" value="Chronic" />
            <StatusItem label="Date of Diagnosis" value="2010, 2012" />
            <StatusItem label="Drug Allergies" value="Penicillin, Sulfa" />
            <StatusItem label="Food/Environmental" value="Peanuts, Latex" />
          </ul>
        </section>
      </div>

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleFileChange}
      />
      
      {/* RIGHT COLUMN: MEDS, VITALS, REPORTS */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
        
        {/* MEDICATIONS */}
        <section className="bg-white rounded-[2.5rem] shadow-xl border-[2px] border-[#1B80FD]/10 overflow-hidden h-fit">
          <div className="px-8 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-light text-slate-400 tracking-tight">Current Medications</h3>
            <Pill size={20} className="text-[#1B80FD]/50" />
          </div>
          <div className="px-8 py-6 space-y-5">
            {userData.medications.slice(0, 3).map((med, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-2 h-2 rounded-full bg-[#1B80FD]"></div>
                <p className="text-lg font-normal text-slate-600 tracking-wide">{med.name} <span className="text-sm text-slate-400 ml-2">{med.dose}</span></p>
              </div>
            ))}
            <button 
              onClick={() => setIsMedModalOpen(true)}
              className="w-full mt-4 text-[#1B80FD] font-bold text-xs uppercase tracking-widest text-left hover:translate-x-1 transition-transform"
            >
              Show All Medicines ›
            </button>
          </div>
        </section>

        {/* VITALS (FROM OCR) */}
        <section className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-[2px] border-[#1B80FD]/10">
          <div className="px-8 py-4 flex justify-between items-center border-b border-gray-100">
            <span className="text-xl font-light text-slate-400 tracking-tight">Recent Vitals</span>
            <span className={`px-3 py-1 ${status.color} text-white text-[10px] rounded-full font-bold uppercase tracking-widest`}>
              {status.label}
            </span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <VitalItem icon={Heart} label="BP" value={userData.vitals.bp} color="text-red-400" />
            <VitalItem icon={Activity} label="Pulse" value={userData.vitals.pulse} unit="BPM" color="text-[#1B80FD]" />
          </div>
        </section>

        {/* LAB REPORTS */}
        <section className="bg-white rounded-[2.5rem] p-8 shadow-xl border-[2px] border-[#1B80FD]/10 flex flex-col h-fit">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-light text-slate-400 tracking-tight">Lab Reports</h3>
            <button 
            onClick={() => fileInputRef.current.click()}
            className="bg-[#1B80FD] text-white p-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <Plus size={18}/>
            </button>
          </div>
          <div className="space-y-4 mb-6">
            {userData.reports.map((report, i) => (
              <div key={i} className="flex justify-between items-center text-sm group cursor-pointer border-b border-transparent hover:border-blue-50 pb-1">
                <p className="text-slate-600 font-medium truncate max-w-[150px]"><span className="text-blue-300 mr-2">›</span>{report.title}</p>
                <p className="text-slate-400 text-[10px] font-mono">{report.date}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <button onClick={() => setIsReportsOpen(true)} className="text-[#1B80FD] font-bold text-xs underline underline-offset-8 decoration-dotted uppercase tracking-widest">Show All</button>
            <div className="w-10 h-10 rounded-full bg-[#F2F7FF] text-[#1B80FD] flex items-center justify-center border border-blue-100">
              <ChevronUp size={20} />
            </div>
          </div>
        </section>
      </div>

      {/* OVERLAY */}
      <ReportsListOverlay
        isOpen={isReportsOpen}
        onClose={() => setIsReportsOpen(false)}
        reports={userData.reports}
        onUpload={handleReportUpload}
      />

      {/* EDIT PROFILE */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        userData={userData} 
        onSave={handleSaveProfile} 
      />

      {/* MEDICATION MODAL */}
      <MedicationManagerModal 
        isOpen={isMedModalOpen} 
        onClose={() => setIsMedModalOpen(false)} 
        medications={userData.medications} 
        onToggleReminder={handleToggleReminder} 
      />


    </div>
  );
};

// HELPER COMPONENTS
const InfoBox = ({ label, value }) => (
  <div>
    <p className="text-slate-400 font-medium text-sm mb-1">{label}</p>
    <p className="text-slate-600 font-semibold leading-tight">{value}</p>
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="bg-[#EBF3FF] p-3 rounded-xl text-center border border-blue-50/50 shadow-sm">
    <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-tighter">{label}</p>
    <p className="text-[13px] font-bold text-slate-600">{value}</p>
  </div>
);

const StatusItem = ({ label, value }) => (
  <li className="flex flex-col gap-1">
    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{label}</span>
    <p className="text-slate-700 font-medium text-sm">{value}</p>
  </li>
);

const VitalItem = ({ icon: Icon, label, value, unit, color }) => (
  <div className="p-6 flex flex-col items-center group">
    <Icon className={`${color} mb-2 transition-transform group-hover:scale-110`} size={28} strokeWidth={1.5} />
    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-bold text-slate-700">{value} <span className="text-xs font-normal text-slate-400">{unit}</span></p>
  </div>
);

export default ProfileContent;