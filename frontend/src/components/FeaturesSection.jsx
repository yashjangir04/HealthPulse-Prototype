import React from "react";
import FeatureCard from "./FeatureCard";

import recordAnalysisGraphic from "../assets/Record_Analysis.png";
import doctorRoutingGraphic from "../assets/Doctor_Routing.png";
import medicineReminderGraphic from "../assets/Medicine_Reminder.png";
import diseaseDetectionGraphic from "../assets/Disease_Detection.png";
import aiChatGraphic from "../assets/AI_Chat_Support.png";
import emergencyAlertsGraphic from "../assets/Emergency_Alerts.png";

const FeaturesSection = () => {

  const features = [
    {
      title: "Record Analysis",
      description:
        "Upload reports, get AI insights, and keep your medical history saved.",
      imageSrc: recordAnalysisGraphic,
    },
    {
      title: "Doctor Routing",
      description:
        "Automatically connects you to general or specialized doctors.",
      imageSrc: doctorRoutingGraphic,
    },
    {
      title: "Medicine Reminder",
      description:
        "Never miss a dose with to-do list and alert system.",
      imageSrc: medicineReminderGraphic,
    },
    {
      title: "Disease Detection",
      description:
        "AI analyzes symptoms and identifies possible conditions.",
      imageSrc: diseaseDetectionGraphic,
    },
    {
      title: "AI Chat Support",
      description:
        "AI checks doctor notes for risks and follow-ups.",
      imageSrc: aiChatGraphic,
    },
    {
      title: "Emergency Alerts",
      description:
        "Family members are notified during high-risk situations.",
      imageSrc: emergencyAlertsGraphic,
    },
  ];

  return (
    <section className="relative z-10 w-full py-16 px-4 sm:px-6 md:px-12 lg:px-20">

      <div className="max-w-[1400px] mx-auto">

        {/* Section Title */}
        <div className="mb-12 text-center">

          <h2 className="text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-semibold text-gray-900">
            What We Provide
          </h2>

        

        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">

          {features.map((item, index) => (

            <div key={index} className="flex justify-center">

              <FeatureCard
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                altText={item.title}
              />

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;