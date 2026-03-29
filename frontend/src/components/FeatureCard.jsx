import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FeatureCard = ({ title, description, imageSrc, altText }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Adjusted spring config for a more fluid, "heavy" premium feel
  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 30 });

  // Subdued the rotation slightly so it doesn't distort too much
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  // Dynamic glare effect mapping
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['-20%', '120%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['-20%', '120%']);

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
    <div style={{ perspective: '1500px' }} className="w-full h-full p-4 group">
      <motion.div
        layout
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          // Premium double-gradient border trick
          background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #60A5FA, #4338CA) border-box",
        }}
        className="relative bg-white/95 backdrop-blur-xl p-8 md:p-9 rounded-[2.5rem] border-[3px] border-transparent shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] flex flex-col items-start cursor-pointer overflow-hidden transition-shadow duration-500 h-60 sm:h-65 md:h-70 w-full max-w-90 mx-auto"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div
          style={{ left: glareX, top: glareY }}
          className="absolute w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
        />

        {/* --- TITLE & IMAGE SECTION --- */}
        <div className="flex justify-between items-start gap-4 z-10 w-full mb-6" style={{ transform: 'translateZ(50px)' }}>
          <h3 className="text-[22px] sm:text-[25px] font-black text-transparent bg-clip-text bg-linear-to-br from-blue-600 to-indigo-700 leading-[1.2] tracking-tight w-[65%] drop-shadow-sm">
            {title}
          </h3>
          
          <div className="w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center shrink-0 rounded-2xl bg-linear-to-br from-blue-50 to-indigo-50 shadow-inner p-3 ring-1 ring-white">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={altText} 
                className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110" 
                // Blend mode applies perfectly over the light gradient background
                style={{ mixBlendMode: 'multiply', transform: 'translateZ(20px)' }}
              />
            ) : (
              <div className="w-full h-full rounded-xl border-2 border-dashed border-blue-200/60" />
            )}
          </div>
        </div>

        {/* --- DESCRIPTION SECTION --- */}
        <p 
          className="text-gray-500 text-[15px] sm:text-[16px] font-medium leading-relaxed z-10 line-clamp-4 group-hover:text-gray-700 transition-colors duration-300" 
          style={{ transform: 'translateZ(30px)' }}
        >
          {description}
        </p>

      </motion.div>
    </div>
  );
};

export default FeatureCard;