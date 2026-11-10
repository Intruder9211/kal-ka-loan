"use client";

import React, { useRef, useEffect } from "react";
import { Palette, Check, Sparkles, X } from "lucide-react";
import { useTheme, THEME_OPTIONS } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, isOpen, setIsOpen } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside - using window click event instead of mousedown to prevent premature closing
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      // Add slight delay to avoid closing in the same click
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
      {/* Single Clean Color Plate Icon Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Change Website Color Theme"
        aria-expanded={isOpen}
        title={`Change Site Theme (Current: ${activeThemeObj.name})`}
        className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-200 border border-white/20 shadow-sm group cursor-pointer"
      >
        <Palette 
          size={20} 
          className="text-brand-mint transition-transform duration-300 group-hover:rotate-45" 
        />
        {/* Subtle active accent indicator dot */}
        <span 
          className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 rounded-full border border-white shadow-sm transition-colors duration-300"
          style={{ backgroundColor: activeThemeObj.previewAccent }}
        />
      </button>

      {/* Color Palette Dropdown Menu */}
      {isOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 mt-2.5 rounded-full bg-black/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/15 p-1.5 z-[9999] animate-fade-up select-none"
          style={{ transformOrigin: "top right" }}
        >
          {/* Vertical Color Swatch Icons */}
          <div className="flex flex-col gap-2">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  type="button"
                  title={theme.name}
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
                    <div className="w-4 h-4 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center shadow-xs">
                      <Check size={10} strokeWidth={3.5} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
