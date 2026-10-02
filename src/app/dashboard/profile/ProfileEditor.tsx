"use client"

import { useActionState, useState } from "react"
import { updateProfile } from "@/app/actions/profile"
import { Save, X } from "lucide-react"

export default function ProfileEditor({ 
  user 
}: { 
  user: { name?: string | null, email?: string | null, phone?: string | null, image?: string | null } 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [state, dispatch, isPending] = useActionState(updateProfile, undefined)

  // When successfully updated without error, we can exit edit mode
  // But useActionState updates after the action finishes.
  // We handle it simply by toggling edit mode.

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-500">Full Name</label>
            <div className="mt-1 text-slate-900 font-medium">{user.name || "Not provided"}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500">Email Address</label>
            <div className="mt-1 text-slate-900 font-medium">{user.email || "Not provided"}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500">Phone Number</label>
            <div className="mt-1 text-slate-900 font-medium">
              {user.phone ? user.phone : <span className="text-slate-500 italic">Not provided</span>}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <button 
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Edit Profile
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
      <div className="flex items-center gap-6 pb-6 border-b border-slate-200">
        <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner overflow-hidden relative">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
          ) : user.name ? (
            <span className="text-3xl font-bold">{user.name.charAt(0)}</span>
          ) : (
            <span className="text-3xl font-bold">U</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Profile Picture</label>
          <input 
            type="file" 
            name="image" 
            accept="image/*"
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-slate-500 mt-2">JPEG, PNG, or GIF. Max 5MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            defaultValue={user.name || ""} 
            required
            className="block w-full rounded-lg border-0 py-2 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
          <div className="mt-1 text-slate-500 bg-slate-50 py-2 px-3 rounded-lg border border-slate-200">
            {user.email} (Cannot be changed)
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
          <input 
            type="tel" 
            id="phone"
            name="phone" 
            defaultValue={user.phone || ""} 
            placeholder="+91 XXXXX XXXXX"
            className="block w-full rounded-lg border-0 py-2 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {state?.error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="text-emerald-600 text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-100">
          Profile updated successfully!
        </div>
      )}

      <div className="pt-6 border-t border-slate-200 flex gap-3">
        <button 
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isPending ? "Saving..." : "Save Changes"}
        </button>
        <button 
          type="button"
          onClick={() => {
            setIsEditing(false)
            // if success state exists it will persist, but that's fine or we can ignore
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      </div>
    </form>
  )
}
