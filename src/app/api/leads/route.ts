import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mobile, email, employment, monthlyIncome, loanAmount, city } = body;

    if (!name || !mobile || !email) {
      return NextResponse.json(
        { error: 'Name, mobile, and email are required fields.' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        mobile,
        email,
        employment,
        monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : null,
        loanAmount: loanAmount ? parseFloat(loanAmount) : null,
        city,
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
