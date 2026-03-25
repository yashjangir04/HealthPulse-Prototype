import React, { useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import PatientAccount from "../components/steps/PatientAccount";
import PatientAddress from "../components/steps/PatientAddress";
import PatientFinal from "../components/steps/PatientFinal";
import PatientPersonal from "../components/steps/PatientPersonal";
import EmergencyContact from "../components/steps/EmergencyContact";
const StepFormPatient = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Account",
    "Personal",
    "Address",
    "Emergency Contact",
    "Complete"
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    bloodGroup: "",
    address: {
      fullAddress: "",
      city: "",
      state: "",
      pincode: ""
    },
    secondaryContacts: [
      {
        name: "",
        phoneNumber: ""
      }
    ]
  });
  const displayStep = (step) => {
    switch (step) {
  
      case 1:
        return <PatientAccount formData={formData} setFormData={setFormData} />;
  
      case 2:
        return <PatientPersonal formData={formData} setFormData={setFormData} />;
  
      case 3:
        return <PatientAddress formData={formData} setFormData={setFormData} />;
  
      case 4:
        return <EmergencyContact formData={formData} setFormData={setFormData} />;
  
      case 5:
        return <PatientFinal formData={formData} />;
  
      default:
        return null;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next"
      ? newStep++
      : newStep--;

    if (newStep > 0 && newStep <= steps.length) {
      setCurrentStep(newStep);
    }
  };

  const handleSubmit = async () => {
    try {

      const res = await fetch("/api/Patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Patient registered:", data);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">

      <div className="w-full bg-white rounded-xl shadow-xl sm:max-w-xl border border-gray-100">

        <div className="p-8">

          {/* Header */}
          <div className="text-center mb-6">

            <h1 className="text-2xl font-semibold text-gray-800">
              Patient Registration
            </h1>

          </div>

          <div className="border-t border-gray-200 mb-6"></div>

          {/* Stepper */}
          <Stepper
            steps={steps}
            currentStep={currentStep}
          />

          {/* Form Content */}
          <div className="py-8 min-h-[280px]">

            {displayStep(currentStep)}

          </div>

          <div className="border-t border-gray-200 mt-4 pt-6">

            {/* Controls */}
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
              handleSubmit={handleSubmit}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default StepFormPatient;