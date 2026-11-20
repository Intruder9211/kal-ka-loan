"use client"

import { useActionState, useState } from "react"
import { updateProfile } from "@/app/actions/profile"
import { Save, X, Edit3, User, Mail, Phone, UploadCloud, CheckCircle } from "lucide-react"

export default function ProfileEditor({ 
  user 
}: { 
  user: { name?: string | null, email?: string | null, phone?: string | null, image?: string | null } 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [state, dispatch, isPending] = useActionState(updateProfile, undefined)

  if (!isEditing) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-3.5 transition-all hover:bg-slate-50 hover:border-slate-200">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 mt-0.5">
              <User className="h-4 w-4" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Full Legal Name</label>
              <div className="mt-1 text-slate-900 font-bold text-base">{user.name || "Not provided"}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-3.5 transition-all hover:bg-slate-50 hover:border-slate-200">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 mt-0.5">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Email</label>
              <div className="mt-1 text-slate-900 font-bold text-base">{user.email || "Not provided"}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-3.5 transition-all hover:bg-slate-50 hover:border-slate-200 md:col-span-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 mt-0.5">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Mobile Number</label>
              <div className="mt-1 text-slate-900 font-bold text-base">
                {user.phone ? user.phone : <span className="text-slate-400 font-normal italic">Not provided (Required for OTP verification)</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">To modify PAN or Aadhaar linkage, contact your dedicated loan manager.</p>
          <button 
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-slate-900/10 cursor-pointer"
          >
            <Edit3 className="h-4 w-4" /> Edit Profile Details
          </button>
        </div>
      </div>
    )
  }

  return (
    <form action={(formData) => {
      dispatch(formData)
    }} className="space-y-6">
      
      {/* Profile Picture Upload Section */}
      <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md">
          <div className="h-full w-full rounded-2xl bg-slate-900 flex items-center justify-center text-emerald-400 overflow-hidden font-black text-2xl">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
            ) : user.name ? (
              user.name.charAt(0)
            ) : (
              "U"
            )}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Update Avatar</label>
          <div className="flex items-center gap-2">
            <input 
              type="file" 
              name="image" 
              accept="image/*"
              className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">JPEG, PNG, or WebP. Max 5MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Legal Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            defaultValue={user.name || ""} 
            required
            className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address (Locked)</label>
          <div className="text-sm font-medium text-slate-500 bg-slate-50 py-2.5 px-4 rounded-xl border border-slate-200 cursor-not-allowed">
            {user.email}
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Mobile Number (Active for SMS/WhatsApp)</label>
          <input 
            type="tel" 
            id="phone"
            name="phone" 
            defaultValue={user.phone || ""} 
            placeholder="+91 98765 43210"
            className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
          />
        </div>
      </div>

      {state?.error && (
        <div className="text-rose-600 text-xs font-semibold bg-rose-50 p-4 rounded-xl border border-rose-100">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="text-emerald-700 text-xs font-semibold bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> Profile credentials updated successfully!
        </div>
      )}

      <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
        <button 
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
        >
          <Save className="h-4 w-4" />
          {isPending ? "Saving Changes..." : "Save Credentials"}
        </button>
        <button 
          type="button"
          onClick={() => {
            setIsEditing(false)
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      </div>
    </form>
  )
}
