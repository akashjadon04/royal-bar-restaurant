import prisma from "@/lib/prisma"
import { addProduct, deleteProduct } from "../actions"
import { ProductsClient } from "@/components/admin/ProductsClient"

export default async function AdminProducts() {
  const products = await prisma.menuItem.findMany()

  return (
    <ProductsClient 
      initialProducts={products} 
      addProductAction={addProduct}
      deleteProductAction={deleteProduct}
    />
  )
}
