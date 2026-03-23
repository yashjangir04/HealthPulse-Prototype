import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/logo.svg'; 
import plusIcon from '../assets/plus.svg';
const Footer = () => {
  return (
    /* Outer container to handle padding against the page edges */
    <footer className="w-full bg-transparent absolute">
      
      {/* THE WHITE CARD: Full width, thick blue border, matching your exact image */}
      <div className="w-full bg-white rounded-t-[3rem] p-5 sm:p-6 md:p-10 lg:p-12 shadow-xl">
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          
          {/* COLUMN 1: SMALL LOGO & NAME UNDERNEATH */}
          <div className="flex flex-col items-start lg:col-span-1">
            <img src={logo} alt="HealthPulse" className="w-16 md:w-20 h-auto mb-1" />
            <div className="flex items-center gap-1 mb-8">
               <span className="text-[#3F87F7] font-[1000] text-2xl md:text-4xl tracking-tighter">
            HealthPulse
          </span>
               <img
                           src={plusIcon}
                           alt="plus"
                           className="w-10 h-10 md:w-15 md:h-15 object-contain mb-3 -ml-3"
                         />
            </div>
            
            {/* Social Icons exactly like the blue in the logo */}
            <div className="flex gap-5">
              <FaFacebookF className="text-[#1B80FD] text-lg cursor-pointer" />
              <FaTwitter className="text-[#1B80FD] text-lg cursor-pointer" />
              <FaInstagram className="text-[#1B80FD] text-lg cursor-pointer" />
              <FaLinkedinIn className="text-[#1B80FD] text-lg cursor-pointer" />
              <FaYoutube className="text-[#1B80FD] text-lg cursor-pointer" />
            </div>
          </div>

          {/* COLUMN 2: PRODUCT */}
          <div>
            <h4 className="text-[#1B80FD] font-bold text-lg md:text-xl mb-6">Product</h4>
            <ul className="space-y-3 md:space-y-4 text-gray-500 font-medium">
              <li>Features</li>
              <li>Pricing</li>
              <li>Case studies</li>
              <li>Reviews</li>
              <li>Updates</li>
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT */}
          <div>
            <h4 className="text-[#1B80FD] font-bold text-xl mb-6">Support</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li>Getting started</li>
              <li>Help center</li>
              <li>Server status</li>
              <li>Report a bug</li>
              <li>Chat support</li>
            </ul>
          </div>

          {/* COLUMN 4: COMPANY */}
          <div>
            <h4 className="text-[#1B80FD] font-bold text-xl mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li>About</li>
              <li>Contact us</li>
              <li>Careers</li>
              <li>Culture</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* COLUMN 5: CONTACTS */}
          <div>
            <h4 className="text-[#1B80FD] font-bold text-xl mb-6">Contacts us</h4>
            <ul className="space-y-6 text-gray-600 font-medium">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#1B80FD] text-lg" />
                <span className="text-[15px] wrap-break-word">connect.healthpulse@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#1B80FD] text-lg" />
                <span className="text-[15px] wrap-break-word">+91 - 97834 XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#1B80FD] text-lg mt-1" />
                <span className="text-[15px] wrap-break-word leading-snug">
                  Academic Block, IIIT Kota<br />Rajasthan, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM SECTION */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-gray-400 font-semibold text-sm">
          <p>Copyright © 2025</p>
          <div className="flex gap-2">
            <span>All Rights Reserved |</span>
            <span className="underline decoration-2 underline-offset-4 decoration-[#1B80FD]/30">Terms and Conditions</span>
            <span>|</span>
            <span className="underline decoration-2 underline-offset-4 decoration-[#1B80FD]/30">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;