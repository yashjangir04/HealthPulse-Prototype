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
          className={`flex-1 transition-all duration-500 ease-in-out min-h-full]
             rounded-none m-0 ${
            isCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          {/* Main content area wrapped in a clean card */}
          <div >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;