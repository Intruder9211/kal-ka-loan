"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { redirect } from "next/navigation"

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password."
        default:
          return "Something went wrong."
      }
    }
    // Re-throw Next.js redirect errors and other unknown errors
    throw error
  }
}

export async function signup(
  prevState: any,
  formData: FormData
) {
  const fullName = formData.get("fullName") as string
  const mobileNumber = formData.get("mobileNumber") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const acceptTerms = formData.get("acceptTerms")

  // 1. Basic validation
  if (!fullName || !mobileNumber || !email || !password || !acceptTerms) {
    return { error: "Please fill all required fields and accept the terms." }
  }

  // 2. Strong password validation
  if (password.length < 8) return { error: "Password must be at least 8 characters long." }
  if (!/[A-Z]/.test(password)) return { error: "Password must contain at least one uppercase letter." }
  if (!/[a-z]/.test(password)) return { error: "Password must contain at least one lowercase letter." }
  if (!/[0-9]/.test(password)) return { error: "Password must contain at least one number." }

  try {
    // 3. Check for duplicates safely (email)
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return { error: "An account with this email already exists." }
    }

    // 4. Hash password
    const hashedPassword = await hash(password, 12)

    // 5. Create user
    await prisma.user.create({
      data: {
        name: fullName.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "CLIENT",
      }
    })

  } catch (error) {
    console.error("Signup error:", error)
    return { error: "Something went wrong while creating your account. Please try again." }
  }

  try {
    // Automatically log them in
    await signIn("credentials", {
      email: email.toLowerCase(),
      password,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      // If signin fails, force them to login page
      redirect("/login")
    }
    // Re-throw the NEXT_REDIRECT success error so Next.js redirects to dashboard
    throw error;
  }
}
