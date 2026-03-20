import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { User, Sparkles, FileText, Users, Bell, UserRound, LogOut, ChevronLeft, ChevronRight, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate() ;
  const { user, isLoggedIn, logout } = useAuth();

  const menuItems = [
    { icon: <User size={22} />, label: "Profile" },
    { icon: <Sparkles size={22} />, label: "AI Help", active: true },
    { icon: <FileText size={22} />, label: "Reports" },
    { icon: <Users size={22} />, label: "Contacts" },
    { icon: <Bell size={22} />, label: "Reminder" , buttonRoute: "medi-list" },
    { icon: <UserRound size={22} />, label: "Connect" },
  ];

  return (
    <aside 
      className={`fixed left-0 top-24 h-[calc(100vh-6rem)] bg-white/80 backdrop-blur-md border-r border-gray-100 transition-all duration-500 ease-in-out z-50 flex flex-col justify-between py-6 ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-white border border-gray-100 rounded-full p-1 shadow-lg hover:bg-blue-50 transition-colors z-[60]"
      >
        {isCollapsed ? <ChevronRight size={18} className="text-blue-600" /> : <ChevronLeft size={18} className="text-blue-600" />}
      </button>

      {/* Menu Items */}
      <div className="space-y-2 px-3">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group ${
              item.active 
                ? 'bg-[#3F87F7] text-white shadow-xl shadow-blue-200' 
                : 'font-bold text-slate-500 hover:bg-blue-50 hover:text-blue-600'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="transition-transform group-hover:scale-110">{item.icon}</div>
            {!isCollapsed && <span className="text-[17px] font-bold whitespace-nowrap">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* Profile/Auth Bottom */}
      <div className={`px-4 pt-6 border-t border-gray-100 ${isCollapsed ? 'flex justify-center' : ''}`}>
        {isLoggedIn ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border-2 border-blue-100 shadow-sm" 
              />
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="font-extrabold text-gray-900 truncate text-[15px]">{user?.name}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Premium User</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button 
                onClick={logout} 
                className="flex items-center gap-2 text-red-500 font-black text-xs px-1 hover:opacity-70 transition-opacity"
              >
                <LogOut size={16} strokeWidth={3} /> Logout
              </button>
            )}
          </div>
        ) : (
          <button className={`flex items-center justify-center bg-[#3F87F7] text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md ${isCollapsed ? 'w-12 h-12' : 'w-full py-3 gap-2'}`}>
            <LogIn size={20} />
            {!isCollapsed && <span>Login</span>}
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;