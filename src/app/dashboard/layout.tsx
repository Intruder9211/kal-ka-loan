import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { LayoutDashboard, FileText, Landmark, CreditCard, Bell, User as UserIcon, LogOut } from "lucide-react"
import { signOut } from "@/auth"

import { MobileSidebar } from "@/components/MobileSidebar"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  const sidebarContent = (
    <div className="h-full flex flex-col w-full">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group relative">
          <div className="relative w-40 h-10 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
            <Image 
              src="/logo.png" 
              alt="Kal Ka Loan Logo" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 font-medium">
          <LayoutDashboard className="h-5 w-5 text-slate-400" />
          Overview
        </Link>
        <Link href="/dashboard/applications" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 font-medium">
          <FileText className="h-5 w-5 text-slate-400" />
          Applications
        </Link>
        <Link href="/dashboard/loans" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 font-medium">
          <Landmark className="h-5 w-5 text-slate-400" />
          My Loans
        </Link>
        <Link href="/dashboard/payments" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 font-medium">
          <CreditCard className="h-5 w-5 text-slate-400" />
          Payments
        </Link>
        <Link href="/dashboard/notifications" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 font-medium">
          <Bell className="h-5 w-5 text-slate-400" />
          Notifications
        </Link>
        <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 font-medium">
          <UserIcon className="h-5 w-5 text-slate-400" />
          Profile
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <form action={async () => {
          "use server"
          await signOut({ redirectTo: "/" })
        }}>
          <button type="submit" className="flex w-full items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors font-medium">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <MobileSidebar theme="light">{sidebarContent}</MobileSidebar>
            <h1 className="text-xl font-semibold text-slate-800">Client Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">
              Welcome, {session.user?.name || "Customer"}
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {session.user?.name?.charAt(0) || "C"}
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
