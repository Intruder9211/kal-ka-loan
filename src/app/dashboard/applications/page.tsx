import Link from "next/link"

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Applications</h2>
        <p className="text-sm text-slate-500 mt-1">Track the status of your loan applications.</p>
      </div>

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
    </div>
  )
}
