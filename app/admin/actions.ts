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

  let defaultCategory = await prisma.category.findFirst()
  if (!defaultCategory) {
    defaultCategory = await prisma.category.create({
      data: { name: "General", slug: "general" }
    })
  }

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

export async function editProduct(id: string, data: FormData) {
  const name = data.get("name") as string
  const description = data.get("description") as string
  const basePrice = parseFloat(data.get("basePrice") as string)
  const imageUrl = data.get("imageUrl") as string
  const isFeatured = data.get("isFeatured") === "on"
  
  await prisma.menuItem.update({
    where: { id },
    data: {
      name,
      description,
      basePrice,
      imageUrl,
      isFeatured
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

export async function updateSettings(data: FormData) {
  // Write dynamic application settings to the local JSON store
  const { db } = await import("@/lib/db")
  
  const slide1 = data.get("slide1") as string
  const slide2 = data.get("slide2") as string
  const slide3 = data.get("slide3") as string
  
  db.settings.update({
    restaurantOpen: data.get("restaurantOpen") === "on",
    deliveryRadiusMiles: parseFloat(data.get("deliveryRadiusMiles") as string),
    taxRate: parseFloat(data.get("taxRate") as string),
    contactEmail: data.get("contactEmail") as string,
    contactPhone: data.get("contactPhone") as string,
    globalNotice: data.get("globalNotice") as string,
    slideshowImages: [slide1, slide2, slide3].filter(Boolean)
  })
  
  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/admin/settings")
}

export async function getUserOrders(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return []
  return prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })
}
