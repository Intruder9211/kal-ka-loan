import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/branches-data.json");

function getBranchesData() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return { branches: [] };
    }
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading branches data:", error);
    return { branches: [] };
  }
}

function saveBranchesData(data: any) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing branches data:", error);
    return false;
  }
}

export async function GET() {
  const data = getBranchesData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = getBranchesData();

    if (!body.city || !body.address || !body.pincode) {
      return NextResponse.json({ error: "City, address, and pincode are required" }, { status: 400 });
    }

    if (body.id) {
      // Update
      const index = data.branches.findIndex((b: any) => b.id === body.id);
      if (index >= 0) {
        data.branches[index] = { ...data.branches[index], ...body };
      } else {
        data.branches.push(body);
      }
    } else {
      // Create new
      const newBranch = {
        id: `br-${Date.now()}`,
        ...body,
      };
      data.branches.push(newBranch);
    }

    saveBranchesData(data);
    return NextResponse.json({ success: true, branches: data.branches });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update branch" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Branch ID is required" }, { status: 400 });
    }

    const data = getBranchesData();
    data.branches = data.branches.filter((b: any) => b.id !== id);
    saveBranchesData(data);

    return NextResponse.json({ success: true, branches: data.branches });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete branch" }, { status: 500 });
  }
}
