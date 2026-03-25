import React, { useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";

import Account from "../components/steps/Account";
import Personal from "../components/steps/Personal";
import Professional from "../components/steps/Professional";
import Address from "../components/steps/Address";
import Final from "../components/steps/Final";

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
        return (
          <Account
            formData={formData}
            setFormData={setFormData}
          />
        );

      case 2:
        return (
          <Personal
            formData={formData}
            setFormData={setFormData}
          />
        );

      case 3:
        return (
          <Professional
            formData={formData}
            setFormData={setFormData}
          />
        );

      case 4:
        return (
          <Address
            formData={formData}
            setFormData={setFormData}
          />
        );

      case 5:
        return <Final formData={formData} />;

      default:
        return null;
    }
  };

  const handleClick = (direction) => {

    let newStep = currentStep;

    direction === "next"
      ? newStep++
      : newStep--;

    newStep > 0 &&
      newStep <= steps.length &&
      setCurrentStep(newStep);
  };

  const handleSubmit = async () => {

    try {

      const res = await fetch("/api/doctor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      console.log("Doctor registered:", data);

    } catch (error) {

      console.log("Error:", error);

    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      <div className="w-full bg-white rounded-lg shadow-xl shadow-primary/50 sm:max-w-lg border border-gray-100">

        <div className="p-8 space-y-6">

          {/* Stepper */}
          <Stepper
            steps={steps}
            currentStep={currentStep}
          />

          {/* Form content */}
          <div className="py-6">
            {displayStep(currentStep)}
          </div>

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

  );
};

export default StepForm;