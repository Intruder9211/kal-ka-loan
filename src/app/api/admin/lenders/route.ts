import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "lenders.json");

export async function getLendersData() {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading lenders data:", error);
    return [];
  }
}

export async function saveLendersData(data: any) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const lenders = await getLendersData();
  return NextResponse.json({ lenders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lenders = await getLendersData();

    if (!body.name || !body.interestRate) {
      return NextResponse.json({ error: "Lender name and interest rate are required" }, { status: 400 });
    }

    const lenderId = body.id || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newLender = {
      id: lenderId,
      name: body.name,
      logo: body.logo || body.name.split(" ")[0],
      interestRate: body.interestRate,
      salariedRate: body.salariedRate || body.interestRate,
      selfEmployedRate: body.selfEmployedRate || "",
      rateType: body.rateType || "Floating",
      officialUrl: body.officialUrl || "",
      processingFee: body.processingFee || "Up to 0.5% + GST",
      maxTenure: body.maxTenure || "30 Years",
      maxAmount: body.maxAmount || "Up to ₹10 Cr",
      type: body.type || "Private Bank",
      tags: Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === "string"
        ? body.tags.split(",").map((s: string) => s.trim()).filter(Boolean)
        : ["Lowest Rate"],
      status: body.status || "Active",
      updatedAt: new Date().toISOString()
    };

    const existingIndex = lenders.findIndex((l: any) => l.id === newLender.id);
    if (existingIndex >= 0) {
      lenders[existingIndex] = { ...lenders[existingIndex], ...newLender };
    } else {
      lenders.push(newLender);
    }

    await saveLendersData(lenders);
    return NextResponse.json({ success: true, lender: newLender, lenders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save lender" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lender ID is required" }, { status: 400 });
    }

    const lenders = await getLendersData();
    const filtered = lenders.filter((l: any) => l.id !== id);
    await saveLendersData(filtered);

    return NextResponse.json({ success: true, lenders: filtered });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete lender" }, { status: 500 });
  }
}

