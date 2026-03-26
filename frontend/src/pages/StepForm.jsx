import React, { useState } from 'react';
import StepperControl from '../components/StepperControl';
import Stepper from '../components/Stepper';

import Final from '../components/steps/Final';
import Personal from '../components/steps/Personal';
import Address from '../components/steps/Address';
import Professional from '../components/steps/Professional';
import Account from '../components/steps/Account';
import { signupDoctor } from '../api/auth';
const StepForm = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Account",
    "Personal",
    "Professional",
    "Address",
    "Complete"
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    specialization: "",
    qualification: "",
    university: "",
    address: {
      fullAddress: "",
      city: "",
      state: "",
      pincode: ""
    }
  });

  const displayStep = (step) => {
    switch (step) {

      case 1:
        return <Account formData={formData} setFormData={setFormData} />;

      case 2:
        return <Personal formData={formData} setFormData={setFormData} />;

      case 3:
        return <Professional formData={formData} setFormData={setFormData} />;

      case 4:
        return <Address formData={formData} setFormData={setFormData} />;

      case 5:
        return <Final formData={formData} />;

      default:
        return null;
    }
  };

  // Step navigation
  const handleClick = (direction) => {

    let newStep = currentStep;

    direction === "next"
      ? newStep++
      : newStep--;

    if (newStep > 0 && newStep <= steps.length) {
      setCurrentStep(newStep);
    }

  };

  // API call on submit
  const handleSubmit = async () => {
    try {
  
      const response = await signupDoctor(formData);
  
      console.log("DOCTOR registered:", response.data);
  
      alert("Registration successful");
  
    } catch (error) {
  
      console.log("Error:", error.response?.data || error.message);
  
      alert("Registration failed");
  
    }
  }; 

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      <div className="w-full bg-white rounded-lg shadow-xl sm:max-w-lg border border-gray-100">

        <div className="p-8 space-y-6">

          {/* Stepper */}
          <Stepper
            steps={steps}
            currentStep={currentStep}
          />

          {/* Step Content */}
          <div className="py-6 min-h-[280px]">
            {displayStep(currentStep)}
          </div>

          {/* Controls */}
          <StepperControl
            handleClick={handleClick}
            handleSubmit={handleSubmit}
            currentStep={currentStep}
            steps={steps}
          />

        </div>

      </div>

    </div>

  );
};

export default StepForm;