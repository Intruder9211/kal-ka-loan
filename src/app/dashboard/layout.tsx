import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Landmark, 
  CreditCard, 
  Bell, 
  User as UserIcon, 
  LogOut,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from "lucide-react"
import { signOut } from "@/auth"
import { MobileSidebar } from "@/components/MobileSidebar"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between w-full bg-white">
      <div>
        {/* Brand Header */}
        <div className="p-6 pb-4 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2 group relative">
            <div className="relative w-40 h-10 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
              <Image 
                src="/logo.png" 
                alt="Money Viora Logo" 
                fill 
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
          <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Borrower Client Portal</span>
          </div>
        </div>
        
        {/* Navigation Links with Modern Hover & Transitions */}
        <nav className="p-4 space-y-1.5 overflow-y-auto">
          <Link 
            href="/dashboard" 
            className="group flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:text-emerald-900 rounded-2xl hover:bg-emerald-50/60 font-bold text-xs sm:text-sm transition-all duration-200 border border-transparent hover:border-emerald-200/50 hover:shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-brand-mint/20 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
                <LayoutDashboard size={16} />
              </div>
              <span>Overview</span>
            </div>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-mint group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link 
            href="/dashboard/applications" 
            className="group flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:text-emerald-900 rounded-2xl hover:bg-emerald-50/60 font-bold text-xs sm:text-sm transition-all duration-200 border border-transparent hover:border-emerald-200/50 hover:shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-brand-mint/20 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
                <FileText size={16} />
              </div>
              <span>Applications</span>
            </div>
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Active
            </span>
          </Link>

          <Link 
            href="/dashboard/documents" 
            className="group flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:text-emerald-900 rounded-2xl hover:bg-emerald-50/60 font-bold text-xs sm:text-sm transition-all duration-200 border border-transparent hover:border-emerald-200/50 hover:shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-brand-mint/20 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
                <ShieldCheck size={16} />
              </div>
              <span>My Documents</span>
            </div>
            <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              Action
            </span>
          </Link>

          <Link 
            href="/dashboard/loans" 
            className="group flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:text-emerald-900 rounded-2xl hover:bg-emerald-50/60 font-bold text-xs sm:text-sm transition-all duration-200 border border-transparent hover:border-emerald-200/50 hover:shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-brand-mint/20 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
                <Landmark size={16} />
              </div>
              <span>My Mortgages</span>
            </div>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-mint group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link 
            href="/dashboard/payments" 
            className="group flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:text-emerald-900 rounded-2xl hover:bg-emerald-50/60 font-bold text-xs sm:text-sm transition-all duration-200 border border-transparent hover:border-emerald-200/50 hover:shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-brand-mint/20 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
                <CreditCard size={16} />
              </div>
              <span>EMI &amp; Payments</span>
            </div>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-mint group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link 
            href="/dashboard/notifications" 
            className="group flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:text-emerald-900 rounded-2xl hover:bg-emerald-50/60 font-bold text-xs sm:text-sm transition-all duration-200 border border-transparent hover:border-emerald-200/50 hover:shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-brand-mint/20 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
                <Bell size={16} />
              </div>
              <span>Notifications</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </Link>

          <Link 
            href="/dashboard/profile" 
            className="group flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:text-emerald-900 rounded-2xl hover:bg-emerald-50/60 font-bold text-xs sm:text-sm transition-all duration-200 border border-transparent hover:border-emerald-200/50 hover:shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-brand-mint/20 group-hover:text-brand-deep text-slate-400 flex items-center justify-center transition-colors">
                <UserIcon size={16} />
              </div>
              <span>Profile Settings</span>
            </div>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-mint group-hover:translate-x-0.5 transition-all" />
          </Link>
        </nav>
      </div>

      {/* Bottom Advisor & Signout Box */}
      <div className="p-4 space-y-3">
        {/* Dedicated Advisor Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
            <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">Dedicated Loan Officer</span>
          </div>
          <p className="text-xs font-bold text-white">Rohit Sharma &bull; Senior Advisor</p>
          <a
            href="tel:+917303061282"
            className="mt-2.5 w-full bg-white/10 hover:bg-brand-mint hover:text-brand-deep text-slate-200 font-extrabold text-[11px] py-1.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <PhoneCall size={12} /> Call Direct (+91 73030 61282)
          </a>
        </div>

        {/* Sign Out Button */}
        <div className="border-t border-slate-100 pt-2">
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: "/" })
          }}>
            <button 
              type="submit" 
              className="flex w-full items-center justify-between px-3.5 py-2 text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors font-bold text-xs cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <LogOut size={15} />
                <span>Sign Out</span>
              </div>
              <span className="text-[10px] text-slate-400 group-hover:text-red-500">&rarr;</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar with Sleek Border */}
      <aside className="w-68 bg-white border-r border-slate-200/80 hidden md:block shrink-0 shadow-xs">
        {sidebarContent}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <MobileSidebar theme="light">{sidebarContent}</MobileSidebar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                  Client Portal
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-brand-mint/15 text-brand-deep px-2 py-0.5 rounded-full border border-brand-mint/30">
                  Verified Borrower
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/dashboard/notifications"
              className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 relative transition-colors"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
            </Link>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-extrabold text-slate-900 truncate max-w-[150px]">
                  {session.user?.name || "Customer"}
                </p>
                <p className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
                  {session.user?.email}
                </p>
              </div>

              <div className="h-9 w-9 rounded-xl bg-brand-deep text-brand-mint flex items-center justify-center font-black text-sm shadow-xs border border-white/10 shrink-0">
                {session.user?.name?.charAt(0) || "C"}
              </div>
            </div>
          </div>
        </header>

        {/* Children Viewport Container */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
