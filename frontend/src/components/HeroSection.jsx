import { useState, useEffect } from "react";
import health from "../assets/Group 21.png";
import arrow from "../assets/image 85.png";
import vector1 from "../assets/blob1.png";
import vector2 from "../assets/blob2.png";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import Heart from "../components/Heart"; 
import { AmbientLight } from "three";
const words = ["trusted", "accessible", "empower", "digital"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 lg:px-12 min-h-screen mt-32">
      {/* top image */}
      <div className="topbox w-full h-fit flex flex-row justify-center md:justify-start mb-10 md:mb-0">
        <div className="mt-5 left-[50%]">
          <img src={health} className="w-[120px] lg:w-[160px]" alt="HealthPulse" />
        </div>
      </div>

      {/* main section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* LEFT SECTION */}
        <div className="relative w-full lg:w-1/2 text-center lg:text-left">
          <img
            src={vector2}
            alt="background blob"
            className="fixed -z-10 top-[50px] left-[-40px] w-[220px] sm:w-[280px] lg:w-[350px] opacity-100"
          />
          <h1 className="font-semibold leading-[1.3] text-[34px] sm:text-[44px] md:text-[54px] lg:text-[70px] xl:text-[80px]">
            Your{" "}
            <span
              className={`inline-block transition-all duration-500
              bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#2563EB]
              bg-[length:200%_100%] animate-gradient
              bg-clip-text text-transparent
              ${visible ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"}`}
            >
              {words[index]}
            </span>
            <br />
            Health partner for rural India
          </h1>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-7 justify-center lg:justify-start">
            <button className="px-6 py-3 text-sm lg:text-base font-semibold bg-primary text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl">
              Create Profile
            </button>

            <button className="px-6 py-3 text-sm lg:text-base font-semibold bg-white border border-gray-300 text-primary rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105">
              How it works?
            </button>
          </div>

          {/* AI BUTTON */}
          <div className="mt-5 flex justify-center lg:justify-start">
            <button className="px-5 py-3 text-sm lg:text-base font-semibold bg-white border border-primary rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105">
              Not feeling well?{" "}
              <span className="text-primary underline inline-flex items-center gap-1 cursor-pointer">
                Talk to AI
                <img src={arrow} className="w-4 h-4" alt="arrow" />
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT SECTION (3D Embed) */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center">
          <div className="hb1 h-10 w-40 bg-[#dfedff] absolute top-2 left-0 z-100">
          </div>
         
          <img
            src={vector1}
            alt="background blob"
            className="fixed -z-10 top-[150px] right-[-40px] w-[220px] sm:w-[280px] lg:w-[350px] opacity-100"
          />
          
          <div className="w-full h-[350px] md:h-[300px] lg:h-[550px]">
          <Canvas camera={{ position: [0, 0, 0], fov: 50 }}>

<ambientLight intensity={1.5} />
<directionalLight position={[2, 2, 2]} />

<Suspense fallback={null}>
  <Heart scale={0.015} />
</Suspense>

<OrbitControls makeDefault enableZoom={false} />
<Environment preset='sunset'/>
</Canvas>
</div>
        </div>
      </div>
    </div>
  );
}