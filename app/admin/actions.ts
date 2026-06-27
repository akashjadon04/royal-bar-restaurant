"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateOrderStatus(orderId: string, status: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  })
  revalidatePath("/admin")
  revalidatePath(`/track-order/${orderId}`)
}

export async function addProduct(data: FormData) {
  const name = data.get("name") as string
  const description = data.get("description") as string
  const basePrice = parseFloat(data.get("basePrice") as string)
  const imageUrl = data.get("imageUrl") as string
  const isFeatured = data.get("isFeatured") === "on"
  
  const slug = name.toLowerCase().replace(/ /g, '-')

  const defaultCategory = await prisma.category.findFirst()
  
  if (!defaultCategory) throw new Error("No categories found")

  await prisma.menuItem.create({
    data: {
      name,
      slug,
      description,
      basePrice,
      imageUrl,
      isFeatured,
      categoryId: defaultCategory.id
    }
  })
  
  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath("/menu")
}

export async function deleteProduct(id: string) {
  await prisma.menuItem.delete({
    where: { id }
  })
  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath("/menu")
}
