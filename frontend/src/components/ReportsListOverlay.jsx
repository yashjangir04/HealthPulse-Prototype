import React, { useState, useRef } from 'react';
import { X, FileText, Download, Upload, Loader2 } from 'lucide-react';
import { createPortal } from "react-dom";

const ReportsListOverlay = ({ isOpen, onClose, reports, onUpload }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // ✅ FIXED: Upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      onUpload(file); // 🔥 SEND FILE TO PARENT
      setIsAnalyzing(false);
    }, 1000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-3xl shadow-2xl h-[80vh] flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="p-8 border-b flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">All Lab Reports</h2>
            <p className="text-slate-400 text-sm">{reports.length} Reports Total</p>
          </div>
          
          <div className="flex items-center gap-3">
            
            {/* HIDDEN INPUT */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept=".pdf,.jpg,.png,.doc"
            />
            
            {/* UPLOAD BUTTON */}
            <button 
              onClick={() => fileInputRef.current.click()}
              disabled={isAnalyzing}
              className="flex items-center gap-2 bg-[#1B80FD] hover:bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-semibold transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
            >
              {isAnalyzing 
                ? <Loader2 className="animate-spin" size={18}/> 
                : <Upload size={18}/>
              }
              <span>{isAnalyzing ? 'Analyzing...' : 'Upload'}</span>
            </button>

            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X size={24}/>
            </button>
          </div>
        </div>

        {/* REPORT LIST */}
        <div className="p-8 overflow-y-auto space-y-4 flex-1 bg-white">
          {reports.map((report, i) => (
            <div 
              key={i} 
              className="flex justify-between items-center p-5 bg-slate-50 rounded-[1.5rem] hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-500">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-700">{report.title}</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">{report.date}</p>
                </div>
              </div>
              
              <button className="text-[#1B80FD] p-3 hover:bg-white rounded-xl transition-all">
                <Download size={20}/>
              </button>
            </div>
          ))}

          {reports.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <FileText className="mx-auto mb-4 opacity-20" size={48} />
              <p>No reports found in your records.</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReportsListOverlay;