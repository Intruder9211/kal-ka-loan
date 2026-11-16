"use client"

import { useActionState, useState } from "react"
import { useSearchParams } from "next/navigation"
import { authenticate } from "@/app/actions/auth"
import Link from "next/link"
import { ArrowRight, KeyRound, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react"

export default function LoginForm() {
  const searchParams = useSearchParams()
  const defaultEmail = searchParams.get("email") || ""
  const trackingRef = searchParams.get("ref") || ""

  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl ring-1 ring-slate-900/5">
      <div>
        {trackingRef && (
          <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono border border-blue-200">
            <ShieldCheck size={14} className="text-blue-600" /> Ref: {trackingRef}
          </div>
        )}
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
          Sign In to Track
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to access your real-time application dashboard.
        </p>
      </div>

      <form className="mt-8 space-y-6" action={dispatch}>
        <div className="space-y-4">
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

          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <KeyRound className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
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
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="group relative flex w-full justify-center rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 transition-all shadow-md"
          >
            {isPending ? "Signing in..." : "Sign In & View Application"}
            {!isPending && (
              <span className="absolute inset-y-0 right-4 flex items-center pl-3">
                <ArrowRight className="h-4 w-4 text-blue-200 group-hover:text-white transition-colors" aria-hidden="true" />
              </span>
            )}
          </button>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-xs text-center bg-red-50 py-2.5 px-3 rounded-xl border border-red-100 font-medium">
            {errorMessage}
          </div>
        )}

        <div className="text-center text-xs text-slate-500">
          Don't have an account yet?{" "}
          <Link 
            href={trackingRef ? `/signup?ref=${encodeURIComponent(trackingRef)}${defaultEmail ? `&email=${encodeURIComponent(defaultEmail)}` : ''}` : "/signup"} 
            className="font-bold text-blue-600 hover:text-blue-700"
          >
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  )
}
