import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Upload, 
  BellRing, 
  Sparkles, 
  Building2, 
  ChevronRight,
  ShieldCheck,
  FileWarning,
  TrendingUp,
  CreditCard,
  Layers,
  FileCheck2,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import PersonalizedRecommendations from "@/components/dashboard/PersonalizedRecommendations"
import LoanReadinessScore from "@/components/dashboard/LoanReadinessScore"
import SmartApplicationTimeline from "@/components/dashboard/SmartApplicationTimeline"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export default async function DashboardOverview() {
  const session = await auth()
  const userId = session?.user?.id
  const userEmail = session?.user?.email

  const userProfile = userId ? await prisma.customerProfile.findUnique({
    where: { userId },
    select: { phone: true }
  }).catch(() => null) : null

  const userPhone = userProfile?.phone?.replace(/[^0-9]/g, '').slice(-10)

  const [applicationsCount, leadsCount] = await Promise.all([
    userId ? prisma.application.count({
      where: { customer: { userId: userId } }
    }).catch(() => 0) : 0,
    (userEmail || userPhone) ? prisma.lead.count({
      where: {
        OR: [
          ...(userEmail ? [{ email: userEmail }] : []),
          ...(userPhone ? [{ mobile: { contains: userPhone } }] : [])
        ]
      }
    }).catch(() => 0) : 0,
  ]);

  const totalActiveInquiries = applicationsCount + leadsCount;

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Dashboard Welcome Hero Banner - Ultra Modern */}
      <div className="bg-brand-deep rounded-3xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden shadow-xl border border-white/10 group">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/15 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-600/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold mb-3.5 backdrop-blur-sm shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
              <Sparkles size={13} className="text-brand-mint" />
              <span>Verified Borrower Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 leading-tight">
              Welcome back, <span className="text-brand-mint">{session?.user?.name || "Applicant"}</span>!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              Track your home loan applications, upload underwriting documents, and monitor live bank sanction approvals in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link 
              href="/dashboard/documents"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl transition-all duration-200 inline-flex items-center gap-1.5"
            >
              <Upload size={15} /> Upload Documents
            </Link>
            <Link 
              href="/dashboard/applications" 
              className="bg-brand-mint text-brand-deep font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl hover:bg-white hover:shadow-[0_0_20px_rgba(117,232,122,0.4)] transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-md"
            >
              <span>Track Application</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Cards Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Metric 1 */}
        <div className="group rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-brand-mint/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between pb-3">
            <h3 className="tracking-wider text-[11px] font-bold text-slate-400 uppercase">Active Inquiries</h3>
            <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-brand-mint/15 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
              <Clock size={16} />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 tracking-tight">{totalActiveInquiries}</div>
          <p className="text-xs font-bold text-amber-600 flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>{totalActiveInquiries > 0 ? "Under Review & Processing" : "All Reviews Cleared"}</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="group rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-brand-mint/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between pb-3">
            <h3 className="tracking-wider text-[11px] font-bold text-slate-400 uppercase">Active Mortgages</h3>
            <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-brand-mint/15 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
              <Building2 size={16} />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 tracking-tight">0</div>
          <p className="text-xs font-semibold text-slate-400 flex items-center gap-1 mt-2">
            <span>No active debt obligation</span>
          </p>
        </div>
        
        {/* Metric 3 */}
        <div className="group rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-brand-mint/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between pb-3">
            <h3 className="tracking-wider text-[11px] font-bold text-slate-400 uppercase">Outstanding Balance</h3>
            <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-brand-mint/15 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
              <CreditCard size={16} />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 tracking-tight">₹0</div>
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-2">
            <CheckCircle2 size={13} />
            <span>Zero Prepayment Penalties</span>
          </p>
        </div>

        {/* Metric 4 - Action Card */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-deep to-slate-900 p-5 sm:p-6 shadow-md text-white relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/10">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Upload size={90} />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <span className="tracking-wider text-[10px] font-black text-brand-mint uppercase bg-white/10 px-2 py-0.5 rounded-full inline-block mb-2">
                Pending Action
              </span>
              <div className="text-base sm:text-lg font-black leading-snug text-white">
                Upload 3 Months Bank Statements
              </div>
            </div>
            <Link 
              href="/dashboard/documents" 
              className="mt-4 text-xs font-extrabold bg-brand-mint text-brand-deep hover:bg-white px-4 py-2.5 rounded-xl transition-all inline-flex items-center justify-center gap-2 w-full active:scale-95 shadow-sm"
            >
              <span>Upload Documents</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>

      {/* 3. Graphical Application Timeline & Loan Readiness Score Check */}
      <div className="grid gap-8 lg:grid-cols-2 items-stretch">
        {/* Item 1: Smart Application Timeline in a Graph */}
        <div className="h-full">
          <SmartApplicationTimeline />
        </div>
        
        {/* Item 2: Loan Readiness Score Check */}
        <div className="h-full">
          <LoanReadinessScore />
        </div>
      </div>

      {/* 4. Item 3: Recent Updates - Completely Redesigned Feed Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xs overflow-hidden hover:border-brand-mint/50 hover:shadow-md transition-all duration-300">
        
        {/* Feed Header */}
        <div className="border-b border-slate-100 bg-white px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center border border-emerald-100 shrink-0">
              <BellRing size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                Live Activity Feed &amp; Recent Updates
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Real-time loan status notifications, lender underwriting alerts, and action items
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Synced</span>
            </span>
          </div>
        </div>

        {/* Feed Items List with Rich Modern Card Layout */}
        <div className="p-5 sm:p-6 space-y-3.5">
          
          {/* Update Item 1: Action Required */}
          <div className="group relative overflow-hidden bg-amber-50/50 hover:bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <FileWarning size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md">
                    Urgent Action Required
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    2 hours ago
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-amber-900 transition-colors">
                  Upload Missing Banking Statements for Underwriting
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium max-w-2xl">
                  HDFC Bank credit risk team has reviewed your application. Please upload your latest 3 months operative bank statements showing salary credit to proceed with the in-principle sanction.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/documents"
              className="shrink-0 inline-flex items-center gap-1.5 bg-slate-900 hover:bg-amber-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow-xs w-full sm:w-auto justify-center"
            >
              <span>Upload Statements</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Update Item 2: Milestone Reached */}
          <div className="group relative overflow-hidden bg-emerald-50/40 hover:bg-emerald-50/80 border border-emerald-200/60 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <ShieldCheck size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                    KYC Verified
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Yesterday at 4:30 PM
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-900 transition-colors">
                  Aadhaar &amp; PAN Verification Completed
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium max-w-2xl">
                  NSDL database verification successfully completed with 100% identity match. Your profile is eligible for digital paperless sanction letters.
                </p>
              </div>
            </div>

            <span className="shrink-0 inline-flex items-center gap-1 text-emerald-700 font-bold text-xs bg-white px-3 py-1.5 rounded-xl border border-emerald-200/80">
              <CheckCircle2 size={13} />
              <span>Cleared</span>
            </span>
          </div>

          {/* Update Item 3: Application Log */}
          <div className="group relative overflow-hidden bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-brand-mint flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Layers size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                    Application Logged
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Oct 01, 2026
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Home Loan Application Registered
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium max-w-2xl">
                  Application reference <strong className="font-mono text-slate-800">#MV-2026-HL948</strong> registered for ₹50,00,000 across partner banks with zero processing charge offer.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/applications"
              className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200"
            >
              <span>View Details</span>
              <ChevronRight size={13} />
            </Link>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Showing latest 3 account updates</span>
          <Link href="/dashboard/notifications" className="text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1">
            <span>View All Notifications</span>
            <ChevronRight size={13} />
          </Link>
        </div>

      </div>

      {/* 5. Item 4: Personalized Loan Matches - Kept untouched as requested */}
      <PersonalizedRecommendations />

    </div>
  )
}
