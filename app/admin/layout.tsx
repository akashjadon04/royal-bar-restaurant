import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Link from "next/link"
import { LayoutDashboard, ShoppingBag, Settings, Store, Users, FileText, Bell } from "lucide-react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Store className="w-6 h-6 text-red-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">Royal CMS</span>
        </div>
        <div className="py-4">
          <nav className="px-4 space-y-2">
            <Link href="/admin" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200 group">
              <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-900" />
              Dashboard
            </Link>
            <Link href="/admin/orders" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 group">
              <ShoppingBag className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" />
              Live Orders
            </Link>
            <Link href="/admin/products" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 group">
              <FileText className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" />
              Products
            </Link>
            <Link href="/admin/customers" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 group">
              <Users className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" />
              Customers
            </Link>
            <Link href="/admin/settings" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 group">
              <Settings className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex-1 flex items-center">
            {/* Mobile menu button could go here */}
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-gray-500 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                A
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
            </div>
            <Link href="/" className="text-sm font-medium text-red-600 hover:text-red-500">
              View Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
