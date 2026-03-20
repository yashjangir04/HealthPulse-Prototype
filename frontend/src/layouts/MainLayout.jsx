import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-24">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out p-8 ${
            isCollapsed ? 'ml-20' : 'ml-72'
          }`}
        >
          {/* Main content area wrapped in a clean card */}
          <div className="bg-white min-h-full rounded-[40px] shadow-sm border border-gray-100 p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;