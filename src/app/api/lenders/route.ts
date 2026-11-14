import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "lenders.json");

export async function GET(req: NextRequest) {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    const lenders = JSON.parse(raw);
    return NextResponse.json({ lenders });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch lenders", lenders: [] }, { status: 500 });
  }
}

