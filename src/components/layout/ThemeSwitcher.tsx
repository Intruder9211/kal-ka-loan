"use client";

import React, { useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useTheme, THEME_OPTIONS } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, isOpen, setIsOpen, isLoading } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      const timer = setTimeout(() => {
        window.addEventListener("click", handleClickOutside);
      }, 50);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, setIsOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  const activeThemeObj = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Admin Theme Palette Icon Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Change Global Website Theme"
        aria-expanded={isOpen}
        title={`Change Global Site Theme (Current: ${activeThemeObj.name})`}
        className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all text-xs font-bold cursor-pointer active:scale-95 shadow-xs"
      >
        <Palette size={16} className="text-emerald-600" />
        <span className="hidden sm:inline">Theme</span>
        {/* Subtle active accent indicator dot */}
        <span 
          className="w-2.5 h-2.5 rounded-full border border-white shadow-xs"
          style={{ backgroundColor: activeThemeObj.previewAccent }}
        />
      </button>

      {/* Vertical Floating Palette Capsule */}
      {isOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 mt-2.5 rounded-full bg-slate-900/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 p-2 z-[9999] animate-fade-up select-none flex flex-col gap-2"
          style={{ transformOrigin: "top right" }}
        >
          {THEME_OPTIONS.map((theme) => {
            const isSelected = theme.id === currentTheme;
            return (
              <button
                key={theme.id}
                type="button"
                title={`${theme.name} (Global Theme)`}
                disabled={isLoading}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setTheme(theme.id);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme(theme.id);
                }}
                className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? "ring-2 ring-white scale-110 shadow-lg"
                    : "hover:scale-110 opacity-75 hover:opacity-100 hover:ring-1 hover:ring-white/40"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${theme.previewDeep} 50%, ${theme.previewAccent} 50%)`,
                }}
              >
                {/* Subtle Inner Glow Border */}
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />

                {/* Active Selection Check Mark */}
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-black/70 backdrop-blur-xs flex items-center justify-center shadow-xs">
                    <Check size={10} strokeWidth={3.5} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
