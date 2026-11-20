import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { 
  BarChart3, 
  Users, 
  FileText, 
  Landmark, 
  CreditCard, 
  Settings, 
  LogOut,
  Building2, 
  PackageSearch, 
  Globe,
  ExternalLink,
  ShieldCheck,
  FolderOpen,
  HelpCircle,
  ClipboardList
} from "lucide-react"
import { signOut } from "@/auth"
import ThemeSwitcher from "@/components/layout/ThemeSwitcher"
import { MobileSidebar } from "@/components/MobileSidebar"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  
  if (!session) {
    redirect("/admin/login")
  }

  // Double check authorization
  if (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard")
  }

  const sidebarContent = (
    <div className="h-full flex flex-col w-full bg-slate-950 text-slate-300">
      <div className="p-6 border-b border-slate-800/80">
        <Link href="/admin/dashboard" className="flex items-center gap-2 group relative">
          <div className="relative w-40 h-10 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
            <Image 
              src="/logo.png" 
              alt="Money Viora Logo" 
              fill 
              className="object-contain object-left brightness-0 invert opacity-95"
              priority
            />
          </div>
        </Link>
        <div className="mt-3 flex items-center gap-2 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Neon DB Synced</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {/* Core Management */}
        <div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">Core Overview</div>
          <div className="space-y-1">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <BarChart3 className="h-4 w-4 text-blue-400" />
              Live Overview
            </Link>
            <Link href="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Users className="h-4 w-4 text-emerald-400" />
              Customers
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Users className="h-4 w-4 text-amber-400" />
              Website Leads &amp; Visits
            </Link>
          </div>
        </div>
        
        {/* Loan Operations */}
        <div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">Operations</div>
          <div className="space-y-1">
            <Link href="/admin/applications" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <FileText className="h-4 w-4 text-indigo-400" />
              Applications
            </Link>
            <Link href="/admin/loans" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Landmark className="h-4 w-4 text-teal-400" />
              Active Loans
            </Link>
            <Link href="/admin/payments" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <CreditCard className="h-4 w-4 text-violet-400" />
              Payments &amp; e-NACH
            </Link>
            <Link href="/admin/documents" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <FolderOpen className="h-4 w-4 text-sky-400" />
              Document Vault
            </Link>
          </div>
        </div>
        
        {/* Products & Lenders */}
        <div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">Lending Engine</div>
          <div className="space-y-1">
            <Link href="/admin/loan-products" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <PackageSearch className="h-4 w-4 text-amber-400" />
              Loan Products
            </Link>
            <Link href="/admin/lenders" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Building2 className="h-4 w-4 text-rose-400" />
              Partner Banks (ROIs)
            </Link>
          </div>
        </div>

        {/* Website & Tools */}
        <div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">Site Management</div>
          <div className="space-y-1">
            <Link href="/admin/website" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Globe className="h-4 w-4 text-blue-400" />
              Website Branding
            </Link>
            <Link href="/admin/projects" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Building2 className="h-4 w-4 text-emerald-400" />
              Approved Projects
            </Link>
            <Link href="/admin/stamp-duty" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Landmark className="h-4 w-4 text-indigo-400" />
              Stamp Duty Calculator
            </Link>
            <Link href="/admin/branches" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Building2 className="h-4 w-4 text-cyan-400" />
              Branch Hubs
            </Link>
          </div>
        </div>

        {/* Content & Guides */}
        <div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">Knowledge Base</div>
          <div className="space-y-1">
            <Link href="/admin/forms" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <FileText className="h-4 w-4 text-amber-400" />
              Forms &amp; Downloads
            </Link>
            <Link href="/admin/articles" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <FileText className="h-4 w-4 text-emerald-400" />
              Blog Articles
            </Link>
            <Link href="/admin/faqs" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <HelpCircle className="h-4 w-4 text-teal-400" />
              FAQs &amp; Help Desk
            </Link>
          </div>
        </div>

        {/* System & Logs */}
        <div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">System</div>
          <div className="space-y-1">
            <Link href="/admin/users" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Users className="h-4 w-4 text-purple-400" />
              Admin Staff Users
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <Settings className="h-4 w-4 text-slate-400" />
              Preferences
            </Link>
            <Link href="/admin/audit-logs" className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-300 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all hover:translate-x-1">
              <ClipboardList className="h-4 w-4 text-rose-400" />
              Audit Security Logs
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800/80 bg-slate-950">
        <form action={async () => {
          "use server"
          await signOut({ redirectTo: "/admin/login" })
        }}>
          <button type="submit" className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-400 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition-all cursor-pointer">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800/80 hidden md:block shrink-0">
        {sidebarContent}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 text-slate-900">
        <header className="bg-white border-b border-slate-200/80 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <MobileSidebar theme="dark">{sidebarContent}</MobileSidebar>
            <div className="min-w-0 flex items-center gap-2">
              <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-900 tracking-tight whitespace-nowrap">
                <span className="hidden md:inline">Money Viora &bull; </span>Admin Center
              </h1>
              <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Synced
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link 
              href="/" 
              target="_blank"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
            >
              <Globe className="h-3.5 w-3.5 text-slate-500" /> Visit Site <ExternalLink className="h-3 w-3 text-slate-400" />
            </Link>
            <div className="text-slate-800 scale-90 sm:scale-100">
              <ThemeSwitcher />
            </div>
            <span className="hidden sm:inline-flex text-[10px] sm:text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {session.user?.role}
            </span>
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-xs">
              {session.user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        <div className="flex-1 p-3 sm:p-5 md:p-8 overflow-y-auto min-w-0">
          {children}
        </div>
      </main>
    </div>
  )
}
