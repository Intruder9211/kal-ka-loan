import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export const { auth } = NextAuth(authConfig)

const publicRoutes = [
  "/",
  "/about",
  "/loans",
  "/compare",
  "/calculators",
  "/faq",
  "/articles",
  "/contact",
  "/login",
  "/signup",
  "/privacy",
  "/terms"
]

const authRoutes = ["/login", "/signup", "/admin/login"]

const apiAuthPrefix = "/api/auth"
const publicApiPrefix = "/api/public"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const role = req.auth?.user?.role

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicApiRoute = nextUrl.pathname.startsWith(publicApiPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || nextUrl.pathname.startsWith("/loans/") || nextUrl.pathname.startsWith("/calculators/") || nextUrl.pathname.startsWith("/articles/")
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  const isClientDashboard = nextUrl.pathname.startsWith("/dashboard")
  const isAdminDashboard = nextUrl.pathname.startsWith("/admin") && !nextUrl.pathname.startsWith("/admin/login")
  const isAdminApi = nextUrl.pathname.startsWith("/api/admin")
  const isClientApi = nextUrl.pathname.startsWith("/api/client")

  // API auth routes are always allowed
  if (isApiAuthRoute || isPublicApiRoute) {
    return NextResponse.next()
  }

  // Handle auth routes (login/signup)
  if (isAuthRoute) {
    if (isLoggedIn) {
      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", nextUrl))
      }
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return NextResponse.next()
  }

  // Handle client dashboard protection
  if (isClientDashboard || isClientApi) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl))
    }
  }

  // Handle admin dashboard protection
  if (isAdminDashboard || isAdminApi) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", nextUrl))
    }
    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      // Client trying to access admin
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
  }

  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
