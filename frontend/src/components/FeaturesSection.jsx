import React from 'react';
import FeatureCard from './FeatureCard';

import recordAnalysisGraphic from '../assets/Record_Analysis.png';
import doctorRoutingGraphic from '../assets/Doctor_Routing.png';
import medicineReminderGraphic from '../assets/Medicine_Reminder.png';
import diseaseDetectionGraphic from '../assets/Disease_Detection.png'; 
import aiChatGraphic from '../assets/AI_Chat_Support.png';
import emergencyAlertsGraphic from '../assets/Emergency_Alerts.png';
import '../index.css';
const FeaturesSection = () => {
  
  const features = [
    { 
      title: "Record Analysis", 
      description: "Upload reports, get AI insights, and keep your medical history saved.", 
      imageSrc: recordAnalysisGraphic 
    },
    { 
      title: "Doctor Routing", 
      description: "Automatically connects you to general or specialized doctors.", 
      imageSrc: doctorRoutingGraphic 
    },
    { 
      title: "Medicine Reminder", 
      description: "Never miss a dose with to-do list and alert system.", 
      imageSrc: medicineReminderGraphic 
    },
    { 
      title: "Disease Detection", 
      description: "AI analyzes symptoms and identifies possible conditions.", 
      imageSrc: diseaseDetectionGraphic 
    },
    { 
      title: "AI Chat Support", 
      description: "AI checks doctor notes for risks and follow-ups.", 
      imageSrc: aiChatGraphic 
    },
    { 
      title: "Emergency Alerts", 
      description: "Family members are notified during high-risk situations.", 
      imageSrc: emergencyAlertsGraphic 
    },
  ];

  return (
    <section 
      className="relative z-10 w-full py-20 px-6 md:px-16 lg:px-24 " 
    >

      <div className="max-w-[1400px] mx-auto">

        <div className="mb-5">
          <h2 className="text-[34px] sm:text-[44px] md:text-[54px] lg:text-[40px] xl:text-[50px] font-semibold text-center "
          >
           
            What We Provide
          </h2>
          <div className="w-24 h-[6px] rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 md:gap-10 max-w-[1400px] mx-auto px-4">
          {features.map((item, index) => (
          
            <FeatureCard 
              key={index} 
              title={item.title} 
              description={item.description} 
              imageSrc={item.imageSrc} 
              altText={item.title} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;