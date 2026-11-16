import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mobile, countryCode, residentType, email, employment, monthlyIncome, loanAmount, city, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    const rawMobile = mobile || "N/A";
    const formattedMobile = countryCode && !rawMobile.startsWith("+") && rawMobile !== "N/A"
      ? `${countryCode} ${rawMobile}` 
      : rawMobile;

    const employmentText = message 
      ? `Inquiry: ${message.slice(0, 150)}` 
      : (residentType === "NRI" ? `NRI (${employment || "Employed"})` : employment);

    const lead = await prisma.lead.create({
      data: {
        name,
        mobile: formattedMobile,
        email,
        employment: employmentText,
        monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : null,
        loanAmount: loanAmount ? parseFloat(loanAmount) : null,
        city: city || null,
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    );
  }
}
