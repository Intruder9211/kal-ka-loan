"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeId = 
  | "forest-green" 
  | "navy-blue" 
  | "sunset-orange" 
  | "royal-purple" 
  | "slate-black" 
  | "ruby-red"
  | "ocean-teal";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  nameHindi?: string;
  description: string;
  previewDeep: string;
  previewAccent: string;
  previewLight: string;
  previewDark: string;
  previewVia: string;
  previewTo: string;
  badge?: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "forest-green",
    name: "Emerald Green",
    nameHindi: "ग्रीन थीम (मूल)",
    description: "Classic rich forest green with mint vibrancy",
    previewDeep: "#1a3b32",
    previewAccent: "#75e87a",
    previewLight: "#f4f7f6",
    previewDark: "#0f231e",
    previewVia: "#0d2a23",
    previewTo: "#061e18",
    badge: "Default"
  },
  {
    id: "navy-blue",
    name: "Navy Blue",
    nameHindi: "नेवी ब्लू थीम",
    description: "Trustworthy deep navy with glowing cyan & sky blue",
    previewDeep: "#0a192f",
    previewAccent: "#38bdf8",
    previewLight: "#f0f7ff",
    previewDark: "#050d1a",
    previewVia: "#0e2444",
    previewTo: "#040912",
    badge: "Popular"
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    nameHindi: "ऑरेंज थीम",
    description: "Warm espresso brown with energetic amber & coral glow",
    previewDeep: "#2e150a",
    previewAccent: "#fb923c",
    previewLight: "#fff7ed",
    previewDark: "#1c0c05",
    previewVia: "#3d1c0e",
    previewTo: "#120703",
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    nameHindi: "रॉयल पर्पल थीम",
    description: "Deep luxury amethyst with electric lilac radiance",
    previewDeep: "#24123b",
    previewAccent: "#c084fc",
    previewLight: "#faf5ff",
    previewDark: "#150923",
    previewVia: "#341a54",
    previewTo: "#0e0517",
  },
  {
    id: "slate-black",
    name: "Obsidian Black",
    nameHindi: "ब्लैक थीम",
    description: "Ultra-sleek stealth black with bright platinum gold",
    previewDeep: "#0f1115",
    previewAccent: "#facc15",
    previewLight: "#f8fafc",
    previewDark: "#050607",
    previewVia: "#1a1e24",
    previewTo: "#07080a",
  },
  {
    id: "ruby-red",
    name: "Ruby Crimson",
    nameHindi: "रूबी रेड थीम",
    description: "Bold deep burgundy with radiant rose accents",
    previewDeep: "#3b111a",
    previewAccent: "#fb7185",
    previewLight: "#fff1f2",
    previewDark: "#22090f",
    previewVia: "#4f1723",
    previewTo: "#150407",
  },
  {
    id: "ocean-teal",
    name: "Ocean Teal",
    nameHindi: "ओशन टील थीम",
    description: "Deep marine cyan with vivid aquatic glow",
    previewDeep: "#0c2b33",
    previewAccent: "#2dd4bf",
    previewLight: "#f0fdfa",
    previewDark: "#06191e",
    previewVia: "#113c47",
    previewTo: "#030d10",
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
