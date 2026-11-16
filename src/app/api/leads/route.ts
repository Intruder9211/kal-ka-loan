import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContactNotification } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      mobile, 
      countryCode, 
      residentType, 
      email, 
      employment, 
      monthlyIncome, 
      loanAmount, 
      city, 
      message,
      preferredDate,
      preferredTime,
      source 
    } = body;

    if (!name || (!mobile && !email)) {
      return NextResponse.json(
        { error: 'Name and either mobile or email are required.' },
        { status: 400 }
      );
    }

    // Generate standard reference number (e.g. MVHL20261116-4821)
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `MVHL${todayStr}-${randomSuffix}`;

    const rawMobile = mobile || "N/A";
    const formattedMobile = countryCode && !rawMobile.startsWith("+") && rawMobile !== "N/A"
      ? `${countryCode} ${rawMobile}` 
      : rawMobile;

    const applicantEmail = email && email.trim() ? email.trim() : `${rawMobile.replace(/[^0-9]/g, '') || 'client'}@leads.moneyviora.com`;

    // Construct detailed employment/note string including reference number and visit details if applicable
    let detailsNote = `[REF: ${referenceNumber}]`;
    if (source) detailsNote += ` [Source: ${source}]`;
    if (preferredDate || preferredTime) {
      detailsNote += ` [Doorstep Visit: ${preferredDate || 'N/A'} at ${preferredTime || 'N/A'}]`;
    }
    if (message) {
      detailsNote += ` - ${message.slice(0, 120)}`;
    } else if (employment) {
      detailsNote += ` - ${residentType === "NRI" ? `NRI (${employment})` : employment}`;
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        mobile: formattedMobile,
        email: applicantEmail,
        employment: detailsNote,
        monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome.toString().replace(/,/g, '')) : null,
        loanAmount: loanAmount ? parseFloat(loanAmount.toString().replace(/,/g, '')) : null,
        city: city || null,
        status: "NEW",
      },
    });

    // Send instant dynamic email notification using our branded template to singhmohit101103@gmail.com and applicant
    const visitDetails = preferredDate || preferredTime 
      ? `Doorstep Visit scheduled for ${preferredDate || 'Upcoming'} during ${preferredTime || 'Working Hours'}. Location: ${city || 'Client address'}.`
      : message;

    await sendContactNotification({
      name,
      email: applicantEmail,
      mobile: formattedMobile,
      message: visitDetails,
      loanAmount: loanAmount ? parseFloat(loanAmount.toString().replace(/,/g, '')) : null,
      propertyType: source || "Home Loan",
      city: city || null,
      referenceNumber,
    }).catch(err => console.error("Notification trigger error:", err));

    return NextResponse.json({ 
      success: true, 
      lead, 
      referenceNumber 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    );
  }
}
