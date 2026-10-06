import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const loanType = searchParams.get("loanType");
    const amount = parseFloat(searchParams.get("amount") || "0");
    const income = parseFloat(searchParams.get("income") || "0");
    const existingEmi = parseFloat(searchParams.get("existingEmi") || "0");
    const tenure = parseInt(searchParams.get("tenure") || "20", 10);

    if (!loanType || amount <= 0) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // 1. Basic Affordability Check
    // Max EMI should not exceed 50-60% of net monthly income depending on lender.
    // We'll use 50% as a safe baseline for this recommendation engine.
    const maxAvailableEmi = (income * 0.5) - existingEmi;

    if (maxAvailableEmi <= 0) {
      return NextResponse.json({ 
        matches: [], 
        message: "Your existing EMIs exceed the permissible limit for your income." 
      });
    }

    // 2. Fetch the base LoanProduct for context
    const loanProduct = await prisma.loanProduct.findFirst({
      where: { name: loanType, status: "PUBLISHED" }
    });

    if (!loanProduct) {
      return NextResponse.json({ 
        matches: [], 
        message: "Selected loan product is not currently available." 
      });
    }

    // 3. Fetch Lenders that offer this loan type
    // In our schema, lenders have a `loanTypes` string (e.g., "Home Loan, Top Up Loan")
    // Or we just fetch all active lenders if `loanTypes` is empty/null, assuming they offer it.
    const lenders = await prisma.lender.findMany({
      where: { status: true },
      orderBy: { interestRate: 'asc' }
    });

    // 4. Calculate matching options
    const matches = lenders.map(lender => {
      const rate = lender.interestRate || loanProduct.interestRate || 8.5; // fallback
      const monthlyRate = rate / 12 / 100;
      const months = tenure * 12;
      
      // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      
      const isEligible = emi <= maxAvailableEmi;
      
      const totalRepayment = emi * months;
      const processingFeeAmt = amount * ((lender.processingFee || 1) / 100);

      // Generate recommendation reason
      let reason = "Standard matching product.";
      if (isEligible) {
        reason = `Your income easily supports the ₹${Math.round(emi).toLocaleString('en-IN')} EMI.`;
      } else {
        reason = `Income requirement not met for this EMI (₹${Math.round(emi).toLocaleString('en-IN')}).`;
      }

      if (rate < 8.5) {
        reason += " Highly competitive interest rate.";
      }

      return {
        lenderId: lender.id,
        lenderName: lender.name,
        lenderLogo: lender.logo,
        productId: loanProduct.id,
        productName: loanProduct.name,
        interestRate: rate,
        processingFeePct: lender.processingFee || 1,
        processingFeeAmt: Math.round(processingFeeAmt),
        emi: Math.round(emi),
        totalRepayment: Math.round(totalRepayment),
        isEligible,
        reason
      };
    });

    // Sort by eligible first, then by interest rate
    matches.sort((a, b) => {
      if (a.isEligible && !b.isEligible) return -1;
      if (!a.isEligible && b.isEligible) return 1;
      return a.interestRate - b.interestRate;
    });

    return NextResponse.json({ 
      matches, 
      maxAvailableEmi,
      loanProduct 
    });

  } catch (error: any) {
    console.error("Recommendations error:", error);
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}
