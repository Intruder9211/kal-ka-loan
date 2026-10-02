"use client"

import { useActionState, useState } from "react"
import { signup } from "@/app/actions/auth"
import Link from "next/link"
import { ArrowRight, KeyRound, Mail, User, Phone, CheckCircle2, Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl ring-1 ring-slate-900/5">
        <div>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Manage your loan journey in one place.
          </p>
        </div>
        <form className="mt-8 space-y-6" action={dispatch}>
          <div className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-slate-900 mb-1">
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
                  required
                  className="relative block w-full rounded-lg border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Rahul Sharma"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium leading-6 text-slate-900 mb-1">
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
                  required
                  className="relative block w-full rounded-lg border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-slate-900 mb-1">
                Email
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
                  required
                  className="relative block w-full rounded-lg border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-900 mb-1">
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
                  autoComplete="new-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative block w-full rounded-lg border-0 py-2.5 pl-10 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                <div className="mt-3 text-xs space-y-1 bg-slate-50 p-3 rounded-md border border-slate-100">
                  <p className="font-medium text-slate-700 mb-2">Password must contain:</p>
                  <div className={`flex items-center gap-2 ${passReqs.length ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <CheckCircle2 className="h-3.5 w-3.5" /> 8+ characters
                  </div>
                  <div className={`flex items-center gap-2 ${passReqs.upper ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <CheckCircle2 className="h-3.5 w-3.5" /> Uppercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${passReqs.lower ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <CheckCircle2 className="h-3.5 w-3.5" /> Lowercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${passReqs.number ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <CheckCircle2 className="h-3.5 w-3.5" /> Number
                  </div>
                </div>
              )}
            </div>
            
            {/* Terms Checkbox */}
            <div className="flex items-start mt-4">
              <div className="flex h-6 items-center">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="acceptTerms" className="text-slate-500">
                  I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </label>
              </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isPending ? "Creating Account..." : "Create Account"}
              {!isPending && (
                <span className="absolute inset-y-0 right-4 flex items-center pl-3">
                  <ArrowRight className="h-5 w-5 text-blue-100 group-hover:text-white transition-colors" aria-hidden="true" />
                </span>
              )}
            </button>
          </div>
          
          {state?.error && (
            <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg border border-red-100">
              {state.error}
            </div>
          )}

          <div className="text-center text-sm leading-6">
            <span className="text-slate-500">Already have an account? </span>
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
