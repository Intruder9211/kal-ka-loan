"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return { error: "You must be logged in to update your profile." }
  }

  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const imageFile = formData.get("image") as File | null

  if (!name) {
    return { error: "Name cannot be empty." }
  }

  try {
    let imageBase64 = undefined;
    
    // Process image if a new one was uploaded
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageBase64 = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
    }

    const dataToUpdate: any = {
      name: name.trim(),
      phone: phone ? phone.trim() : null
    }

    if (imageBase64) {
      dataToUpdate.image = imageBase64;
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: dataToUpdate
    })

    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    console.error("Profile update error:", error)
    return { error: "Failed to update profile. Please try again." }
  }
}
