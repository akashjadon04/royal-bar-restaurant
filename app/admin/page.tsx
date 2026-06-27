import prisma from "@/lib/prisma"
import { updateOrderStatus, addProduct, deleteProduct } from "./actions"

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { menuItem: true }
      }
    }
  })

  const products = await prisma.menuItem.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-12">
      {/* Orders Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Live Orders</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order: any) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.items.map((item: any) => (
                      <div key={item.id}>{item.quantity}x {item.menuItem.name}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'COOKING' ? 'bg-orange-100 text-orange-800' :
                        order.status === 'OUT_FOR_DELIVERY' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <form action={async () => {
                      "use server";
                      await updateOrderStatus(order.id, 'COOKING');
                    }} className="inline">
                      <button className="text-orange-600 hover:text-orange-900 bg-orange-100 px-3 py-1 rounded">Accept & Cook</button>
                    </form>
                    <form action={async () => {
                      "use server";
                      await updateOrderStatus(order.id, 'OUT_FOR_DELIVERY');
                    }} className="inline">
                      <button className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded">Out for Delivery</button>
                    </form>
                    <form action={async () => {
                      "use server";
                      await updateOrderStatus(order.id, 'DELIVERED');
                    }} className="inline">
                      <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">Delivered</button>
                    </form>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No orders yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Products</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Add New Product</h3>
            <form action={addProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input required name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea required name="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Base Price (£)</label>
                <input required name="basePrice" type="number" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL (Unsplash)</label>
                <input required name="imageUrl" type="url" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
              </div>
              <div className="flex items-center">
                <input name="isFeatured" type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900">Featured Product (Shows on Homepage)</label>
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Add Product
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="bg-white p-6 rounded-lg shadow overflow-hidden h-[600px] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">Current Products</h3>
            <ul className="divide-y divide-gray-200">
              {products.map((product: any) => (
                <li key={product.id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={product.imageUrl || ''} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">£{product.basePrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <form action={async () => {
                    "use server"
                    await deleteProduct(product.id)
                  }}>
                    <button type="submit" className="text-red-600 hover:text-red-900 text-sm font-medium">Remove</button>
                  </form>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
