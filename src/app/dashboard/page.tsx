import { ArrowRight, CheckCircle2, Clock, Upload, BellRing, Sparkles, Building2, ChevronRight } from "lucide-react"
import Link from "next/link"
import PersonalizedRecommendations from "@/components/dashboard/PersonalizedRecommendations"
import LoanReadinessScore from "@/components/dashboard/LoanReadinessScore"
import SmartApplicationTimeline from "@/components/dashboard/SmartApplicationTimeline"

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Dashboard Welcome Header */}
      <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-mint/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold mb-4 uppercase tracking-wider backdrop-blur-sm">
              <Sparkles size={14} className="text-brand-mint" /> Welcome back
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">Hello, Applicant!</h2>
            <p className="text-slate-400 font-medium">Here's what's happening with your home loan journey today.</p>
          </div>
          <Link href="/dashboard/applications" className="shrink-0 bg-brand-mint text-brand-deep font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
            Continue Application <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-mint/50 transition-colors group">
          <div className="flex flex-row items-center justify-between space-y-0 pb-4">
            <h3 className="tracking-tight text-xs font-bold text-slate-400 uppercase">Active Applications</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-mint/10 transition-colors">
              <Clock className="h-4 w-4 text-slate-400 group-hover:text-brand-mint transition-colors" />
            </div>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-1">1</div>
          <p className="text-sm font-medium text-amber-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Under Review</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-mint/50 transition-colors group">
          <div className="flex flex-row items-center justify-between space-y-0 pb-4">
            <h3 className="tracking-tight text-xs font-bold text-slate-400 uppercase">Active Loans</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-mint/10 transition-colors">
              <Building2 className="h-4 w-4 text-slate-400 group-hover:text-brand-mint transition-colors" />
            </div>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-1">0</div>
          <p className="text-sm font-medium text-slate-500">No active loans yet</p>
        </div>
        
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-mint/50 transition-colors group">
          <div className="flex flex-row items-center justify-between space-y-0 pb-4">
            <h3 className="tracking-tight text-xs font-bold text-slate-400 uppercase">Outstanding Balance</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-mint/10 transition-colors">
              <span className="text-slate-400 font-serif font-bold group-hover:text-brand-mint transition-colors">₹</span>
            </div>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-1">0</div>
          <p className="text-sm font-medium text-slate-500">Total balance</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-brand-deep to-slate-800 p-6 shadow-lg text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Upload size={100} />
          </div>
          <div className="relative z-10">
            <div className="flex flex-row items-center justify-between space-y-0 pb-4">
              <h3 className="tracking-tight text-xs font-bold text-brand-mint uppercase">Next Action Required</h3>
            </div>
            <div className="text-xl font-bold mt-1 mb-4 leading-snug">Upload pending documents</div>
            <Link href="/dashboard/documents" className="text-sm font-bold bg-white/10 hover:bg-white text-white hover:text-brand-deep px-4 py-2 rounded-lg transition-all inline-flex items-center gap-2">
              Upload Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Smart Application Timeline */}
        <div className="h-full">
          <SmartApplicationTimeline />
        </div>
        
        {/* Loan Readiness Score */}
        <div className="h-full">
          <LoanReadinessScore />
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden md:col-span-2">
          <div className="border-b border-slate-100 bg-white px-6 py-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
              <BellRing className="text-slate-400" size={18} />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Recent Updates</h3>
          </div>
          <div className="divide-y divide-slate-50">
            <div className="p-6 hover:bg-slate-50 transition-colors group">
              <div className="flex gap-5">
                <div className="mt-1">
                  <div className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-mint transition-colors">Action Required: Document Upload</h4>
                  <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">Please upload your latest 3 months bank statements to proceed with your HDFC Home Loan application.</p>
                  <p className="text-xs font-bold text-slate-400 mt-3 uppercase tracking-wider">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="p-6 hover:bg-slate-50 transition-colors group">
              <div className="flex gap-5">
                <div className="mt-1">
                  <div className="h-3 w-3 rounded-full bg-slate-300"></div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-700">Application Received</h4>
                  <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">We have successfully received your Home Loan application and sent it for initial review.</p>
                  <p className="text-xs font-bold text-slate-400 mt-3 uppercase tracking-wider">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations Section */}
      <PersonalizedRecommendations />
    </div>
  )
}
