import React, { useRef } from 'react';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';



const FeatureCard = ({ title, description, imageSrc, altText }) => {

  const cardRef = useRef(null);

  const x = useMotionValue(0);

  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);

  const mouseYSpring = useSpring(y);



  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['20deg', '-20deg']);

  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-20deg', '20deg']);


  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);

  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);



  const handleMouseMove = (event) => {

    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;

    const height = rect.height;

    const mouseX = event.clientX - rect.left;

    const mouseY = event.clientY - rect.top;

    const normalizedX = (mouseX / width) - 0.5;

    const normalizedY = (mouseY / height) - 0.5;



    x.set(normalizedX);

    y.set(normalizedY);

  };



  const handleMouseLeave = () => {


    x.set(0);

    y.set(0);

  };

  return (
    <div
      style={{ perspective: '1200px' }} 
      className="w-full h-full p-2 group"
    >
      <motion.div
      layout
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
          background: "linear-gradient(white, white) padding-box, linear-gradient(to bottom, #65A8FB, #3C6395) border-box",
        }}
        className="relative bg-white/90 backdrop-blur-md p-9 rounded-[2.5rem] md:rounded-[2.5rem] border-4 border-transparent shadow-[0_px_35px_rgba(0,0,0,0.8)] flex flex-col items-start cursor-pointer overflow-hidden transition-shadow-[0_20px_40px_rgba(186,215,255,0.4),0_1px_4px_rgba(0,0,0,0.05)] 
        h-[210px] sm:h-[220px] md:h-[240px] 
        w-full max-w-[350px] sm:max-w-none md: max-w-[320px] w-full mx-auto group-hover:shadow-[0_35px_60px_rgba(186,215,255,0.6)]"
      >
        <motion.div
          style={{ x: glareX, y: glareY }}
          className="absolute inset-[-100%] z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* --- TITLE & IMAGE SECTION --- */}
        <div className="flex justify-between items-start gap-4 z-10 w-full h-[70px] mb-2" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-[26px] font-bold text-[#1B80FD] leading-tight tracking-tight w-[65%]">
            {title}
          </h3>
          
          <div className="w-[60px] h-[60px] flex items-center justify-center shrink-0">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={altText} 
                className="w-full h-full object-contain" 
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-blue-50 border-2 border-dashed border-blue-100" />
            )}
          </div>
        </div>

        {/* --- DESCRIPTION SECTION --- */}
        <p className="text-[#000000] text-[17px] font-medium leading-relaxed z-10 line-clamp-3" style={{ transform: 'translateZ(20px)' }}>
          {description}
        </p>
      </motion.div>
    </div>
  );
};



export default FeatureCard;
