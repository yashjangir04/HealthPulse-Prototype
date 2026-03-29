import React from "react";
import { motion } from "framer-motion";
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
        "Upload reports, get AI insights, and keep your medical history safely stored.",
      imageSrc: recordAnalysisGraphic,
    },
    {
      title: "Doctor Routing",
      description:
        "Automatically connects you to the right general or specialized doctors.",
      imageSrc: doctorRoutingGraphic,
    },
    {
      title: "Medicine Reminder",
      description:
        "Never miss a dose with our smart to-do list and active alert system.",
      imageSrc: medicineReminderGraphic,
    },
    {
      title: "Disease Detection",
      description:
        "AI analyzes your symptoms and identifies possible conditions early.",
      imageSrc: diseaseDetectionGraphic,
    },
    {
      title: "AI Chat Support",
      description:
        "Intelligent assistant checks doctor notes for risks and schedules follow-ups.",
      imageSrc: aiChatGraphic,
    },
    {
      title: "Emergency Alerts",
      description:
        "Family members and doctors are instantly notified during high-risk situations.",
      imageSrc: emergencyAlertsGraphic,
    },
  ];

  // Framer Motion variants for the staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      } 
    },
  };

  return (
    <section className="relative z-10 w-full py-20 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden bg-white">
      
      {/* Subtle Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[-5%] w-75 h-75 bg-blue-100/50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-100 h-100 bg-indigo-50/60 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
             <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600"></span>
             <span className="text-sm font-bold text-blue-700 tracking-wide uppercase">Core Capabilities</span>
             <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          </div>
          
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] font-black text-gray-900 leading-[1.15] tracking-tight max-w-3xl mb-6">
            Everything you need for{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              smarter healthcare.
            </span>
          </h2>
          
          <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed">
            Discover our comprehensive suite of AI-powered tools designed to make your health journey more accessible, efficient, and reliable.
          </p>
        </div>

        {/* Feature Cards Grid with Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-12"
        >
          {features.map((item, index) => (
            <motion.div key={index} variants={cardVariants} className="flex justify-center h-full">
              <FeatureCard
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                altText={item.title}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturesSection;