"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export function PublicWrapper({ children, session }: { children: ReactNode, session?: any }) {
  const pathname = usePathname()
  
  // Hide public components on dashboard and admin routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null
  }

  return <>{children}</>
}
