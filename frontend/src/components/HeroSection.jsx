import { useState, useEffect } from "react";
import health from "../assets/Group 21.png";
import arrow from "../assets/image 85.png";
import vector1 from "../assets/blob1.png";
import vector2 from "../assets/blob2.png";
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
      <div className="mb-6 mt-5">
        <img src={health} className="w-[120px] lg:w-[160px]" />
      </div>
      
      {/* main section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* LEFT SECTION */}
        <div className="relative w-full lg:w-1/2 text-center lg:text-left">
        <img
    src={vector2}
    alt="background blob"
    className="absolute -z-10 
    top-[-50px] left-[-40px]
    w-[220px] sm:w-[280px] lg:w-[350px] 
    opacity-100"
  />
          <h1 className="font-semibold leading-[1.3]
          text-[34px] sm:text-[44px] md:text-[54px] lg:text-[70px] xl:text-[80px]">

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

            <button
              className="px-6 py-3 text-sm lg:text-base font-semibold
              bg-primary text-white rounded-xl
              transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Create Profile
            </button>

            <button
              className="px-6 py-3 text-sm lg:text-base font-semibold
              bg-white border border-gray-300 text-primary
              rounded-xl shadow-xl transition-all duration-300
              transform hover:scale-105"
            >
              How it works?
            </button>

          </div>

          {/* AI BUTTON */}
          <div className="mt-5 flex justify-center lg:justify-start">

            <button
              className="px-5 py-3 text-sm lg:text-base font-semibold
              bg-white border border-primary rounded-xl
              shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Not feeling well?{" "}
              <span className="text-primary underline inline-flex items-center gap-1 cursor-pointer">
                Talk to AI
                <img src={arrow} className="w-4 h-4" />
              </span>
            </button>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/2 flex justify-center">
        <img
    src={vector1}
    alt="background blob"
    className="absolute -z-10 
    top-[80px] right-[-40px]
    w-[220px] sm:w-[280px] lg:w-[350px] 
    opacity-100"
  />
          <div className="w-[280px] sm:w-[350px] md:w-[420px] lg:w-[480px] h-[250px] sm:h-[320px] md:h-[380px] lg:h-[420px] bg-transparent rounded-2xl flex items-center justify-center text-white text-xl">
            Hello
          </div>

        </div>

      </div>
    </div>
   
  );
}