import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  Bell, Edit2, Trash2, User, Phone, MapPin, 
  X, CheckCircle, AlertCircle, Plus 
} from "lucide-react";

const initialData = {
  primary: [
    { id: 1, name: "Anushka Kohli", relation: "Spouse", phone: "+91 2345678990" },
    { id: 2, name: "Rahul Sharma", relation: "Brother", phone: "+91 9876543210" },
  ],
  secondary: [
    { id: 3, name: "Vijay Sharma", initials: "VS", phone: "+91 2345678990" },
    { id: 4, name: "Raj Kumar", initials: "RK", phone: "+91 2345678980" },
  ],
};
import { useAuth } from "../auth/AuthContext";
import { CalculateAge } from "../utils/CalculateAge";

const ContactPage = () => {
  const { user } = useAuth() ;
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", relation: "" });
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [settings, setSettings] = useState({
  sms: true,
  calls: true,
  gps: true,
});

//----------Toast Function--------------//
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Get initials
  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  // Save Contact
  const handleSave = () => {
    if (!form.name || !form.phone) {
      showToast("Please fill all required fields", "error");
      return;
    }

    // 🌍 Global phone validation (E.164)
    if (!/^\+[1-9]\d{7,14}$/.test(form.phone)) {
      showToast("Enter valid number (+xx xxxxxx)", "error");
      return;
    }

    const newContact = {
      id: Date.now(),
      ...form,
      initials: getInitials(form.name),
    };

    setData((prev) => ({
      ...prev,
      secondary: [...prev.secondary, newContact],
    }));

    showToast("New contact added");
    setIsModalOpen(false);
    setForm({ name: "", phone: "", relation: "" });
  };

  const isSecondaryEmpty = data.secondary.length === 0;

  //-------Main Page Layout--------
  return (
    <div className="min-h-screen bg-secondary font-sans text-slate-800 p-8 flex">
      
      {/* -------Toast Portal------- */}
      {toast && createPortal(
        <div className="fixed inset-x-0 top-10 flex justify-center z-[10001] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md border ${
            toast.type === "error" ? "bg-red-50/90 border-red-200 text-red-600" : "bg-white/90 border-emerald-100 text-emerald-600"
          }`}>
            {toast.type === "error" ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            <span className="font-semibold text-sm tracking-wide">{toast.msg}</span>
          </div>
        </div>,
        document.body
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 w-full">
        
        {/* -------Left Column: Contacts------- */}
        <div className="flex-1 bg-white rounded-[40px] shadow-sm border border-slate-100 p-6 sm:p-10 h-full">
          {/* THIN SEPARATOR ADDED HERE (pb-6 border-b border-slate-200) */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Phone size={24} />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-blue-600">Emergency Contacts</h1>
          </div>

          <div className="space-y-12">
            {/* PRIMARY SECTION */}
            <section>
              <h3 className="text-s font-bold uppercase tracking-widest text-slate-400 mb-6">Primary Contacts</h3>
              <div className={`grid gap-6 ${
              data.secondary.length === 0 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2"
            }`}>
                {data.primary.map((c) => (
                  <ContactCard 
                    key={c.id} 
                    contact={c} 
                    primary 
                  />
                ))}
              </div>
            </section>

            {/* SECONDARY SECTION */}
            {!isSecondaryEmpty && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-s font-bold uppercase tracking-widest text-slate-400">Secondary Contacts</h3>
                <button 
                  onClick={() => { setEditMode(false); setForm({name:"", phone:"", relation:""}); setIsModalOpen(true); }}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                  <Plus size={16} /> Add New
                </button>
              </div>
          
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.secondary.map((c) => (
                    <ContactCard
                      key={c.id}
                      contact={c}
                      onDelete={() => {
                        setData((prev) => ({
                          ...prev,
                          secondary: prev.secondary.filter((x) => x.id !== c.id),
                        }));
                        showToast("Deleted", "error");
                      }}
                    />
                  ))}
                </div>
            </section>
            )}

            {isSecondaryEmpty && (
          <div className="text-center text-slate-400">
            <p className="text-lg font-medium">No secondary contacts</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 text-blue-600 font-semibold"
            >
              + Add Contact
            </button>
          </div>
        )}
          </div>
        </div>

        {/* -------Right Column: Profile Details------- */}
        <div className="w-full lg:w-[380px] flex flex-col">
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 overflow-hidden relative h-full flex flex-col h-full">
            
            {/* THIN SEPARATOR ADDED HERE (pb-6 border-b border-slate-200) */}
            <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-8 pb-6 border-b border-slate-200">Profile Details</h2>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-200 overflow-hidden">
                <img 
                  src="https://i.pravatar.cc/150?u=newuser"  
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">{user.name}</h4>
                <p className="text-slate-500 font-medium text-sm">{CalculateAge(user.dob)} Years • {user.gender}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-6 h-full">
              <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200">
                <p className="text-sm text-slate-500 mb-2">Your Phone</p>
              <div className="h-px bg-slate-300 mb-3" />
                <p className="text-lg font-semibold text-slate-700">+91 {user.phoneNumber.slice(0,5)} {user.phoneNumber.slice(5)}</p>
              </div>
              
              <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col flex-1">
                <p className="text-sm text-slate-500 mb-2">Allow</p>
                <div className="h-px bg-slate-300 mb-4" />

                <div className="space-y-4 mt-2">
                  <Toggle 
                    label="SMS Alerts" 
                    active={settings.sms} 
                    onToggle={() => setSettings(prev => ({ ...prev, sms: !prev.sms }))}
                  />

                  <Toggle 
                    label="Automated Calls" 
                    active={settings.calls} 
                    onToggle={() => setSettings(prev => ({ ...prev, calls: !prev.calls }))}
                  />

                  <Toggle 
                    label="Share GPS Location" 
                    active={settings.gps} 
                    onToggle={() => setSettings(prev => ({ ...prev, gps: !prev.gps }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REFINED MODAL (MATCHING REFERENCE) */}
      {isModalOpen && createPortal(
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-[10000] p-4">
        <div 
          className="bg-white rounded-[32px] w-full max-w-md sm:max-w-lg shadow-2xl animate-in zoom-in-95 fade-in duration-200"
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Plus size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editMode ? "Edit Contact" : "Add New Contact"}
                </h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input
                  placeholder="+91 9876543210"
                  value={form.phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^\d+]/g, "");

                    if (value.includes("+")) {
                      value = "+" + value.replace(/\+/g, "");
                    }

                    setForm({ ...form, phone: value });
                  }}
                  className="w-full p-3 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Relation</label>
                <input
                  placeholder="Relation"
                  value={form.relation}
                  onChange={(e) => setForm({ ...form, relation: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full mt-10 bg-[#4C84FF] hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
            >
              Save Contact
            </button>
          </div>
        </div>
      </div>,
      document.body // This sends the modal to the very end of <body>
    )}
    </div>
  );
};

// COMPONENT: REFINED CONTACT CARD
const ContactCard = ({ contact, primary, onNotify, onDelete }) => (
  <div className={`group bg-white rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] animate-in fade-in ${
primary 
? "border-blue-100 shadow-[0_10px_30px_rgba(59,130,246,0.15)] flex flex-col gap-3 py-5"
: "border border-slate-400 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-100 flex flex-col gap-4 relative transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
  }`}>
    <div className={`flex items-center gap-3 ${primary ? "mb-4" : "mb-6"}`}>
      <div className={`shrink-0 rounded-2xl font-bold flex items-center justify-center ${
        primary 
        ? "w-14 h-14 bg-blue-600 text-white text-lg" 
        : "w-12 h-12 bg-slate-100 text-slate-600 text-sm"
      }`}>
        {contact.initials || contact.name.split(" ").map(n => n[0]).join("").toUpperCase()}
      </div>

      <div className="flex flex-col gap-1.5">
  <h4 className={`font-bold text-slate-900 ${primary ? "text-lg" : "text-base"}`}>
    {contact.name}
  </h4>

  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium flex-wrap mt-1">
    <span>{contact.relation || "Contact"}</span>
    <span className="w-1 h-1 rounded-full bg-slate-300" />
    <span className="whitespace-nowrap">{contact.phone}</span>
  </div>
</div>
    </div>

    <div className="w-full mt-auto">

      {!primary && (
        <div className="flex gap-2 justify-end mt-2">
          
          <button onClick={onDelete} className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-110">
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  </div>
);

// COMPONENT: SIMPLE TOGGLE
const Toggle = ({ label, active, onToggle }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-slate-600">{label}</span>

    <div 
      onClick={onToggle}
      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
        active ? "bg-emerald-400" : "bg-slate-200"
      }`}
    >
      <div
        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
          active ? "right-1" : "left-1"
        }`}
      />
    </div>
  </div>
);

export default ContactPage;