import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, ShieldCheck, Activity } from "lucide-react"

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  // Find customer by ID (or email for backwards compatibility with our mock data)
  const users = await prisma.user.findMany() || []
  const customer = users.find((u: any) => u.id === resolvedParams.id || u.email === decodeURIComponent(resolvedParams.id))
  
  if (!customer || customer.role !== "CLIENT") {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link href="/admin/customers" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-2 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customers
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl shadow-sm border border-blue-200">
              {customer.name?.charAt(0) || "C"}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {customer.name}
              </h2>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Verified Client
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 shadow-sm transition-colors">
            Reset Password
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 shadow-sm transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="h-5 w-5 text-blue-500" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email Address</div>
                <div className="font-medium text-slate-900 mt-0.5">{customer.email}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone Number</div>
                <div className="font-medium text-slate-900 mt-0.5">{(customer as any).phone || "Not provided"}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Address</div>
                <div className="font-medium text-slate-900 mt-0.5">Not provided</div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Activity */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Activity className="h-5 w-5 text-blue-500" />
            Account Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
              <div className="text-2xl font-bold text-slate-900">0</div>
              <div className="text-sm font-medium text-slate-500 mt-1">Total Applications</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
              <div className="text-2xl font-bold text-slate-900">0</div>
              <div className="text-sm font-medium text-slate-500 mt-1">Active Loans</div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-slate-400" />
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Account Created</div>
              <div className="font-medium text-slate-900 mt-0.5">Recently Registered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
