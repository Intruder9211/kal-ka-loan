"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import PopupLeadForm from "@/components/forms/PopupLeadForm";

export default function LeadModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    
    // Global click interceptor for #apply links
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      // Check if it's an anchor with an href ending in #apply
      if (anchor && (anchor.href || "").endsWith("#apply")) {
        e.preventDefault();
        e.stopPropagation();
        handleOpen();
      }
    };

    window.addEventListener("open-lead-modal", handleOpen);
    window.addEventListener("close-lead-modal", handleClose);
    document.addEventListener("click", handleGlobalClick, true); // true for capture phase!
    
    return () => {
      window.removeEventListener("open-lead-modal", handleOpen);
      window.removeEventListener("close-lead-modal", handleClose);
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    // Remove hash without scrolling
    history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-brand-deep/80 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      ></div>
      
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-up z-10">
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
        >
          <X size={18} />
        </button>
        
        {/* We render the new form inside */}
        <div className="p-1">
          <PopupLeadForm onClose={closeModal} />
        </div>
      </div>
    </div>
  );
}
