"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function submitApplication(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "You must be logged in to submit an application." }
  }

  const userId = session.user.id
  const amountStr = formData.get("amount") as string
  const requestedAmount = parseFloat(amountStr) || 5000000

  // Parse other fields
  const dob = formData.get("dob") as string
  const panNumber = formData.get("panNumber") as string
  const address = formData.get("address") as string
  const propertyCity = formData.get("propertyCity") as string
  const propertyStatus = formData.get("propertyStatus") as string
  const employmentType = formData.get("employmentType") as string
  const monthlyIncome = parseFloat(formData.get("monthlyIncome") as string) || 0
  const employerName = formData.get("employerName") as string

  try {
    // 0. Ensure User exists in the database (handles the case where session is from env vars)
    const dbUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!dbUser) {
      await prisma.user.create({
        data: {
          id: userId,
          email: session.user.email || `user-${userId}@example.com`,
          name: session.user.name || "System User",
          role: "CLIENT",
        }
      })
    }

    // 1. Ensure CustomerProfile exists and update it
    let profile = await prisma.customerProfile.findUnique({
      where: { userId }
    })

    if (!profile) {
      profile = await prisma.customerProfile.create({
        data: {
          userId,
          dob,
          panNumber,
          address,
          employmentType,
          monthlyIncome,
          employerName
        }
      })
    } else {
      profile = await prisma.customerProfile.update({
        where: { userId },
        data: {
          dob,
          panNumber,
          address,
          employmentType,
          monthlyIncome,
          employerName
        }
      })
    }

    // 2. Get or create a default loan product since the form doesn't explicitly pass one
    let product = await prisma.loanProduct.findFirst()
    if (!product) {
      product = await prisma.loanProduct.create({
        data: {
          name: "Home Loan",
          slug: "home-loan",
          status: "PUBLISHED"
        }
      })
    }

    // 3. Create Application
    const application = await prisma.application.create({
      data: {
        customerId: profile.id,
        loanProductId: product.id,
        requestedAmount: requestedAmount,
        propertyCity,
        propertyStatus,
        status: "SUBMITTED"
      }
    })

    // 4. Save Documents
    const panFile = formData.get("pan-upload") as File | null
    const incomeFile = formData.get("income-upload") as File | null

    if (panFile && panFile.name) {
      await prisma.document.create({
        data: {
          customerId: profile.id,
          applicationId: application.id,
          name: panFile.name,
          type: "PAN Card",
          url: `/uploads/${panFile.name}`,
          status: "PENDING"
        }
      })
    }

    if (incomeFile && incomeFile.name) {
      await prisma.document.create({
        data: {
          customerId: profile.id,
          applicationId: application.id,
          name: incomeFile.name,
          type: "Income Proof",
          url: `/uploads/${incomeFile.name}`,
          status: "PENDING"
        }
      })
    }

    revalidatePath("/dashboard/applications")
    revalidatePath("/admin/applications")
    
    return { success: true, applicationId: application.id }
  } catch (error: any) {
    console.error("Submit application error:", error)
    return { error: `Prisma Error: ${error.message || error.toString()}` }
  }
}
