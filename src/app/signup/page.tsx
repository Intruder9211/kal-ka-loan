import { Suspense } from "react"
import SignupForm from "@/components/auth/SignupForm"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-slate-400 text-sm">Loading signup...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  )
}
