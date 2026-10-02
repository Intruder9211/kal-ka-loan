// Instead of assuming shadcn exists, I will write the HTML directly for the dashboard.
import { ArrowRight, CheckCircle2, Clock, Upload } from "lucide-react"
import Link from "next/link"

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500">Track your loan journey and manage your applications.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Active Applications</h3>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">1</div>
          <p className="text-xs text-slate-500">Under Review</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Active Loans</h3>
            <CheckCircle2 className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">0</div>
          <p className="text-xs text-slate-500">No active loans yet</p>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Outstanding Amount</h3>
            <span className="text-slate-400 font-serif font-bold text-lg">₹</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">0</div>
          <p className="text-xs text-slate-500">Total balance</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-blue-600 p-6 shadow-sm text-white">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-blue-100">Next Action Required</h3>
            <Upload className="h-4 w-4 text-blue-100" />
          </div>
          <div className="text-lg font-semibold mt-1">Upload Documents</div>
          <Link href="/dashboard/documents" className="text-xs text-blue-100 underline mt-2 inline-block">
            View pending requests
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Application Progress</h3>
            <Link href="/dashboard/applications" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Timeline item */}
              <div className="relative flex gap-4">
                <div className="absolute left-2 top-8 -bottom-8 w-0.5 bg-blue-600"></div>
                <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 shadow ring-4 ring-white">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Application Submitted</h4>
                  <p className="text-xs text-slate-500">Oct 02, 2026</p>
                </div>
              </div>
              
              {/* Timeline item */}
              <div className="relative flex gap-4">
                <div className="absolute left-2 top-8 -bottom-8 w-0.5 bg-slate-200"></div>
                <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 shadow ring-4 ring-white">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-600">Documents Required</h4>
                  <p className="text-xs text-slate-500">Action pending on your side</p>
                  <button className="mt-2 text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md font-medium border border-blue-200 hover:bg-blue-100">
                    Upload PAN Card
                  </button>
                </div>
              </div>

              {/* Timeline item */}
              <div className="relative flex gap-4">
                <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow ring-4 ring-white"></div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Bank Review</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Recent Notifications</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900">Document Upload Request</h4>
                  <p className="text-sm text-slate-500 mt-1">Please upload your latest 3 months bank statements to proceed with your Home Loan application.</p>
                  <p className="text-xs text-slate-400 mt-2">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-700">Application Received</h4>
                  <p className="text-sm text-slate-500 mt-1">We have successfully received your Home Loan application.</p>
                  <p className="text-xs text-slate-400 mt-2">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
