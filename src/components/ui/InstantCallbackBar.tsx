"use client";

import { useState } from "react";
import { PhoneCall, Calendar, MapPin, CheckCircle2, X } from "lucide-react";

export default function InstantCallbackBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [applicantInfo, setApplicantInfo] = useState({ name: "", email: "", mobile: "" });

  const handleDoorstepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const nameVal = (formData.get("name") as string) || "";
    const emailVal = (formData.get("email") as string) || "";
    const mobileVal = (formData.get("mobile") as string) || "";

    setApplicantInfo({ name: nameVal, email: emailVal, mobile: mobileVal });

    try {
      const data = {
        name: nameVal,
        mobile: mobileVal,
        email: emailVal,
        city: formData.get("city"),
        preferredDate: formData.get("date"),
        preferredTime: formData.get("time"),
        loanAmount: formData.get("loanAmount"),
        source: "Doorstep Visit",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to submit request.");
      }

      setReferenceNumber(resData.referenceNumber || "MVHL" + Date.now().toString().slice(-6));
      setSubmitted(true);
    } catch (err: any) {
      alert(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Quick Action Floating Bar (Desktop bottom right & Mobile friendly) */}
      <div className="fixed bottom-20 md:bottom-6 left-4 z-[40] flex items-center gap-2">
        <div className="bg-brand-deep/95 text-white backdrop-blur-md border border-brand-mint/30 rounded-full p-1.5 pr-4 shadow-xl flex items-center gap-3">
          <a
            href="tel:+917303061282"
            aria-label="Give Missed Call at +91 7303061282"
            className="w-9 h-9 rounded-full bg-brand-mint text-brand-deep flex items-center justify-center font-bold hover:scale-105 active:scale-95 transition-transform"
            title="Give Missed Call"
          >
            <PhoneCall size={18} />
          </a>
          <div className="text-left hidden sm:block">
            <p className="text-[10px] text-brand-mint font-bold uppercase tracking-wider">Missed Call Service</p>
            <a href="tel:+917303061282" aria-label="Call +91 7303061282" className="text-xs font-extrabold hover:text-brand-mint transition-colors">
              +91 73030 61282
            </a>
          </div>
          <span className="hidden sm:inline-block w-px h-6 bg-white/20"></span>
          <button
            onClick={() => setModalOpen(true)}
            aria-label="Book Doorstep Visit"
            className="text-xs font-bold text-white hover:text-brand-mint flex items-center gap-1.5 transition-colors"
          >
            <Calendar size={14} className="text-brand-mint" />
            <span>Book Doorstep Visit</span>
          </button>
        </div>
      </div>

      {/* Doorstep Visit Booking Modal */}
      {modalOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="doorstep-modal-title"
          className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-brand-deep/80 backdrop-blur-sm"
            onClick={() => {
              setModalOpen(false);
              setSubmitted(false);
            }}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-fade-up border border-slate-100">
            <button
              onClick={() => {
                setModalOpen(false);
                setSubmitted(false);
              }}
              aria-label="Close doorstep booking modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
            >
              <X size={16} />
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 size={36} />
                </div>
                <h3 id="doorstep-modal-title" className="text-2xl font-black text-slate-900 mb-1">Doorstep Visit Confirmed!</h3>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                  Our certified loan advisor will visit your address as requested. Confirmation has also been dispatched.
                </p>

                {/* Tracking Reference Capsule */}
                <div className="bg-blue-50 border border-dashed border-blue-300 rounded-2xl p-4 mb-6">
                  <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block mb-1">
                    Application Reference Number
                  </span>
                  <div className="text-lg font-black font-mono text-slate-900 tracking-wider">
                    {referenceNumber}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Keep this number handy to track your application status.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <a
                    href={`/signup?ref=${encodeURIComponent(referenceNumber)}&name=${encodeURIComponent(applicantInfo.name)}&email=${encodeURIComponent(applicantInfo.email)}&mobile=${encodeURIComponent(applicantInfo.mobile)}`}
                    className="w-full py-3 bg-brand-deep text-white font-bold rounded-xl text-center text-sm hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Sign In / Sign Up to Track Application
                  </a>
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="w-full py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-center text-xs hover:bg-slate-200 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/15 text-brand-mint text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin size={13} /> At Your Home / Office
                  </div>
                  <h3 id="doorstep-modal-title" className="text-2xl font-extrabold text-slate-900">Book Doorstep Loan Expert</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Skip bank queues. Our certified advisor will come to you with loan comparison sheets and collect documents.
                  </p>
                </div>

                <form onSubmit={handleDoorstepSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="doorstep-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Your Name</label>
                    <input
                      required
                      id="doorstep-name"
                      name="name"
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      aria-label="Your Name"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="doorstep-mobile" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Mobile No.</label>
                      <input
                        required
                        id="doorstep-mobile"
                        name="mobile"
                        type="tel"
                        pattern="[0-9]{10}"
                        placeholder="10-digit number"
                        aria-label="Mobile Number"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="doorstep-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Email Address</label>
                      <input
                        id="doorstep-email"
                        name="email"
                        type="email"
                        placeholder="name@email.com"
                        aria-label="Email Address"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="doorstep-city" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">City / Locality</label>
                    <input
                      required
                      id="doorstep-city"
                      name="city"
                      type="text"
                      placeholder="e.g. Noida Sec 62, Delhi NCR"
                      aria-label="City or Locality"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="doorstep-date" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Preferred Date</label>
                      <input
                        required
                        id="doorstep-date"
                        name="date"
                        type="date"
                        aria-label="Preferred Date"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="doorstep-time" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Time Slot</label>
                      <select
                        id="doorstep-time"
                        name="time"
                        aria-label="Time Slot"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none bg-white"
                      >
                        <option value="10:00 AM - 01:00 PM">Morning (10 AM - 1 PM)</option>
                        <option value="02:00 PM - 05:00 PM">Afternoon (2 PM - 5 PM)</option>
                        <option value="05:00 PM - 08:00 PM">Evening (5 PM - 8 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="doorstep-loan-amount" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Expected Loan Amount</label>
                    <input
                      id="doorstep-loan-amount"
                      name="loanAmount"
                      type="number"
                      placeholder="e.g. 5000000"
                      aria-label="Expected Loan Amount"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-mint outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-brand-mint text-brand-deep font-bold rounded-xl mt-4 hover:opacity-90 transition-all shadow-md disabled:opacity-70"
                  >
                    {isSubmitting ? "Confirming..." : "Schedule My Doorstep Visit"}
                  </button>
                  <p className="text-center text-[10px] text-slate-400">100% Free Doorstep Consultation &bull; Zero Pressure</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
