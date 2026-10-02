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
  Globe
} from "lucide-react"
import { signOut } from "@/auth"

import { MobileSidebar } from "@/components/MobileSidebar"

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
    <div className="h-full flex flex-col w-full">
      <div className="p-6 border-b border-slate-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2 group relative">
          <div className="relative w-40 h-10 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
            <Image 
              src="/logo.png" 
              alt="Kal Ka Loan Logo" 
              fill 
              className="object-contain object-left brightness-0 invert opacity-90"
              priority
            />
          </div>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-4">Core</div>
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <BarChart3 className="h-5 w-5 text-slate-400" />
            Overview
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Users className="h-5 w-5 text-slate-400" />
            Customers
          </Link>
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-6">Operations</div>
          <Link href="/admin/applications" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="h-5 w-5 text-slate-400" />
            Applications
          </Link>
          <Link href="/admin/loans" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Landmark className="h-5 w-5 text-slate-400" />
            Loans
          </Link>
          <Link href="/admin/payments" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <CreditCard className="h-5 w-5 text-slate-400" />
            Payments
          </Link>
          <Link href="/admin/documents" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="h-5 w-5 text-slate-400" />
            Documents
          </Link>
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-6">Config</div>
          <Link href="/admin/loan-products" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <PackageSearch className="h-5 w-5 text-slate-400" />
            Loan Products
          </Link>
          <Link href="/admin/lenders" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Building2 className="h-5 w-5 text-slate-400" />
            Lenders
          </Link>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-6">Website</div>
          <Link href="/admin/website" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Globe className="h-5 w-5 text-slate-400" />
            Website Content
          </Link>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-6">Content</div>
          <Link href="/admin/articles" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="h-5 w-5 text-slate-400" />
            Articles
          </Link>
          <Link href="/admin/faqs" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="h-5 w-5 text-slate-400" />
            FAQs
          </Link>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-6">System</div>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Users className="h-5 w-5 text-slate-400" />
            Admin Users
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="h-5 w-5 text-slate-400" />
            Settings
          </Link>
          <Link href="/admin/audit-logs" className="flex items-center gap-3 px-3 py-2 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="h-5 w-5 text-slate-400" />
            Audit Logs
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <form action={async () => {
          "use server"
          await signOut({ redirectTo: "/admin/login" })
        }}>
          <button type="submit" className="flex w-full items-center gap-3 px-3 py-2 text-slate-400 rounded-lg hover:bg-red-950/30 hover:text-red-400 transition-colors">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 hidden md:block">
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 text-slate-900">
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <MobileSidebar theme="dark">{sidebarContent}</MobileSidebar>
            <h1 className="text-xl font-semibold text-slate-800">Admin Control Center</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {session.user?.role}
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
              {session.user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
