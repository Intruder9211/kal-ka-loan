import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "approved-projects.json");

async function getProjects() {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveProjects(data: any) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const projects = await getProjects();

    const newProject = {
      id: body.id || `proj-${Date.now()}`,
      name: body.name || "Untitled Project",
      developer: body.developer || "",
      city: body.city || "Delhi NCR",
      location: body.location || "",
      type: body.type || "2, 3 BHK Apartments",
      priceRange: body.priceRange || "₹50 Lakhs - ₹1.5 Cr",
      reraNumber: body.reraNumber || "Pending / Applied",
      status: body.status || "Ready to Move",
      approvedBanks: Array.isArray(body.approvedBanks) 
        ? body.approvedBanks 
        : (body.approvedBanks || "HDFC Bank, SBI").split(",").map((s: string) => s.trim()).filter(Boolean),
      highlights: Array.isArray(body.highlights)
        ? body.highlights
        : (body.highlights || "").split("\n").map((s: string) => s.trim()).filter(Boolean),
      updatedAt: new Date().toISOString()
    };

    const existingIndex = projects.findIndex((p: any) => p.id === newProject.id);
    if (existingIndex >= 0) {
      projects[existingIndex] = { ...projects[existingIndex], ...newProject };
    } else {
      projects.unshift(newProject);
    }

    await saveProjects(projects);
    return NextResponse.json({ success: true, project: newProject });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const projects = await getProjects();
    const filtered = projects.filter((p: any) => p.id !== id);
    await saveProjects(filtered);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete" }, { status: 500 });
  }
}
