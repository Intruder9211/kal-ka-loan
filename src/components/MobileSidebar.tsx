"use client"

import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"

export function MobileSidebar({ children, theme = "light" }: { children: React.ReactNode, theme?: "light" | "dark" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

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
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const bgColor = theme === "dark" ? "bg-slate-950" : "bg-white"
  const textColor = theme === "dark" ? "text-slate-300" : "text-slate-600"
  const hoverColor = theme === "dark" ? "hover:text-white" : "hover:text-slate-900"
  const closeBtnBg = theme === "dark" ? "bg-slate-800 hover:bg-slate-700 text-slate-200" : "bg-slate-100 hover:bg-slate-200 text-slate-700"

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If user clicks a link or navigation button inside, close the drawer
    const target = e.target as HTMLElement
    if (target.closest("a") || target.closest("button[type='submit']")) {
      setIsOpen(false)
    }
  }

  const drawerModal = isOpen && mounted ? (
    <div className="fixed inset-0 z-[9999] flex md:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)} 
        aria-hidden="true"
      />
      
      {/* Sidebar Panel */}
      <div className={`relative flex w-72 max-w-[85vw] flex-col ${bgColor} h-full shadow-2xl overflow-hidden z-10 animate-in slide-in-from-left duration-250`}>
        <button 
          type="button"
          onClick={() => setIsOpen(false)} 
          className={`absolute right-3.5 top-4 p-2 z-30 ${closeBtnBg} rounded-full transition-colors cursor-pointer shadow-xs`}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="h-full overflow-y-auto w-full" onClick={handleContainerClick}>
          {children}
        </div>
      </div>
    </div>
  ) : null

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)} 
        className={`md:hidden p-2 -ml-1 mr-1.5 ${textColor} ${hoverColor} rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors inline-flex items-center justify-center cursor-pointer`}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {mounted && drawerModal ? createPortal(drawerModal, document.body) : null}
    </>
  )
}
