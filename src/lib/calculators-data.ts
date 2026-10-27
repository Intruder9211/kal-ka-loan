import { LucideIcon, Calculator, IndianRupee, Home, Percent, ArrowRightLeft, Clock } from "lucide-react";

export interface CalculatorItem {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

export const CALCULATORS_CONFIG: CalculatorItem[] = [
  { id: "emi", title: "EMI Calculator", icon: Calculator, description: "Calculate your monthly EMI and view the amortization schedule." },
  { id: "eligibility", title: "Loan Eligibility Calculator", icon: IndianRupee, description: "Check how much loan you are eligible for based on your income." },
  { id: "affordability", title: "Home Loan Affordability Calculator", icon: Home, description: "Determine the maximum property value you can afford." },
  { id: "prepayment", title: "Home Loan Prepayment Calculator", icon: Percent, description: "See how prepayments can save you interest and reduce tenure." },
  { id: "balance-transfer", title: "Home Loan Balance Transfer Calculator", icon: ArrowRightLeft, description: "Calculate savings by transferring your loan to a lower interest rate." },
  { id: "tenure", title: "Loan Tenure Calculator", icon: Clock, description: "Find out the optimal tenure for your desired EMI." },
  { id: "amount", title: "Loan Amount Calculator", icon: IndianRupee, description: "Calculate the loan amount you can get for a specific EMI." },
  { id: "comparison", title: "EMI Comparison Calculator", icon: Calculator, description: "Compare two different loan options side-by-side." },
  { id: "amortization", title: "Amortization Calculator", icon: Percent, description: "View a detailed month-by-month breakdown of your loan repayment." },
  { id: "down-payment", title: "Down Payment Calculator", icon: IndianRupee, description: "Calculate the required down payment for your target property." },
  { id: "property-cost", title: "Property Cost Calculator", icon: Home, description: "Estimate the total cost of a property including registration and stamp duty." },
  { id: "stamp-duty", title: "State Stamp Duty & Registration Calculator", icon: IndianRupee, description: "Calculate exact state-wise stamp duty and registration fees dynamically." },
  { id: "rent-vs-buy", title: "Rent vs Buy Decision Calculator", icon: Home, description: "Compare the long-term wealth impact of renting vs buying a property." },
  { id: "tax-benefit", title: "Tax Savings Calculator (Sec 24b & 80C)", icon: Percent, description: "Calculate income tax deductions on home loan principal and interest." },
  { id: "pmay", title: "PMAY 2.0 Subsidy Calculator", icon: Home, description: "Calculate interest subsidy benefits under Pradhan Mantri Awas Yojana Urban 2.0." }
];
