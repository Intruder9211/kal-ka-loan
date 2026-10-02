export default function LoansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">My Loans</h2>
        <p className="text-sm text-slate-500 mt-1">View and manage your active and closed loans.</p>
      </div>

      <div className="bg-white p-12 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900">No active loans found</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-sm">When your loan application is approved and disbursed, it will appear here.</p>
      </div>
    </div>
  )
}
