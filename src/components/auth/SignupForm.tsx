"use client"

import { useActionState, useState } from "react"
import { useSearchParams } from "next/navigation"
import { signup } from "@/app/actions/auth"
import Link from "next/link"
import { ArrowRight, KeyRound, Mail, User, Phone, CheckCircle2, Eye, EyeOff, ShieldCheck } from "lucide-react"

export default function SignupForm() {
  const searchParams = useSearchParams()
  const defaultName = searchParams.get("name") || ""
  const defaultEmail = searchParams.get("email") || ""
  const defaultMobile = searchParams.get("mobile") || ""
  const trackingRef = searchParams.get("ref") || ""

  const [state, dispatch, isPending] = useActionState(signup, undefined)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const passReqs = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password)
  }

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl ring-1 ring-slate-900/5">
      <div>
        {trackingRef && (
          <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono border border-blue-200">
            <ShieldCheck size={14} className="text-blue-600" /> Ref: {trackingRef}
          </div>
        )}
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {trackingRef 
            ? "Sign up to view your live tracking dashboard and documents." 
            : "Manage your home loan journey in one secure place."}
        </p>
      </div>

      <form className="mt-8 space-y-5" action={dispatch}>
        <div className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                defaultValue={defaultName}
                required
                className="relative block w-full rounded-xl border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="e.g. Rahul Sharma"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                defaultValue={defaultMobile}
                required
                className="relative block w-full rounded-xl border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="10-digit Mobile Number"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email-address" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={defaultEmail}
                required
                className="relative block w-full rounded-xl border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Create Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <KeyRound className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-xl border-0 py-2.5 pl-10 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="••••••••••••"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Password Requirements */}
            {password.length > 0 && (
              <div className="mt-3 text-xs space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-700 mb-1.5">Password requirements:</p>
                <div className={`flex items-center gap-1.5 ${passReqs.length ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="h-3.5 w-3.5" /> 8+ characters
                </div>
                <div className={`flex items-center gap-1.5 ${passReqs.upper ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="h-3.5 w-3.5" /> At least one uppercase letter
                </div>
                <div className={`flex items-center gap-1.5 ${passReqs.lower ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="h-3.5 w-3.5" /> At least one lowercase letter
                </div>
                <div className={`flex items-center gap-1.5 ${passReqs.number ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="h-3.5 w-3.5" /> At least one number
                </div>
              </div>
            )}
          </div>
          
          {/* Terms Checkbox */}
          <div className="flex items-start mt-3">
            <div className="flex h-5 items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                defaultChecked
                required
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="ml-2.5 text-xs text-slate-500 leading-normal">
              <label htmlFor="acceptTerms">
                I agree to the <Link href="/terms" className="text-blue-600 font-semibold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 font-semibold hover:underline">Privacy Policy</Link>.
              </label>
            </div>
          </div>

        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="group relative flex w-full justify-center rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 transition-all shadow-md"
          >
            {isPending ? "Setting Up Dashboard..." : "Create Account & View Dashboard"}
            {!isPending && (
              <span className="absolute inset-y-0 right-4 flex items-center pl-3">
                <ArrowRight className="h-4 w-4 text-blue-200 group-hover:text-white transition-colors" aria-hidden="true" />
              </span>
            )}
          </button>
        </div>
        
        {state?.error && (
          <div className="text-red-500 text-xs text-center bg-red-50 py-2.5 px-3 rounded-xl border border-red-100 font-medium">
            {state.error}
          </div>
        )}

        <div className="text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link 
            href={defaultEmail ? `/login?email=${encodeURIComponent(defaultEmail)}` : "/login"} 
            className="font-bold text-blue-600 hover:text-blue-700"
          >
            Sign In Here
          </Link>
        </div>
      </form>
    </div>
  )
}
