import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Phone, FileText, CheckCircle2, FileDown, UploadCloud, AlertCircle, Eye } from "lucide-react"
import { StatusUpdater } from "@/components/admin/StatusUpdater"

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const application = await prisma.application.findUnique({ where: { id: resolvedParams.id } })
  
  if (!application) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link href="/admin/applications" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-2 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            Application {application.id}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Submitted on {application.date}</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <span className="text-sm font-medium text-slate-700">Current Status:</span>
          <StatusUpdater applicationId={application.id} currentStatus={application.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
              <User className="h-5 w-5 text-slate-500" />
              <h3 className="font-semibold text-slate-900">Customer Profile</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Full Name</div>
                <div className="font-medium text-slate-900">{application.customer}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Phone Number</div>
                <div className="font-medium text-slate-900">{application.phone || "N/A"}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">PAN Number</div>
                <div className="font-medium text-slate-900 font-mono">{application.pan || "N/A"}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Monthly Income</div>
                <div className="font-medium text-slate-900">{application.income || "N/A"}</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-500" />
              <h3 className="font-semibold text-slate-900">Loan Requirements</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Product Type</div>
                <div className="font-medium text-slate-900">{application.product}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Requested Amount</div>
                <div className="font-bold text-blue-600 text-lg">{application.amount}</div>
              </div>
            </div>
          </div>
          
          {/* Documents Section */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-slate-500" />
              <h3 className="font-semibold text-slate-900">Submitted Documents</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">PAN Card Copy</div>
                    <div className="text-xs text-slate-500 font-medium">Uploaded on {application.date} &bull; PDF</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href="/logo.png" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2 border border-transparent">
                    <Eye className="h-4 w-4" /> View
                  </a>
                  <a href="/logo.png" download="pan-card-copy.png" className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-lg transition-colors flex items-center gap-2">
                    <FileDown className="h-4 w-4" /> Download
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Income Proof (ITR)</div>
                    <div className="text-xs text-slate-500 font-medium">Uploaded on {application.date} &bull; PDF</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href="/logo.png" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2 border border-transparent">
                    <Eye className="h-4 w-4" /> View
                  </a>
                  <a href="/logo.png" download="income-proof.png" className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-lg transition-colors flex items-center gap-2">
                    <FileDown className="h-4 w-4" /> Download
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Status/Timeline */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Application Timeline
            </h3>
            
            <div className="relative pl-6 space-y-6 border-l-2 border-slate-100 ml-3">
              <div className="relative">
                <div className="absolute -left-[31px] bg-emerald-500 h-4 w-4 rounded-full border-4 border-white shadow-sm" />
                <div className="font-medium text-slate-900 text-sm">Application Submitted</div>
                <div className="text-xs text-slate-500 mt-1">{application.date} - Client generated request</div>
              </div>
              <div className="relative">
                <div className={`absolute -left-[31px] h-4 w-4 rounded-full border-4 border-white shadow-sm ${application.status !== 'SUBMITTED' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <div className={`font-medium text-sm ${application.status !== 'SUBMITTED' ? 'text-slate-900' : 'text-slate-500'}`}>Under Review</div>
                <div className="text-xs text-slate-500 mt-1">Admin assigned to review</div>
              </div>
              <div className="relative">
                <div className={`absolute -left-[31px] h-4 w-4 rounded-full border-4 border-white shadow-sm ${application.status === 'VERIFIED' || application.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <div className={`font-medium text-sm ${application.status === 'VERIFIED' || application.status === 'APPROVED' ? 'text-slate-900' : 'text-slate-500'}`}>Documents Verified</div>
                <div className="text-xs text-slate-500 mt-1">KYC successfully completed</div>
              </div>
              <div className="relative">
                <div className={`absolute -left-[31px] h-4 w-4 rounded-full border-4 border-white shadow-sm ${application.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <div className={`font-medium text-sm ${application.status === 'APPROVED' ? 'text-slate-900' : 'text-slate-500'}`}>Final Approval</div>
                <div className="text-xs text-slate-500 mt-1">Loan ready for disbursement</div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Internal Notes
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Add private notes about this application. These will not be visible to the customer.
            </p>
            <textarea 
              className="w-full text-sm border-slate-300 rounded-lg p-3 text-slate-700 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="e.g., Called customer to verify address..."
            />
            <div className="mt-3 flex justify-end">
              <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                Save Note
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
