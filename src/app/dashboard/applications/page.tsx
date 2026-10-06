import Link from "next/link"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export default async function ApplicationsPage() {
  const session = await auth()
  const applications = session?.user?.id ? await prisma.application.findMany({
    where: { customer: { userId: session.user.id } },
    include: { loanProduct: true },
    orderBy: { createdAt: 'desc' }
  }) : []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Applications</h2>
        <p className="text-sm text-slate-500 mt-1">Track the status of your loan applications.</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900">No active applications</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm">You haven't started any loan applications yet. Explore our home loan products and start your journey today.</p>
          <Link 
            href="/dashboard/applications/new"
            className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors inline-block"
          >
            Start New Application
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Link 
              href="/dashboard/applications/new"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors inline-block"
            >
              Start New Application
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Application ID</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">#{app.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-slate-600">{app.loanProduct?.name || "Loan"}</td>
                    <td className="px-6 py-4 text-slate-600">₹{app.requestedAmount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
