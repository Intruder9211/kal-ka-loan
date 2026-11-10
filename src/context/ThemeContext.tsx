"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeId = 
  | "forest-green" 
  | "navy-blue" 
  | "midnight-slate" 
  | "emerald-teal" 
  | "royal-sapphire"
  | "nordic-steel"
  | "rich-charcoal"
  | "monaco-blue";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  previewDeep: string;
  previewAccent: string;
  previewLight: string;
  previewDark: string;
  previewVia: string;
  previewTo: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "forest-green",
    name: "Emerald Green",
    previewDeep: "#1a3b32",
    previewAccent: "#75e87a",
    previewLight: "#f4f7f6",
    previewDark: "#0f231e",
    previewVia: "#0d2a23",
    previewTo: "#061e18",
  },
  {
    id: "navy-blue",
    name: "Classic Navy",
    previewDeep: "#0f233a",
    previewAccent: "#38bdf8",
    previewLight: "#f1f6fa",
    previewDark: "#091728",
    previewVia: "#0b1d30",
    previewTo: "#050e1a",
  },
  {
    id: "midnight-slate",
    name: "Executive Slate",
    previewDeep: "#192231",
    previewAccent: "#60a5fa",
    previewLight: "#f4f6f9",
    previewDark: "#0f1622",
    previewVia: "#141c28",
    previewTo: "#090e16",
  },
  {
    id: "emerald-teal",
    name: "Deep Teal",
    previewDeep: "#13353b",
    previewAccent: "#34d399",
    previewLight: "#f2f8f7",
    previewDark: "#0c2327",
    previewVia: "#0f2c31",
    previewTo: "#071619",
  },
  {
    id: "royal-sapphire",
    name: "Sapphire Indigo",
    previewDeep: "#1b2447",
    previewAccent: "#818cf8",
    previewLight: "#f3f5fc",
    previewDark: "#10162e",
    previewVia: "#151d3b",
    previewTo: "#0a0e1e",
  },
  {
    id: "nordic-steel",
    name: "Nordic Steel",
    previewDeep: "#1a2a36",
    previewAccent: "#4fc3f7",
    previewLight: "#f2f6f9",
    previewDark: "#0e1a24",
    previewVia: "#14222c",
    previewTo: "#081017",
  },
  {
    id: "rich-charcoal",
    name: "Rich Charcoal",
    previewDeep: "#1a1d24",
    previewAccent: "#10b981",
    previewLight: "#f5f6f8",
    previewDark: "#101217",
    previewVia: "#15181e",
    previewTo: "#0a0c0f",
  },
  {
    id: "monaco-blue",
    name: "Monaco Blue",
    previewDeep: "#132544",
    previewAccent: "#2dd4bf",
    previewLight: "#f1f5fa",
    previewDark: "#0b1629",
    previewVia: "#0e1d35",
    previewTo: "#060d19",
  }
];

interface ThemeContextType {
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("forest-green");
  const [isOpen, setIsOpen] = useState(false);

  const applyThemeToDOM = (theme: ThemeId) => {
    const t = THEME_OPTIONS.find((opt) => opt.id === theme) || THEME_OPTIONS[0];

    // 1. Set data-theme attribute
    document.documentElement.setAttribute("data-theme", theme);
    if (document.body) {
      document.body.setAttribute("data-theme", theme);
    }

    // 2. Set root CSS variables directly
    const root = document.documentElement;
    root.style.setProperty("--brand-deep", t.previewDeep);
    root.style.setProperty("--brand-mint", t.previewAccent);
    root.style.setProperty("--brand-light", t.previewLight);
    root.style.setProperty("--brand-dark", t.previewDark);
    root.style.setProperty("--brand-gradient-via", t.previewVia);
    root.style.setProperty("--brand-gradient-to", t.previewTo);

    // 3. Inject dedicated override stylesheet to guarantee 100% cascade everywhere
    let styleTag = document.getElementById("moneyviora-theme-overrides") as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "moneyviora-theme-overrides";
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      :root, html, body {
        --brand-deep: ${t.previewDeep} !important;
        --brand-mint: ${t.previewAccent} !important;
        --brand-light: ${t.previewLight} !important;
        --brand-dark: ${t.previewDark} !important;
        --brand-gradient-via: ${t.previewVia} !important;
        --brand-gradient-to: ${t.previewTo} !important;
        --color-brand-deep: ${t.previewDeep} !important;
        --color-brand-mint: ${t.previewAccent} !important;
        --color-brand-light: ${t.previewLight} !important;
        --color-brand-dark: ${t.previewDark} !important;
      }
      .bg-brand-deep { background-color: ${t.previewDeep} !important; }
      .text-brand-deep { color: ${t.previewDeep} !important; }
      .border-brand-deep { border-color: ${t.previewDeep} !important; }

      .bg-brand-mint { background-color: ${t.previewAccent} !important; }
      .text-brand-mint { color: ${t.previewAccent} !important; }
      .border-brand-mint { border-color: ${t.previewAccent} !important; }

      .bg-brand-light { background-color: ${t.previewLight} !important; }
      .text-brand-light { color: ${t.previewLight} !important; }
      .border-brand-light { border-color: ${t.previewLight} !important; }

      .bg-brand-dark { background-color: ${t.previewDark} !important; }
      .text-brand-dark { color: ${t.previewDark} !important; }

      .bg-brand-deep\\/95, .bg-brand-deep\\/90 { background-color: ${t.previewDeep}f2 !important; }
      .bg-brand-deep\\/80 { background-color: ${t.previewDeep}cc !important; }
      .bg-brand-deep\\/60 { background-color: ${t.previewDeep}99 !important; }
      .bg-brand-deep\\/50 { background-color: ${t.previewDeep}80 !important; }
      .bg-brand-deep\\/30 { background-color: ${t.previewDeep}4d !important; }
      .bg-brand-deep\\/10 { background-color: ${t.previewDeep}1a !important; }

      .bg-brand-mint\\/20 { background-color: ${t.previewAccent}33 !important; }
      .bg-brand-mint\\/15 { background-color: ${t.previewAccent}26 !important; }
      .bg-brand-mint\\/10 { background-color: ${t.previewAccent}1a !important; }
      .border-brand-mint\\/30 { border-color: ${t.previewAccent}4d !important; }
      .border-brand-mint\\/40 { border-color: ${t.previewAccent}66 !important; }
      .border-brand-mint\\/50 { border-color: ${t.previewAccent}80 !important; }
    `;
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("moneyviora_theme") as ThemeId;
      if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
        setCurrentTheme(saved);
        applyThemeToDOM(saved);
      } else {
        applyThemeToDOM("forest-green");
      }
    } catch {
      applyThemeToDOM("forest-green");
    }
  }, []);

  const setTheme = (theme: ThemeId) => {
    setCurrentTheme(theme);
    try {
      localStorage.setItem("moneyviora_theme", theme);
    } catch {
      // ignore
    }
    applyThemeToDOM(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isOpen, setIsOpen }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
