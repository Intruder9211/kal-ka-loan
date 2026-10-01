"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Form Schema
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  city: z.string().min(2, "City is required"),
  loanAmount: z.string().min(1, "Loan amount is required"),
  employmentType: z.enum(["salaried", "self-employed", "business"]),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian phone number"),
  consent: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

type FormData = z.infer<typeof formSchema>;

export default function MultiStepLeadForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employmentType: "salaried",
      consent: true,
    }
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (step === 1) fieldsToValidate = ["fullName", "city"];
    if (step === 2) fieldsToValidate = ["loanAmount", "employmentType"];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    if (!showOtp) {
      // Trigger OTP flow mock
      setShowOtp(true);
      return;
    }

    // OTP verification mock
    if (otp !== "1234") {
      alert("Invalid OTP! Try 1234");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/thank-you');
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-brand-deep w-full max-w-lg mx-auto border border-gray-100">
      
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'bg-brand-mint' : 'bg-gray-100'}`} 
          />
        ))}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          {step === 1 && "Personal Details"}
          {step === 2 && "Loan Details"}
          {step === 3 && "Verification"}
        </h3>
        {step > 1 && !isSubmitting && (
          <button type="button" onClick={prevStep} className="text-gray-400 hover:text-brand-deep p-2">
            <ArrowLeft size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                {...register("fullName")}
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none" 
                placeholder="Enter your full name" 
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input 
                {...register("city")}
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none" 
                placeholder="e.g. Mumbai, Delhi" 
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>

            <button 
              type="button" 
              onClick={nextStep}
              className="btn-interactive w-full bg-brand-deep text-white font-bold py-4 rounded-lg mt-6 hover:bg-opacity-90 flex items-center justify-center gap-2 group"
            >
              Next Step <ChevronRight size={18} className="icon-slide" />
            </button>
          </div>
        )}

        {/* STEP 2: Loan Details */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div>
              <label className="block text-sm font-medium mb-1">Loan Amount Required</label>
              <input 
                {...register("loanAmount")}
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none" 
                placeholder="₹ 50,00,000" 
              />
              {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Employment Type</label>
              <div className="grid grid-cols-3 gap-2">
                {["salaried", "self-employed", "business"].map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input 
                      {...register("employmentType")} 
                      type="radio" 
                      value={type} 
                      className="peer sr-only" 
                    />
                    <div className="px-2 py-3 text-center text-xs font-medium rounded-lg border border-gray-200 peer-checked:border-brand-deep peer-checked:bg-brand-deep peer-checked:text-white capitalize transition-colors">
                      {type.replace("-", " ")}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              onClick={nextStep}
              className="btn-interactive w-full bg-brand-deep text-white font-bold py-4 rounded-lg mt-6 hover:bg-opacity-90 flex items-center justify-center gap-2 group"
            >
              Continue <ChevronRight size={18} className="icon-slide" />
            </button>
          </div>
        )}

        {/* STEP 3: Phone & OTP */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            
            <div className={`${showOtp ? 'opacity-50 pointer-events-none' : ''} transition-opacity`}>
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">+91</span>
                <input 
                  {...register("phone")}
                  type="tel" 
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none" 
                  placeholder="75033 88930" 
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {showOtp && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-medium mb-1">Enter OTP (Try 1234)</label>
                <input 
                  type="text" 
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none text-center text-xl tracking-[1em]" 
                  placeholder="----" 
                />
              </div>
            )}

            <div className="flex items-start gap-2 mt-4">
              <input 
                {...register("consent")}
                type="checkbox" 
                id="consent"
                className="mt-1"
              />
              <label htmlFor="consent" className="text-xs text-gray-500">
                I hereby consent to receive calls / SMS / WhatsApp from Kal Ka Loan and its partners. 
                I also agree to the Terms of Service & Privacy Policy.
              </label>
            </div>
            {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-interactive w-full bg-brand-deep text-white font-bold py-4 rounded-lg mt-6 hover:bg-opacity-90 flex items-center justify-center gap-2 disabled:opacity-70 group"
            >
              {isSubmitting ? (
                <> <Loader2 size={18} className="animate-spin" /> Processing... </>
              ) : showOtp ? (
                <> Verify & Submit <CheckCircle size={18} /> </>
              ) : (
                <> Send OTP <ChevronRight size={18} className="icon-slide" /> </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
