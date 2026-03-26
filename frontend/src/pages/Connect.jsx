import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Connect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // --- Patient State ---
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const specializations = [
    { label: "Cardiologist (Heart)", value: "cardiologist" },
    { label: "Dermatologist (Skin)", value: "dermatologist" },
    { label: "Pediatrician (Child)", value: "pediatrician" },
    { label: "Orthopedist (Bones)", value: "orthopedist" },
    { label: "Gynecologist (Women's Health)", value: "gynecologist" },
    { label: "Ophthalmologist (Eyes)", value: "ophthalmologist" },
    { label: "Dentist (Teeth)", value: "dentist" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Handlers ---
  const handleSpecialistSubmit = (e) => {
    e.preventDefault();
    if (selectedSpecialty) {
      navigate(`/lobby/${selectedSpecialty.value.toLowerCase()}`); 
    }
  };

  const handleGeneralDoctor = () => {
    navigate('/lobby/general'); 
  };

  const handleDoctorGoOnline = () => {
    // Navigate to the doctor's specific waiting room/dashboard
    navigate(`/lobby/${user.specialization.toLowerCase()}`);
  };

  // ==========================================
  // DOCTOR VIEW
  // ==========================================
  if (user?.role === 'doctor') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom right, #eef5ff, #e0efff)' }}>
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-blue-50 text-center">
          
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="poppins-bold text-3xl text-gray-900 mb-2">
              Doctor <span className="text-blue-500">Portal</span>
            </h2>
            <p className="inter-regular text-gray-500 text-sm">
              Welcome back, Dr. {user?.name || 'Guest'}. 
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <p className="inter-medium text-gray-700 mb-2">Current Status</p>
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400"></span>
              </span>
              <span className="inter-regular text-gray-500 text-sm">Offline — Not taking patients</span>
            </div>
          </div>

          <button
            onClick={handleDoctorGoOnline}
            className="w-full py-4 px-4 cursor-pointer rounded-full poppins-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-blue-500/30 transition-all duration-300"
          >
            Go Online & Enter Lobby
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // PATIENT VIEW
  // ==========================================
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom right, #eef5ff, #e0efff)' }}>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-blue-50">
        
        <div className="text-center mb-8">
          <h2 className="poppins-bold text-3xl text-gray-900 mb-2">
            Find a <span className="text-blue-500">Doctor</span>
          </h2>
          <p className="inter-regular text-gray-500 text-sm">
            Welcome back, {user?.name || 'Guest'}. How can we help you today?
          </p>
        </div>

        <form onSubmit={handleSpecialistSubmit} className="space-y-6">
          <div className="relative" ref={dropdownRef}>
            <label className="inter-medium block text-sm text-gray-700 mb-2">
              I know what I need:
            </label>
            
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border text-left transition-all ${
                isOpen ? 'border-blue-500 bg-white ring-4 ring-blue-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className={`inter-regular ${selectedSpecialty ? 'text-gray-900' : 'text-gray-400'}`}>
                {selectedSpecialty ? selectedSpecialty.label : 'Select a specialization...'}
              </span>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto py-2 animate-in fade-in slide-in-from-top-2">
                {specializations.map((spec) => (
                  <button
                    key={spec.value}
                    type="button"
                    onClick={() => {
                      setSelectedSpecialty(spec);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-5 cursor-pointer py-3 inter-regular transition-colors ${
                      selectedSpecialty?.value === spec.value 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {spec.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!selectedSpecialty}
            className={`w-full py-4 px-4 cursor-pointer rounded-full poppins-semibold text-white transition-all duration-300 ${
              selectedSpecialty 
                ? 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-blue-500/30 translate-y-0' 
                : 'bg-blue-200 cursor-not-allowed'
            }`}
          >
            Connect with Specialist
          </button>
        </form>

        <div className="relative flex items-center py-7">
          <div className="grow border-t border-gray-100"></div>
          <span className="shrink-0 mx-4 text-gray-400 inter-regular text-sm">OR</span>
          <div className="grow border-t border-gray-100"></div>
        </div>

        <div className="text-center">
          <p className="inter-regular text-sm text-gray-500 mb-4">
            Not sure what's wrong? Our general physicians can help.
          </p>
          <button
            onClick={handleGeneralDoctor}
            className="w-full py-4 px-4 cursor-pointer rounded-full poppins-semibold text-blue-600 bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm"
          >
            Talk to a General Doctor
          </button>
        </div>

      </div>
    </div>
  );
};

export default Connect;