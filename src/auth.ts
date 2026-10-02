import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // 1. Check for Environment Variable Admin Override
        if (
          process.env.ADMIN_EMAIL &&
          process.env.ADMIN_PASSWORD &&
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "env-super-admin",
            email: process.env.ADMIN_EMAIL,
            name: "Super Admin",
            role: "SUPER_ADMIN",
          }
        }

        // 2. Disable erroring if prisma isn't ready
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email
            }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await compare(
            password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch(e) {
           console.error("Prisma error in authorize:", e);
           return null;
        }
      }
    })
  ]
})
