import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const THEME_FILE = path.join(process.cwd(), "src", "data", "theme-config.json");

async function getThemeConfig() {
  try {
    const raw = await readFile(THEME_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { activeTheme: "forest-green" };
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET() {
  const config = await getThemeConfig();
  return NextResponse.json(config, { headers: NO_CACHE_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { theme } = body;

    const validThemes = [
      "forest-green",
      "navy-blue",
      "midnight-slate",
      "emerald-teal",
      "royal-sapphire",
      "nordic-steel",
      "rich-charcoal",
      "monaco-blue"
    ];

    if (!theme || !validThemes.includes(theme)) {
      return NextResponse.json({ error: "Invalid theme identifier" }, { status: 400 });
    }

    const newConfig = {
      activeTheme: theme,
      updatedAt: new Date().toISOString()
    };

    await writeFile(THEME_FILE, JSON.stringify(newConfig, null, 2), "utf-8");

    const response = NextResponse.json({ success: true, ...newConfig });
    response.cookies.set("moneyviora_theme", theme, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save theme" }, { status: 500 });
  }
}
