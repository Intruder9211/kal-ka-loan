"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

import { ApplicationStatus } from "@prisma/client"

export async function updateApplicationStatus(id: string, newStatus: string) {
  const session = await auth()
  
  if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN")) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.application.update({
      where: { id },
      data: { status: newStatus as ApplicationStatus }
    })
    
    // In a real application, we would also create an audit log here
    revalidatePath("/admin/applications")
    revalidatePath(`/admin/applications/${id}`)
    
    return { success: true }
  } catch (error) {
    console.error("Failed to update application status:", error)
    return { success: false, error: "Failed to update status" }
  }
}
