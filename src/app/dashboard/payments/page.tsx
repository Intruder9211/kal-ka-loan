export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Payments</h2>
        <p className="text-sm text-slate-500 mt-1">Manage EMIs, make part-payments, and view payment history.</p>
      </div>

      <div className="bg-white p-12 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900">No upcoming payments</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-sm">You do not have any upcoming EMIs or active loans requiring payment.</p>
      </div>
    </div>
  )
}
