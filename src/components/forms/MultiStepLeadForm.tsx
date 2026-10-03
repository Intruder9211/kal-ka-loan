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
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/otp/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: data.phone }),
        });
        
        if (res.ok) {
          setShowOtp(true);
        } else {
          const result = await res.json();
          alert(result.error || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        alert("Something went wrong while sending OTP.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Verify OTP first
      const verifyRes = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: data.phone, otp: otp }),
      });

      if (!verifyRes.ok) {
        const verifyResult = await verifyRes.json();
        alert(verifyResult.error || "Invalid OTP! Please try again.");
        setIsSubmitting(false);
        return;
      }

      // 2. If OTP is verified, submit the lead
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          mobile: data.phone,
          email: "Not provided via multi-step form", // Required by schema but not in form
          employment: data.employmentType,
          loanAmount: data.loanAmount,
          city: data.city,
        }),
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
    <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 md:p-8 text-slate-800 w-full max-w-lg mx-auto border border-slate-100 relative overflow-hidden">
      
      {/* Top Banner (Trust Signal) */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-mint via-brand-deep to-brand-mint"></div>
      
      {/* Progress Bar & Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1.5 flex-1 max-w-[150px]">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-brand-mint' : 'bg-slate-100'}`} 
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step {step} of 3</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {step === 1 && "Let's get started"}
              {step === 2 && "Loan Requirements"}
              {step === 3 && "Secure Verification"}
            </h3>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {step === 1 && "Tell us a bit about yourself."}
              {step === 2 && "What kind of funding do you need?"}
              {step === 3 && "We'll send a 4-digit OTP to verify."}
            </p>
          </div>
          {step > 1 && !isSubmitting && (
            <button type="button" onClick={prevStep} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-deep hover:bg-slate-100 transition-colors">
              <ArrowLeft size={18} />
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Full Name</label>
              <input 
                {...register("fullName")}
                type="text" 
                className="w-full px-5 py-3.5 rounded-xl border-2 border-transparent bg-slate-50 focus:bg-white focus:border-brand-mint focus:ring-0 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400" 
                placeholder="As per your PAN card" 
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.fullName.message}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Current City</label>
              <input 
                {...register("city")}
                type="text" 
                className="w-full px-5 py-3.5 rounded-xl border-2 border-transparent bg-slate-50 focus:bg-white focus:border-brand-mint focus:ring-0 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400" 
                placeholder="Where are you looking to buy?" 
              />
              {errors.city && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.city.message}</p>}
            </div>

            <button 
              type="button" 
              onClick={nextStep}
              className="w-full bg-brand-deep text-white font-bold py-4 rounded-xl mt-4 hover:bg-brand-mint hover:text-brand-deep transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
            >
              Continue to Loan Details <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* STEP 2: Loan Details */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Required Loan Amount</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input 
                  {...register("loanAmount")}
                  type="text" 
                  className="w-full pl-9 pr-5 py-3.5 rounded-xl border-2 border-transparent bg-slate-50 focus:bg-white focus:border-brand-mint focus:ring-0 outline-none transition-all font-bold text-slate-900 text-lg placeholder:text-slate-400" 
                  placeholder="50,00,000" 
                />
              </div>
              {errors.loanAmount && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.loanAmount.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Employment Type</label>
              <div className="grid grid-cols-3 gap-3">
                {["salaried", "self-employed", "business"].map((type) => (
                  <label key={type} className="cursor-pointer group">
                    <input 
                      {...register("employmentType")} 
                      type="radio" 
                      value={type} 
                      className="peer sr-only" 
                    />
                    <div className="px-1 py-3 text-center text-xs font-bold rounded-xl border-2 border-slate-100 bg-white text-slate-500 peer-checked:border-brand-deep peer-checked:bg-brand-deep peer-checked:text-white capitalize transition-all hover:border-slate-200 shadow-sm">
                      {type.replace("-", " ")}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              onClick={nextStep}
              className="w-full bg-brand-deep text-white font-bold py-4 rounded-xl mt-4 hover:bg-brand-mint hover:text-brand-deep transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
            >
              Check My Eligibility <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* STEP 3: Phone & OTP */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            
            <div className={`space-y-1.5 ${showOtp ? 'opacity-50 pointer-events-none' : ''} transition-opacity`}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Mobile Number</label>
              <div className="flex rounded-xl overflow-hidden border-2 border-transparent focus-within:border-brand-mint focus-within:bg-white bg-slate-50 transition-all">
                <span className="flex items-center justify-center px-4 font-bold text-slate-400 bg-slate-100 border-r border-slate-200/50">+91</span>
                <input 
                  {...register("phone")}
                  type="tel" 
                  maxLength={10}
                  className="w-full px-4 py-3.5 bg-transparent outline-none font-bold text-slate-900 tracking-wider placeholder:tracking-normal placeholder:font-medium placeholder:text-slate-400" 
                  placeholder="99999 99999" 
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.phone.message}</p>}
            </div>

            {showOtp && (
              <div className="animate-in zoom-in-95 fade-in duration-300 space-y-1.5 mt-2">
                <label className="block text-xs font-bold text-brand-mint uppercase tracking-wider pl-1 text-center">Enter 4-Digit OTP</label>
                <input 
                  type="text" 
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-brand-mint bg-brand-mint/5 focus:bg-white focus:ring-0 outline-none text-center text-3xl font-black text-brand-deep tracking-[1em]" 
                  placeholder="----" 
                />
              </div>
            )}

            <div className="flex items-start gap-3 mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="pt-0.5">
                <input 
                  {...register("consent")}
                  type="checkbox" 
                  id="consent"
                  className="w-4 h-4 rounded border-slate-300 text-brand-mint focus:ring-brand-mint"
                />
              </div>
              <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed font-medium">
                I consent to receive updates via SMS/WhatsApp and agree to the <a href="#" className="text-brand-deep underline">Terms of Service</a> & <a href="#" className="text-brand-deep underline">Privacy Policy</a>.
              </label>
            </div>
            {errors.consent && <p className="text-red-500 text-xs pl-1 font-medium">{errors.consent.message}</p>}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full font-bold py-4 rounded-xl mt-4 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.1)] ${showOtp ? 'bg-brand-mint text-brand-deep hover:bg-opacity-90' : 'bg-brand-deep text-white hover:bg-brand-mint hover:text-brand-deep'} disabled:opacity-70 disabled:cursor-not-allowed group`}
            >
              {isSubmitting ? (
                <> <Loader2 size={18} className="animate-spin" /> Processing... </>
              ) : showOtp ? (
                <> Verify & See Results <CheckCircle size={18} /> </>
              ) : (
                <> Send Verification Code <ChevronRight size={18} className={showOtp ? "" : "group-hover:translate-x-1 transition-transform"} /> </>
              )}
            </button>
            
            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 mt-4">
              <CheckCircle size={12} className="text-brand-mint" /> Bank-Grade 256-bit Encryption
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
