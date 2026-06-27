import prisma from "@/lib/prisma"
import { addProduct, deleteProduct, editProduct } from "../actions"
import { ProductsClient } from "@/components/admin/ProductsClient"

export default async function AdminProductsPage() {
  const products = await prisma.menuItem.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <ProductsClient 
      initialProducts={products} 
      addProductAction={addProduct}
      deleteProductAction={deleteProduct}
      editProductAction={editProduct}
    />
  )
}
