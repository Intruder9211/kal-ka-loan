import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/stamp-duty-data.json");

function getStampDutyData() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return { states: [] };
    }
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading stamp duty data:", error);
    return { states: [] };
  }
}

function saveStampDutyData(data: any) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing stamp duty data:", error);
    return false;
  }
}

export async function GET() {
  const data = getStampDutyData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = getStampDutyData();

    if (body.action === "update-all" && Array.isArray(body.states)) {
      data.states = body.states;
      saveStampDutyData(data);
      return NextResponse.json({ success: true, states: data.states });
    }

    if (!body.code || !body.name) {
      return NextResponse.json({ error: "Code and name are required" }, { status: 400 });
    }

    const index = data.states.findIndex((s: any) => s.code === body.code);
    if (index >= 0) {
      // Update
      data.states[index] = {
        ...data.states[index],
        ...body,
        maleStampDuty: Number(body.maleStampDuty) || 0,
        femaleStampDuty: Number(body.femaleStampDuty) || 0,
        jointStampDuty: Number(body.jointStampDuty) || 0,
        registrationFeePercent: Number(body.registrationFeePercent) || 0,
        maxRegistrationFee: Number(body.maxRegistrationFee) || 0,
        cessPercent: Number(body.cessPercent) || 0,
      };
    } else {
      // Add new
      data.states.push({
        code: body.code.toUpperCase(),
        name: body.name,
        maleStampDuty: Number(body.maleStampDuty) || 0,
        femaleStampDuty: Number(body.femaleStampDuty) || 0,
        jointStampDuty: Number(body.jointStampDuty) || 0,
        registrationFeePercent: Number(body.registrationFeePercent) || 0,
        maxRegistrationFee: Number(body.maxRegistrationFee) || 0,
        cessPercent: Number(body.cessPercent) || 0,
      });
    }

    saveStampDutyData(data);
    return NextResponse.json({ success: true, states: data.states });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update stamp duty" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const data = getStampDutyData();
    data.states = data.states.filter((s: any) => s.code !== code);
    saveStampDutyData(data);

    return NextResponse.json({ success: true, states: data.states });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete state" }, { status: 500 });
  }
}
