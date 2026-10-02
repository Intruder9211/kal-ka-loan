"use client"

import { useActionState, useState } from "react"
import { authenticate } from "@/app/actions/auth"
import { ArrowRight, KeyRound, Mail, ShieldAlert, Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-slate-950 p-10 rounded-2xl shadow-2xl ring-1 ring-white/10">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50 mb-4">
            <ShieldAlert className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Sign in with your staff credentials
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={dispatch}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-slate-500" aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-lg border-0 bg-slate-900 py-2.5 pl-10 text-white ring-1 ring-inset ring-slate-800 placeholder:text-slate-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  placeholder="Staff Email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyRound className="h-5 w-5 text-slate-500" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-lg border-0 bg-slate-900 py-2.5 pl-10 pr-10 text-white ring-1 ring-inset ring-slate-800 placeholder:text-slate-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
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
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20"
            >
              {isPending ? "Authenticating..." : "Sign In to Control Center"}
              {!isPending && (
                <span className="absolute inset-y-0 right-4 flex items-center pl-3">
                  <ArrowRight className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors" aria-hidden="true" />
                </span>
              )}
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-400 text-sm text-center bg-red-950/50 py-2 rounded-lg border border-red-900/50">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
