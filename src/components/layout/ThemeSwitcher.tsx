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
          className="absolute right-0 mt-2.5 w-[310px] sm:w-[340px] rounded-2xl bg-white text-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-200 p-4 z-[9999] animate-fade-up select-none"
          style={{ transformOrigin: "top right" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300"
                style={{ 
                  backgroundColor: `${activeThemeObj.previewAccent}25`,
                  color: activeThemeObj.previewDeep
                }}
              >
                <Palette size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  Color Themes <Sparkles size={13} className="text-amber-500" />
                </h3>
                <p className="text-[11px] text-slate-500">
                  Select color theme for whole website
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close theme palette"
            >
              <X size={16} />
            </button>
          </div>

          {/* Theme List */}
          <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onMouseDown={(e) => {
                    // onMouseDown ensures instant execution before any blur/click outside fires
                    e.preventDefault();
                    e.stopPropagation();
                    setTheme(theme.id);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme(theme.id);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? "bg-slate-50 border-slate-300 shadow-xs ring-1 ring-slate-300"
                      : "hover:bg-slate-50/80 border-transparent hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 pointer-events-none">
                    {/* Visual Color Plate Dual Swatch */}
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-xs flex shrink-0 border border-slate-200">
                      <div 
                        className="w-1/2 h-full" 
                        style={{ backgroundColor: theme.previewDeep }}
                        title="Primary Color"
                      />
                      <div 
                        className="w-1/2 h-full" 
                        style={{ backgroundColor: theme.previewAccent }}
                        title="Accent Glow Color"
                      />
                    </div>

                    {/* Theme Info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold leading-tight ${
                          isSelected ? "text-slate-900" : "text-slate-700"
                        }`}>
                          {theme.name}
                        </span>
                        {theme.badge && (
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            {theme.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
                        {theme.description}
                      </p>
                    </div>
                  </div>

                  {/* Radio / Checkmark Icon */}
                  <div className="pl-2 shrink-0 pointer-events-none">
                    {isSelected ? (
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: theme.previewDeep }}
                      >
                        <Check size={12} strokeWidth={3} style={{ color: theme.previewAccent }} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Active Indicator */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Instant live preview</span>
            <span 
              className="font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full border"
              style={{
                backgroundColor: `${activeThemeObj.previewAccent}20`,
                borderColor: `${activeThemeObj.previewAccent}40`,
                color: activeThemeObj.previewDeep
              }}
            >
              ✓ {activeThemeObj.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
