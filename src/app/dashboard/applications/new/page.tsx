"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ChevronRight, UploadCloud, File as FileIcon, Loader2, Sparkles, Building2, User, Wallet, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewApplicationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // File states
  const [panFile, setPanFile] = useState<File | null>(null)
  const [incomeFile, setIncomeFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step < 4) {
      setStep(step + 1)
      return
    }

    // Final Submission on Step 4
    if (!panFile || !incomeFile) {
      alert("Please upload both required documents before submitting.")
      return
    }

    setIsSubmitting(true)
    
    // Call server action
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement)
      
      // Append files from state since their inputs are unmounted when selected
      if (panFile) formData.append("pan-upload", panFile)
      if (incomeFile) formData.append("income-upload", incomeFile)

      const { submitApplication } = await import("@/app/actions/application")
      const result = await submitApplication(formData)
      
      if (result.error) {
        alert(result.error)
        setIsSubmitting(false)
        return
      }
      
      // Move to success step (Step 5)
      setStep(5)
    } catch (e) {
      alert("Error submitting application")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Success Screen
  if (step === 5) {
    return (
      <div className="max-w-2xl mx-auto my-12 text-center space-y-6 bg-white p-12 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="mx-auto h-24 w-24 bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 rounded-3xl shadow-lg shadow-emerald-500/30 flex items-center justify-center">
          <div className="h-full w-full bg-slate-950 rounded-3xl flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="h-12 w-12" />
          </div>
        </div>
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Sparkles className="h-3 w-3" /> Application Dispatched to Banking Network
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Application Successfully Submitted!</h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Your home loan application has entered the automated digital underwriting pipeline. Your dedicated relationship manager will reach out within 2 hours.
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/dashboard/applications" className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md">
            View Application Tracker
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const stepsMeta = [
    { num: 1, title: "Personal Details", icon: User },
    { num: 2, title: "Loan Needs", icon: Building2 },
    { num: 3, title: "Income & Work", icon: Wallet },
    { num: 4, title: "KYC Documents", icon: FileText },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <Link href="/dashboard/applications" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-slate-900 mb-4 transition-colors">
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Applications List
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">New Home Loan Application</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Multi-bank digital sanction in 4 quick steps.</p>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Lowest Rate Guarantee
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-4 gap-2">
          {stepsMeta.map((s) => {
            const Icon = s.icon
            const isCompleted = step > s.num
            const isCurrent = step === s.num
            return (
              <div key={s.num} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-full flex items-center mb-2">
                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? "bg-emerald-500 text-white shadow-xs"
                      : isCurrent
                      ? "bg-slate-900 text-emerald-400 ring-2 ring-emerald-400 shadow-md"
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                  </div>
                  {s.num < 4 && (
                    <div className={`hidden sm:block flex-1 h-1 mx-2 rounded-full transition-all ${
                      step > s.num ? "bg-emerald-500" : "bg-slate-100"
                    }`} />
                  )}
                </div>
                <div className="text-[11px] font-bold tracking-tight text-slate-900 hidden sm:block">
                  Step 0{s.num}
                </div>
                <div className={`text-xs font-semibold truncate max-w-full ${isCurrent ? "text-slate-900" : "text-slate-400"}`}>
                  {s.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
        <form onSubmit={handleSubmit} className="p-8 sm:p-10">
          
          {/* Step 1 Content */}
          <div className={`space-y-6 ${step === 1 ? 'block' : 'hidden'}`}>
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Step 1: Personal & Identity Information</h3>
              <p className="text-xs text-slate-500 mt-0.5">Please ensure name matches your official government ID</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Date of Birth</label>
                <input type="date" name="dob" required={step === 1} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Permanent PAN Number</label>
                <input type="text" name="panNumber" placeholder="ABCDE1234F" required={step === 1} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm uppercase font-mono" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Current Residential Address</label>
                <textarea name="address" rows={3} placeholder="Flat / House No, Street, Landmark, Pin code" required={step === 1} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"></textarea>
              </div>
            </div>
          </div>

          {/* Step 2 Content */}
          <div className={`space-y-6 ${step === 2 ? 'block' : 'hidden'}`}>
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Step 2: Desired Loan Requirements</h3>
              <p className="text-xs text-slate-500 mt-0.5">Tell us about the property and expected funding amount</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Loan Amount Required (₹)</label>
                <input type="number" name="amount" min="100000" placeholder="e.g. 5000000" required={step === 2} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Target Property City</label>
                <select name="propertyCity" required={step === 2} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                  <option value="">Select city</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Property Status</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <label className="flex items-center gap-3.5 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition-all">
                    <input type="radio" name="propertyStatus" value="Ready to Move" required={step === 2} className="h-4 w-4 text-emerald-600 focus:ring-emerald-500" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Ready to Move</div>
                      <div className="text-xs text-slate-500">Immediate possession / Resale flat</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3.5 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition-all">
                    <input type="radio" name="propertyStatus" value="Under Construction" required={step === 2} className="h-4 w-4 text-emerald-600 focus:ring-emerald-500" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Under Construction</div>
                      <div className="text-xs text-slate-500">RERA registered builder project</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 Content */}
          <div className={`space-y-6 ${step === 3 ? 'block' : 'hidden'}`}>
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Step 3: Employment & Income Structure</h3>
              <p className="text-xs text-slate-500 mt-0.5">Banks calculate your sanction limit based on verified net cashflows</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Employment Type</label>
                <select name="employmentType" required={step === 3} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                  <option value="">Select profile</option>
                  <option value="Salaried">Salaried (Corporate / MNC / Govt)</option>
                  <option value="Self Employed / Business">Self Employed Professional / Business Owner</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Monthly In-Hand Net Income (₹)</label>
                <input type="number" name="monthlyIncome" min="10000" placeholder="e.g. 95000" required={step === 3} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Current Employer / Registered Entity Name</label>
                <input type="text" name="employerName" placeholder="e.g. Google India / Tata Consultancy Services" required={step === 3} className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
              </div>
            </div>
          </div>

          {/* Step 4 Content */}
          <div className={`space-y-6 ${step === 4 ? 'block' : 'hidden'}`}>
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Step 4: Instant Document Verification</h3>
              <p className="text-xs text-slate-500 mt-0.5">Direct encrypted upload to bank credit engines</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PAN Card Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">PAN Card Copy <span className="text-rose-500">*</span></label>
                <div className={`flex justify-center rounded-2xl border-2 border-dashed px-6 py-8 transition-all ${panFile ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'}`}>
                  <div className="text-center w-full">
                    {panFile ? (
                      <>
                        <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 truncate px-2">{panFile.name}</div>
                        <button type="button" onClick={() => setPanFile(null)} className="mt-2 text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer">Remove file</button>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                        <div className="mt-3 flex text-xs font-bold text-slate-700 justify-center">
                          <label
                            htmlFor="pan-upload"
                            className="relative cursor-pointer rounded-lg bg-emerald-50 px-3 py-1.5 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          >
                            <span>Browse PAN File</span>
                            <input 
                              id="pan-upload" 
                              name="pan-upload" 
                              type="file" 
                              className="sr-only" 
                              accept=".pdf,.png,.jpg,.jpeg" 
                              onChange={(e) => setPanFile(e.target.files?.[0] || null)}
                            />
                          </label>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2">PDF, PNG, JPG (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Income Proof Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Income Proof (Salary Slip / 3-Yr ITR) <span className="text-rose-500">*</span></label>
                <div className={`flex justify-center rounded-2xl border-2 border-dashed px-6 py-8 transition-all ${incomeFile ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'}`}>
                  <div className="text-center w-full">
                    {incomeFile ? (
                      <>
                        <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 truncate px-2">{incomeFile.name}</div>
                        <button type="button" onClick={() => setIncomeFile(null)} className="mt-2 text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer">Remove file</button>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                        <div className="mt-3 flex text-xs font-bold text-slate-700 justify-center">
                          <label
                            htmlFor="income-upload"
                            className="relative cursor-pointer rounded-lg bg-emerald-50 px-3 py-1.5 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          >
                            <span>Browse Income Slip</span>
                            <input 
                              id="income-upload" 
                              name="income-upload" 
                              type="file" 
                              className="sr-only" 
                              accept=".pdf,.png,.jpg,.jpeg" 
                              onChange={(e) => setIncomeFile(e.target.files?.[0] || null)}
                            />
                          </label>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2">PDF, PNG, JPG (Max 10MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
            <button 
              type="button" 
              onClick={() => setStep(step - 1)}
              disabled={isSubmitting}
              className={`px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-50 cursor-pointer ${step === 1 ? 'invisible' : 'visible'}`}
            >
              Previous Step
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Transmitting Application...
                </>
              ) : step < 4 ? (
                <>
                  Proceed to Step 0{step + 1} <ChevronRight className="h-4 w-4" />
                </>
              ) : (
                "Submit Application to Credit Team"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

