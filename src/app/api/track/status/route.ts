import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim();

    if (!query) {
      return NextResponse.json({ error: 'Please enter a reference number, mobile number, or email.' }, { status: 400 });
    }

    // 1. Search in formal Applications first (by Application ID)
    const application = await prisma.application.findFirst({
      where: {
        OR: [
          { id: { equals: query } },
          { id: { startsWith: query } },
          { customer: { phone: { contains: query } } },
          { customer: { user: { email: { equals: query } } } }
        ]
      },
      include: {
        loanProduct: true,
        customer: { include: { user: true } }
      }
    });

    if (application) {
      return NextResponse.json({
        found: true,
        type: 'APPLICATION',
        referenceNumber: application.id,
        name: application.customer?.user?.name || 'Applicant',
        status: application.status,
        productName: application.loanProduct?.name || 'Home Loan',
        amount: application.requestedAmount,
        city: application.propertyCity || 'N/A',
        submittedAt: application.createdAt,
      });
    }

    // 2. Search in Leads (Doorstep visits, website leads, contact inquiries)
    // Matches reference number in note [REF: MVHL...], mobile number, or email
    const lead = await prisma.lead.findFirst({
      where: {
        OR: [
          { employment: { contains: query } },
          { mobile: { contains: query } },
          { email: { equals: query } },
          { id: { equals: query } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });

    if (lead) {
      // Extract reference number if present in note
      const refMatch = (lead.employment || '').match(/\[REF:\s*([^\]]+)\]/i);
      const refNumber = refMatch ? refMatch[1] : `MVHL-${lead.id.slice(0, 8)}`;
      const isDoorstep = (lead.employment || '').toLowerCase().includes('doorstep');

      return NextResponse.json({
        found: true,
        type: isDoorstep ? 'DOORSTEP_VISIT' : 'LEAD_ENQUIRY',
        referenceNumber: refNumber,
        name: lead.name,
        status: lead.status,
        productName: isDoorstep ? 'Doorstep Loan Consultation' : 'Home Loan Enquiry',
        amount: lead.loanAmount || null,
        city: lead.city || 'N/A',
        details: lead.employment || '',
        submittedAt: lead.createdAt,
      });
    }

    return NextResponse.json({ found: false, message: 'No application found with these details.' }, { status: 404 });
  } catch (error) {
    console.error('Error tracking application:', error);
    return NextResponse.json({ error: 'Server error while checking status.' }, { status: 500 });
  }
}
