import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { User, Sparkles, FileText, Users, Bell, UserRound, LogOut, ChevronLeft, ChevronRight, LogIn } from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed, isOpen, setIsOpen }) => {
  const { user, isLoggedIn, logout } = useAuth();

  const menuItems = [
    { icon: <User size={20} />, label: "Profile" },
    { icon: <Sparkles size={20} />, label: "AI Help", active: true },
    { icon: <FileText size={20} />, label: "Reports" },
    { icon: <Users size={20} />, label: "Contacts" },
    { icon: <Bell size={20} />, label: "Reminder" },
    { icon: <UserRound size={20} />, label: "Connect" },
  ];

  return (
    <>
    {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsOpen(false)} 
        />
      )}


    <aside 
      className={`fixed left-0 z-50 flex flex-col justify-between py-6 
      transition-all duration-500 ease-in-out
      bg-white/90 backdrop-blur-xl border-r border-gray-100
      
      top-20 md:top-24
      h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)]
      
      w-16 ${isOpen ? 'w-72 shadow-2xl' : ''}
      
      lg:top-24 lg:h-[calc(100vh-6rem)]
      ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
      `}
    >

      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-4 bg-white border border-gray-100 rounded-full p-1 shadow-lg hover:bg-blue-50 transition-colors z-[60]"
      >
        {isCollapsed 
        ? <ChevronRight size={16} className="text-blue-600" /> 
        : <ChevronLeft size={18} className="text-blue-600" />}
      </button>

      {/* Menu Items */}
      <div className="space-y-1 px-3">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-4 px-3 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 group ${
              item.active 
                ? 'bg-[#3F87F7] text-white shadow-xl shadow-blue-200' 
                : 'font-bold text-slate-500 hover:bg-blue-50 hover:text-blue-600'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="transition-transform group-hover:scale-110">{item.icon}</div>
            {(isOpen || !isCollapsed) && (<span className="text-[15px] font-bold whitespace-nowrap">{item.label}</span>)}
          </div>
        ))}
      </div>

      {/* Profile/Auth Bottom */}
      <div className={`px-4 pt-6 border-t border-gray-100 ${isCollapsed ? 'flex justify-center' : ''}`}>
        {isLoggedIn ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full border-2 border-blue-100 shadow-sm" 
              />
              {(!isCollapsed || isOpen) && (
                <div className="flex flex-col overflow-hidden">
                  <span className="font-extrabold text-gray-900 truncate text-[14px]">{user?.name}</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Premium User</span>
                </div>
              )}
            </div>
            {(isOpen || !isCollapsed) && (
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
    </>
  );
};

export default Sidebar;