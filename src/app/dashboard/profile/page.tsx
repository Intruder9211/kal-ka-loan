import { auth } from "@/auth"
import { User, ShieldCheck, KeyRound, Award, CheckCircle2 } from "lucide-react"
import { prisma } from "@/lib/prisma"
import ProfileEditor from "./ProfileEditor"

export default async function ProfilePage() {
  const session = await auth()
  
  // Fetch fresh user data from mock db to get updated phone
  const user = session?.user?.email 
    ? await prisma.user.findUnique({ where: { email: session.user.email } }) 
    : session?.user

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      {/* Executive Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 text-white shadow-xl border border-slate-800/80">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="h-full w-full rounded-2xl bg-slate-900 flex items-center justify-center text-emerald-400 overflow-hidden">
                  {user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : user?.name ? (
                    <span className="text-3xl font-black">{user.name.charAt(0)}</span>
                  ) : (
                    <User className="h-9 w-9" />
                  )}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-slate-900 shadow-sm" title="Identity Verified">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{user?.name || "Customer"}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="h-3 w-3" /> Tier 1 Verified
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
            <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Security Grade</div>
              <div className="text-sm font-black text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <Award className="h-4 w-4" /> 256-Bit Bank Safe
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Personal & Financial Credentials</h2>
            <p className="text-xs text-slate-500 mt-0.5">Keep your primary contact info updated for real-time bank sanction alerts</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
            <KeyRound className="h-3.5 w-3.5 text-slate-400" /> Managed Account
          </div>
        </div>

        <div className="p-8">
          <ProfileEditor user={user || {}} />
        </div>
      </div>
    </div>
  )
}
