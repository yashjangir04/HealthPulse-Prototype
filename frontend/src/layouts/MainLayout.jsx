import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// 1. Added showNavbar and showSidebar props, defaulting to true
const MainLayout = ({ children, showNavbar = true, showSidebar = true , isFullHeighted = true }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // mobile
        setIsCollapsed(true);
        setIsOpen(false);
      } else {
        // desktop
        setIsCollapsed(false); // expanded by default
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* 2. Conditionally render the Navbar */}
      {showNavbar && <Navbar setIsOpen={setIsOpen} />}

      {/* 3. Remove the top padding (pt-20/24) if the Navbar is hidden */}
      <div className={`flex flex-1 flex-row ${showNavbar ? 'pt-0 md:pt-0' : ''}`}>

        {/* 4. Conditionally render the Sidebar */}
        {showSidebar && (
          <Sidebar 
            isCollapsed={isCollapsed} 
            setIsCollapsed={setIsCollapsed}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isFullHeighted={isFullHeighted}
          />
        )}

        {/* 5. Adjust left margins depending on if Sidebar is visible */}
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out relative z-0 
            ${showNavbar ? 'min-h-[calc(100vh-6rem)]' : 'min-h-screen'}
            
            ${showSidebar 
              ? (isCollapsed ? 'ml-16 lg:ml-16' : 'ml-16 lg:ml-64') 
              : 'ml-0' /* <-- Set margin to 0 if no sidebar */
            }
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