"use client";

import { useState } from "react";
import EmiCalculator from "./EmiCalculator";
import AdvancedEmiComparison from "./AdvancedEmiComparison";
import { 
  EligibilityCalculator, 
  AffordabilityCalculator, 
  PrepaymentCalculator, 
  BalanceTransferCalculator, 
  TenureCalculator, 
  AmountCalculator, 
  AmortizationCalculator, 
  DownPaymentCalculator, 
  PropertyCostCalculator 
} from "./OtherCalculators";
import { ChevronDown, Calculator, IndianRupee, Percent, Clock, Home, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const CALCULATORS = [
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
  { id: "property-cost", title: "Property Cost Calculator", icon: Home, description: "Estimate the total cost of a property including registration and stamp duty." }
];

export default function CalculatorsAccordion() {
  const [activeAccordion, setActiveAccordion] = useState<string>("emi");

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {CALCULATORS.map((calc) => {
        const isActive = activeAccordion === calc.id;
        const Icon = calc.icon;
        
        return (
          <div 
            key={calc.id} 
            className={cn(
              "bg-white rounded-xl border transition-all duration-300 overflow-hidden",
              isActive ? "border-brand-mint shadow-md" : "border-gray-200 hover:border-brand-mint/50"
            )}
          >
            {/* Accordion Header */}
            <button
              onClick={() => setActiveAccordion(isActive ? "" : calc.id)}
              className="w-full flex items-center justify-between p-5 md:p-6 bg-white text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-lg transition-colors",
                  isActive ? "bg-brand-mint/10 text-brand-mint" : "bg-gray-100 text-gray-500"
                )}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className={cn(
                    "text-lg md:text-xl font-bold transition-colors",
                    isActive ? "text-brand-deep" : "text-gray-800"
                  )}>
                    {calc.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 hidden md:block">{calc.description}</p>
                </div>
              </div>
              <ChevronDown 
                size={24} 
                className={cn(
                  "text-gray-400 transition-transform duration-300", 
                  isActive ? "rotate-180 text-brand-mint" : ""
                )} 
              />
            </button>
            
            {/* Accordion Content */}
            <div 
              className={cn(
                "transition-all duration-500 ease-in-out",
                isActive ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="p-1 md:p-6 pt-0 border-t border-gray-100 bg-gray-50/30">
                {isActive && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    {/* Render specific calculators */}
                    {calc.id === "emi" && <EmiCalculator />}
                    {calc.id === "eligibility" && <EligibilityCalculator />}
                    {calc.id === "affordability" && <AffordabilityCalculator />}
                    {calc.id === "prepayment" && <PrepaymentCalculator />}
                    {calc.id === "balance-transfer" && <BalanceTransferCalculator />}
                    {calc.id === "tenure" && <TenureCalculator />}
                    {calc.id === "amount" && <AmountCalculator />}
                    {calc.id === "comparison" && <AdvancedEmiComparison />}
                    {calc.id === "amortization" && <AmortizationCalculator />}
                    {calc.id === "down-payment" && <DownPaymentCalculator />}
                    {calc.id === "property-cost" && <PropertyCostCalculator />}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
