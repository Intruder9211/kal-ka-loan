"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { ApplicationStatus, DocumentStatus } from "@prisma/client"

export async function updateApplicationStatus(id: string, newStatus: string) {
  const session = await auth()
  
  if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN")) {
    throw new Error("Unauthorized")
  }

  try {
    const updated = await prisma.application.update({
      where: { id },
      data: { status: newStatus as ApplicationStatus }
    })
    
    // Log audit event if session user id is available
    if (session.user.id) {
      await prisma.auditLog.create({
        data: {
          actorId: session.user.id,
          action: `Updated application status to ${newStatus}`,
          entityType: "Application",
          entityId: id,
          newValue: newStatus,
        }
      }).catch(() => null)
    }
    
    revalidatePath("/admin/applications")
    revalidatePath(`/admin/applications/${id}`)
    revalidatePath("/admin/dashboard")
    
    return { success: true }
  } catch (error) {
    console.error("Failed to update application status:", error)
    return { success: false, error: "Failed to update status" }
  }
}

export async function updateLeadStatus(id: string, newStatus: string) {
  const session = await auth()
  
  if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN")) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.lead.update({
      where: { id },
      data: { status: newStatus }
    })

    if (session.user.id) {
      await prisma.auditLog.create({
        data: {
          actorId: session.user.id,
          action: `Updated lead status to ${newStatus}`,
          entityType: "Lead",
          entityId: id,
          newValue: newStatus,
        }
      }).catch(() => null)
    }

    revalidatePath("/admin/leads")
    revalidatePath("/admin/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Failed to update lead status:", error)
    return { success: false, error: "Failed to update lead status" }
  }
}

export async function deleteLead(id: string) {
  const session = await auth()
  
  if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN")) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.lead.delete({
      where: { id }
    })

    revalidatePath("/admin/leads")
    revalidatePath("/admin/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Failed to delete lead:", error)
    return { success: false, error: "Failed to delete lead" }
  }
}

export async function updateDocumentStatus(id: string, newStatus: DocumentStatus) {
  const session = await auth()
  
  if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN")) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.document.update({
      where: { id },
      data: { status: newStatus }
    })

    revalidatePath("/admin/documents")
    revalidatePath("/admin/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Failed to update document status:", error)
    return { success: false, error: "Failed to update document status" }
  }
}
