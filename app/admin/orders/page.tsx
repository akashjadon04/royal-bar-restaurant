import prisma from "@/lib/prisma"
import { updateOrderStatus } from "../actions"
import { Search, Calendar, Printer, User, Clock, Check, Truck, ChefHat } from "lucide-react"

export default async function AdminOrders() {
  // Fetch all orders
  const orders = await prisma.order.findMany()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Order ID..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-red-500 focus:border-red-500 w-full sm:w-64"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            Today
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
        
        {/* Column 1: Pending */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-700 flex items-center">
              <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2" /> Pending
            </h3>
            <span className="bg-white text-xs font-bold px-2 py-1 rounded shadow-sm text-gray-500">
              {orders.filter((o: any) => o.status === 'PENDING').length}
            </span>
          </div>
          <div className="space-y-4">
            {orders.filter((o: any) => o.status === 'PENDING').map((order: any) => (
              <OrderCard key={order.id} order={order} nextAction="COOKING" nextLabel="Accept & Cook" ActionIcon={ChefHat} iconColor="text-orange-600" btnColor="bg-orange-50 hover:bg-orange-100 border-orange-200" />
            ))}
          </div>
        </div>

        {/* Column 2: Cooking */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-700 flex items-center">
              <span className="w-2 h-2 rounded-full bg-orange-400 mr-2" /> Cooking
            </h3>
            <span className="bg-white text-xs font-bold px-2 py-1 rounded shadow-sm text-gray-500">
               {orders.filter((o: any) => o.status === 'COOKING').length}
            </span>
          </div>
          <div className="space-y-4">
            {orders.filter((o: any) => o.status === 'COOKING').map((order: any) => (
              <OrderCard key={order.id} order={order} nextAction="OUT_FOR_DELIVERY" nextLabel="Send out" ActionIcon={Truck} iconColor="text-blue-600" btnColor="bg-blue-50 hover:bg-blue-100 border-blue-200" />
            ))}
          </div>
        </div>

        {/* Column 3: Out for Delivery */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-700 flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2" /> Delivery
            </h3>
            <span className="bg-white text-xs font-bold px-2 py-1 rounded shadow-sm text-gray-500">
               {orders.filter((o: any) => o.status === 'OUT_FOR_DELIVERY').length}
            </span>
          </div>
          <div className="space-y-4">
            {orders.filter((o: any) => o.status === 'OUT_FOR_DELIVERY').map((order: any) => (
              <OrderCard key={order.id} order={order} nextAction="DELIVERED" nextLabel="Mark Delivered" ActionIcon={Check} iconColor="text-green-600" btnColor="bg-green-50 hover:bg-green-100 border-green-200" />
            ))}
          </div>
        </div>

        {/* Column 4: Delivered */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-700 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2" /> Completed
            </h3>
            <span className="bg-white text-xs font-bold px-2 py-1 rounded shadow-sm text-gray-500">
               {orders.filter((o: any) => o.status === 'DELIVERED').length}
            </span>
          </div>
          <div className="space-y-4 opacity-70">
            {orders.filter((o: any) => o.status === 'DELIVERED').map((order: any) => (
              <OrderCard key={order.id} order={order} nextAction="" nextLabel="" ActionIcon={Check} iconColor="text-gray-400" btnColor="hidden" />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

function OrderCard({ order, nextAction, nextLabel, ActionIcon, iconColor, btnColor }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="font-mono text-sm font-bold text-gray-900">
            #{order.id.split('_').pop()?.toUpperCase()}
          </span>
        </div>
        <div className="flex space-x-1">
          <button title="Print Receipt" className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded">
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 flex items-center mb-1">
          <User className="w-3 h-3 mr-1.5" /> Customer ID: {order.userId.substring(0,8)}
        </p>
        <div className="text-sm font-medium text-gray-900 mt-2 p-2 bg-gray-50 rounded border border-gray-100">
          Total: £{order.total.toFixed(2)}
        </div>
      </div>

      {nextAction && (
        <form action={async () => {
          "use server";
          await updateOrderStatus(order.id, nextAction);
        }}>
          <button className={`w-full flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium transition ${btnColor}`}>
            <ActionIcon className={`w-4 h-4 mr-2 ${iconColor}`} />
            <span className={iconColor}>{nextLabel}</span>
          </button>
        </form>
      )}
    </div>
  )
}
