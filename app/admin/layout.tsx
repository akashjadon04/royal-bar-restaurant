import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Link from "next/link"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin" className="text-xl font-bold text-red-600">Royal Bar Admin</Link>
              </div>
              <div className="ml-6 flex space-x-8">
                <Link href="/admin" className="border-red-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/" className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  View Site
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">{session.user?.email}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
