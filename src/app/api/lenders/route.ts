import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "lenders.json");

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET(req: NextRequest) {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    const lenders = JSON.parse(raw);
    return NextResponse.json({ lenders }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch lenders", lenders: [] }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

