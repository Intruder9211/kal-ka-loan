"use client"

import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function MobileSidebar({ children, theme = "light" }: { children: React.ReactNode, theme?: "light" | "dark" }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const bgColor = theme === "dark" ? "bg-slate-950" : "bg-white"
  const textColor = theme === "dark" ? "text-slate-400" : "text-slate-500"
  const hoverColor = theme === "dark" ? "hover:text-white" : "hover:text-slate-900"

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className={`md:hidden p-2 -ml-2 mr-2 ${textColor} ${hoverColor}`}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
            aria-hidden="true"
          />
          
          {/* Sidebar Panel */}
          <div className={`relative flex w-64 flex-col ${bgColor} h-full shadow-2xl overflow-hidden`}>
            <button 
              onClick={() => setIsOpen(false)} 
              className={`absolute right-4 top-4 p-2 z-10 ${textColor} ${hoverColor} rounded-full bg-slate-100/10`}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="h-full overflow-y-auto w-full">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
