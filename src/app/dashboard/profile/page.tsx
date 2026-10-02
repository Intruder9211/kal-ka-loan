import { auth } from "@/auth"
import { User } from "lucide-react"
import { prisma } from "@/lib/prisma"
import ProfileEditor from "./ProfileEditor"

export default async function ProfilePage() {
  const session = await auth()
  
  // Fetch fresh user data from mock db to get updated phone
  const user = session?.user?.email 
    ? await prisma.user.findUnique({ where: { email: session.user.email } }) 
    : session?.user

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">My Profile</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-200 flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner overflow-hidden relative border-4 border-white">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
            ) : user?.name ? (
              <span className="text-4xl font-bold">{user.name.charAt(0)}</span>
            ) : (
              <User className="h-12 w-12" />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{user?.name || "Customer"}</h3>
            <p className="text-slate-500">{user?.email}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
              Active Account
            </span>
          </div>
        </div>

        <div className="p-8">
          <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Personal Information</h4>
          
          <ProfileEditor user={user || {}} />
        </div>
      </div>
    </div>
  )
}
