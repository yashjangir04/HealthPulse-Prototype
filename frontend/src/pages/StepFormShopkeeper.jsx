import React, { useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import ShopAccount from "../components/steps/ShopAccount";
import ShopAddress from "../components/steps/ShopAddress";
import ShopDetails from "../components/steps/ShopDetails";
import ShopFinal from "../components/steps/ShopFinal";
import {signupShopkeeper} from "../api/auth";
const StepFormShopkeeper = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
     "Account",
     "Shop Details",
     "Address",
     "Review"
  ];
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    password: "",
    shopName: "",
    phoneNumber: "",
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
        return <ShopAccount formData={formData} setFormData={setFormData} />;
  
      case 2:
        return <ShopDetails formData={formData} setFormData={setFormData} />;
  
      case 3:
        return <ShopAddress formData={formData} setFormData={setFormData} />;
  
      case 4:
        return <ShopFinal formData={formData} setFormData={setFormData} />;
  
   
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
  
      const response = await signupShopkeeper(formData);
  
      console.log("Shopkeeper registered:", response.data);
  
      alert("Registration successful");
  
    } catch (error) {
  
      console.log("Error:", error.response?.data || error.message);
  
      alert("Registration failed");
  
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">

      <div className="w-full bg-white rounded-xl shadow-xl sm:max-w-xl border border-gray-100">

        <div className="p-8">

          {/* Header */}
          <div className="text-center mb-6">

            <h1 className="text-2xl font-semibold text-gray-800">
              Shopkeeper Registration
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

export default StepFormShopkeeper;