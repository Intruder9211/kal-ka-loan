"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ChevronRight, UploadCloud, File as FileIcon, Loader2 } from "lucide-react"
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
    
    // Simulate network delay for upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Move to success step (Step 5)
    setStep(5)
    setIsSubmitting(false)
  }
  
  // Success Screen
  if (step === 5) {
    return (
      <div className="max-w-2xl mx-auto mt-12 text-center space-y-6 bg-white p-12 rounded-2xl border border-slate-200 shadow-sm">
        <div className="mx-auto h-20 w-20 bg-emerald-100 flex items-center justify-center rounded-full">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Application Submitted!</h2>
        <p className="text-slate-500 text-lg">Your home loan application has been successfully submitted and is under review. Our team will contact you shortly.</p>
        <div className="pt-6">
          <Link href="/dashboard/applications" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors inline-block">
            View My Applications
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link href="/dashboard/applications" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-4 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
        </Link>
        <h2 className="text-2xl font-bold text-slate-800">New Home Loan Application</h2>
        <p className="text-sm text-slate-500 mt-1">Complete the steps below to securely submit your loan request.</p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center">
            {/* Step 1 */}
            <li className="relative pr-8 sm:pr-20">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="h-0.5 w-full bg-blue-600"></div>
              </div>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700">
                <CheckCircle2 className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
            </li>

            {/* Step 2 */}
            <li className="relative pr-8 sm:pr-20">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={`h-0.5 w-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
              </div>
              <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-white border-2 border-slate-300'}`}>
                {step > 2 ? (
                  <CheckCircle2 className="h-5 w-5 text-white" />
                ) : (
                  <span className={step >= 2 ? 'text-white font-medium text-sm' : 'text-slate-500 font-medium text-sm'}>2</span>
                )}
              </div>
            </li>

            {/* Step 3 */}
            <li className="relative pr-8 sm:pr-20">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={`h-0.5 w-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
              </div>
              <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-white border-2 border-slate-300'}`}>
                {step > 3 ? (
                  <CheckCircle2 className="h-5 w-5 text-white" />
                ) : (
                  <span className={step >= 3 ? 'text-white font-medium text-sm' : 'text-slate-500 font-medium text-sm'}>3</span>
                )}
              </div>
            </li>

            {/* Step 4 */}
            <li className="relative">
              <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 4 ? 'bg-blue-600' : 'bg-white border-2 border-slate-300'}`}>
                <span className={step >= 4 ? 'text-white font-medium text-sm' : 'text-slate-500 font-medium text-sm'}>4</span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="flex justify-between mt-4 text-xs font-medium text-slate-500 max-w-[calc(100%-2rem)]">
          <span className="text-blue-600">Personal Info</span>
          <span className={step >= 2 ? "text-blue-600" : ""}>Loan Details</span>
          <span className={step >= 3 ? "text-blue-600" : ""}>Income Info</span>
          <span className={step >= 4 ? "text-blue-600" : ""}>Documents</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <form onSubmit={handleSubmit} className="p-8">
          
          {/* Step 1 Content */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                  <input type="date" required className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">PAN Number</label>
                  <input type="text" placeholder="ABCDE1234F" required className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm uppercase" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Residential Address</label>
                  <textarea rows={3} required className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 Content */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Loan Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Loan Amount Required (₹)</label>
                  <input type="number" min="100000" placeholder="5000000" required className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Property City</label>
                  <select required className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm">
                    <option value="">Select a city</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Property Status</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input type="radio" name="prop_status" value="ready" required className="h-4 w-4 text-blue-600 focus:ring-blue-600" />
                      <span className="text-sm font-medium text-slate-900">Ready to Move</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input type="radio" name="prop_status" value="under_construction" required className="h-4 w-4 text-blue-600 focus:ring-blue-600" />
                      <span className="text-sm font-medium text-slate-900">Under Construction</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 Content */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Employment & Income</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
                  <select required className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm">
                    <option value="">Select type</option>
                    <option value="salaried">Salaried</option>
                    <option value="self_employed">Self Employed / Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Net Income (₹)</label>
                  <input type="number" min="10000" placeholder="75000" required className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Employer / Business Name</label>
                  <input type="text" placeholder="Company Name" required className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4 Content */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Document Upload</h3>
              <p className="text-sm text-slate-500">Please upload clear copies of the following documents to expedite your application.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* PAN Card Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">PAN Card <span className="text-red-500">*</span></label>
                  <div className={`flex justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-colors ${panFile ? 'border-blue-300 bg-blue-50' : 'border-slate-300 hover:bg-slate-50'}`}>
                    <div className="text-center w-full">
                      {panFile ? (
                        <>
                          <FileIcon className="mx-auto h-10 w-10 text-blue-500" aria-hidden="true" />
                          <div className="mt-3 text-sm font-medium text-slate-900 truncate px-2">{panFile.name}</div>
                          <button type="button" onClick={() => setPanFile(null)} className="mt-1 text-xs text-red-500 hover:text-red-600 font-medium">Remove file</button>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
                          <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                            <label
                              htmlFor="pan-upload"
                              className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500"
                            >
                              <span>Upload PAN Card</span>
                              <input 
                                id="pan-upload" 
                                name="pan-upload" 
                                type="file" 
                                required 
                                className="sr-only" 
                                accept=".pdf,.png,.jpg,.jpeg" 
                                onChange={(e) => setPanFile(e.target.files?.[0] || null)}
                              />
                            </label>
                          </div>
                          <p className="text-xs leading-5 text-slate-500 mt-1">PDF, PNG, JPG (Max 5MB)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Income Proof Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Income Proof (Salary Slip / ITR) <span className="text-red-500">*</span></label>
                  <div className={`flex justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-colors ${incomeFile ? 'border-blue-300 bg-blue-50' : 'border-slate-300 hover:bg-slate-50'}`}>
                    <div className="text-center w-full">
                      {incomeFile ? (
                        <>
                          <FileIcon className="mx-auto h-10 w-10 text-blue-500" aria-hidden="true" />
                          <div className="mt-3 text-sm font-medium text-slate-900 truncate px-2">{incomeFile.name}</div>
                          <button type="button" onClick={() => setIncomeFile(null)} className="mt-1 text-xs text-red-500 hover:text-red-600 font-medium">Remove file</button>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
                          <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                            <label
                              htmlFor="income-upload"
                              className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500"
                            >
                              <span>Upload Income Proof</span>
                              <input 
                                id="income-upload" 
                                name="income-upload" 
                                type="file" 
                                required 
                                className="sr-only" 
                                accept=".pdf,.png,.jpg,.jpeg" 
                                onChange={(e) => setIncomeFile(e.target.files?.[0] || null)}
                              />
                            </label>
                          </div>
                          <p className="text-xs leading-5 text-slate-500 mt-1">PDF, PNG, JPG (Max 10MB)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-8 mt-8 border-t border-slate-200 flex items-center justify-between">
            <button 
              type="button" 
              onClick={() => setStep(step - 1)}
              disabled={isSubmitting}
              className={`px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 disabled:opacity-50 ${step === 1 ? 'invisible' : 'visible'}`}
            >
              Previous
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : step < 4 ? (
                <>
                  Continue to Next Step <ChevronRight className="h-4 w-4" />
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

