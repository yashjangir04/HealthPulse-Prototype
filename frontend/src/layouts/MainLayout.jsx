import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // handle responsive sidebar behavior
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsCollapsed(true);   // mobile → collapsed
      setIsOpen(false);       // close expanded sidebar
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);




  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setIsOpen={setIsOpen} />

      {/* layout wrapper */}
      <div className={`flex flex-1 ${true ? 'pt-24' : 'pt-0'}`}>

        <Sidebar isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          isOpen={isOpen}
          setIsOpen={setIsOpen} 
        />


        <main 
          className={`flex-1 transition-all duration-300 ease-in-out 
          min-h-[calc(100vh-6rem)] rounded-none m-0
          ml-0 
          ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
        `}
        >
          
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;