import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Bell, User, LogOut, LogIn } from "lucide-react";
import logo from "../assets/logo.svg";
import plusIcon from "../assets/plus.svg";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full h-20 md:h-24 flex items-center justify-between px-6 md:px-12 bg-white/60 backdrop-blur-xl z-[100] border-b border-white/20 shadow-sm">
      <div className="flex items-center gap-4 group cursor-pointer">
        <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
          <img
            src={logo}
            alt="HealthPulse Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="relative flex items-center">
          <span className="text-[#3F87F7] font-[1000] text-2xl md:text-4xl tracking-tighter">
            HealthPulse
          </span>
          <img
            src={plusIcon}
            alt="plus"
            className="w-10 h-10 md:w-15 md:h-15 object-contain mb-3 -ml-3"
          />
        </div>
      </div>

      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="lg:hidden p-2 text-slate-600 focus:outline-none"
      >
        <div className="space-y-1.5">
          <span className={`block w-8 h-0.5 bg-slate-800 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-8 h-0.5 bg-slate-800 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-8 h-0.5 bg-slate-800 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      <div className={`${isMenuOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row absolute lg:static top-20 left-0 w-full lg:w-auto bg-white/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none p-8 lg:p-0 border-b lg:border-none shadow-lg lg:shadow-none items-center space-y-8 lg:space-y-0 lg:space-x-12`}>
        <ul className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-10 text-[18px] font-bold text-slate-500">
          <li className="text-blue-600 relative group">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span
              className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] bg-blue-600 rounded-full transition-all duration-300 ${
                location.pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
            <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-600 rounded-full"></div>
          </li>

          <li className="relative group">
            <Link
              to="/about"
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              About Us
            </Link>

            <span
              className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] bg-blue-600 rounded-full transition-all duration-300 ${
                location.pathname === "/about"
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            ></span>
          </li>
        </ul>

        {isLoggedIn ? (
<>
            {/* Logout Text (replaces Login) */}
            <button
              onClick={logout}
              className="relative group text-slate-600 hover:text-red-500 transition-colors"
            >
              Logout
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-[3px] bg-red-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </button>

            {/* Professional Letter Avatar (replaces Register button) */}
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-base lg:text-lg shadow-md">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </>
        ) : (
          <div className={`${isMenuOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row items-center gap-6 lg:gap-10 text-[18px] font-bold text-slate-500`}>
            <div className="relative group">
              <Link
                to="/account/login"
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Login
              </Link>
              <span
                className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] bg-blue-600 rounded-full transition-all duration-300 ${
                  location.pathname === "/auth/login"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </div>

            <Link
              to="/account/create"
              className="bg-[#3F87F7] text-white px-6 py-2 lg:px-10 lg:py-3 rounded-2xl font-black text-lg shadow-[0_10px_30px_-10px_rgba(29,136,254,1)] hover:scale-105 active:scale-95 transition-all"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;