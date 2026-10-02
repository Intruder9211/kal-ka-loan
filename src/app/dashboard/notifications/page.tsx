export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Notifications</h2>
          <p className="text-sm text-slate-500 mt-1">Updates on your applications, loans, and account.</p>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        <div className="p-6 text-center">
          <h3 className="text-sm font-medium text-slate-500">You're all caught up!</h3>
          <p className="mt-1 text-xs text-slate-400">No new notifications at the moment.</p>
        </div>
      </div>
    </div>
  )
}
