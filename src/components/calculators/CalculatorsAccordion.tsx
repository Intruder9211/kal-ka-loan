"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  PropertyCostCalculator,
  TaxBenefitCalculator,
  PmayCalculator,
  StampDutyCalculator,
  RentVsBuyCalculator
} from "./OtherCalculators";
import { CALCULATORS_CONFIG } from "@/lib/calculators-data";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const CALCULATORS = CALCULATORS_CONFIG;

export default function CalculatorsAccordion() {
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab");
  
  const [activeAccordion, setActiveAccordion] = useState<string>("emi");

  useEffect(() => {
    if (tab && CALCULATORS.some(c => c.id === tab)) {
      setActiveAccordion(tab);
      
      // Auto-scroll to the calculator with a slight delay to ensure render
      setTimeout(() => {
        const element = document.getElementById(`calc-${tab}`);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for fixed header
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [tab]);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {CALCULATORS.map((calc) => {
        const isActive = activeAccordion === calc.id;
        const Icon = calc.icon;
        
        return (
          <div 
            key={calc.id} 
            id={`calc-${calc.id}`}
            className={cn(
              "bg-white rounded-xl border transition-all duration-300 overflow-hidden scroll-mt-24",
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
                    {calc.id === "stamp-duty" && <StampDutyCalculator />}
                    {calc.id === "rent-vs-buy" && <RentVsBuyCalculator />}
                    {calc.id === "tax-benefit" && <TaxBenefitCalculator />}
                    {calc.id === "pmay" && <PmayCalculator />}
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
