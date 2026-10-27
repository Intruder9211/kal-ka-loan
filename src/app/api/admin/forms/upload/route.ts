import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads/forms
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "forms");
    await mkdir(uploadsDir, { recursive: true });

    // Clean filename and ensure safety
    const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadsDir, cleanFileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/forms/${cleanFileName}`;
    const sizeInKB = Math.round(file.size / 1024);
    const sizeFormatted = sizeInKB > 1024 ? `${(sizeInKB / 1024).toFixed(1)} MB` : `${sizeInKB} KB`;

    return NextResponse.json({
      success: true,
      fileUrl: publicUrl,
      fileName: file.name,
      fileSize: sizeFormatted,
      format: file.name.split(".").pop()?.toUpperCase() || "PDF"
    });
  } catch (error: any) {
    console.error("Error uploading draft file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
