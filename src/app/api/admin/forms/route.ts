import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "forms-data.json");

async function getForms() {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveForms(data: any) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const forms = await getForms();
  return NextResponse.json({ forms });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const forms = await getForms();

    const newForm = {
      id: body.id || `f-${Date.now()}`,
      title: body.title || "Untitled Form",
      category: body.category || "Application",
      description: body.description || "",
      fileUrl: body.fileUrl || null,
      fileName: body.fileName || null,
      fileSize: body.fileSize || "100 KB",
      format: body.format || "PDF",
      updatedAt: new Date().toISOString()
    };

    const existingIndex = forms.findIndex((f: any) => f.id === newForm.id);
    if (existingIndex >= 0) {
      forms[existingIndex] = { ...forms[existingIndex], ...newForm };
    } else {
      forms.unshift(newForm);
    }

    await saveForms(forms);
    return NextResponse.json({ success: true, form: newForm });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save form" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const forms = await getForms();
    const filtered = forms.filter((f: any) => f.id !== id);
    await saveForms(filtered);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete" }, { status: 500 });
  }
}
