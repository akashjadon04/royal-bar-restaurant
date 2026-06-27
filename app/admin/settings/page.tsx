"use client"

import { useState } from "react"
import { Save, Image as ImageIcon, MapPin, Store, Mail, Phone, Percent, MessageSquare } from "lucide-react"

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // Mock save delay
    setTimeout(() => {
      setIsSaving(false)
      alert("Settings saved successfully!")
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Section 1: Store Status */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 flex items-center mb-4 border-b pb-2">
            <Store className="w-5 h-5 mr-2 text-red-600" />
            Operational Status
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Accepting Orders</p>
              <p className="text-sm text-gray-500">Toggle this off to prevent any new orders.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </section>

        {/* Section 2: Slideshow Settings */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 flex items-center mb-4 border-b pb-2">
            <ImageIcon className="w-5 h-5 mr-2 text-red-600" />
            Homepage Slideshow
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Provide direct image URLs for the homepage hero carousel.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slide 1 URL</label>
              <input type="text" defaultValue="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=2000" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slide 2 URL</label>
              <input type="text" defaultValue="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2000" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slide 3 URL</label>
              <input type="text" defaultValue="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=2000" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 3: Delivery Details */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 flex items-center mb-4 border-b pb-2">
              <MapPin className="w-5 h-5 mr-2 text-red-600" />
              Delivery & Rules
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Radius (Miles)</label>
                <input type="number" defaultValue={10} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Percent className="w-4 h-4 mr-1 text-gray-400" /> Tax Rate (%)
                </label>
                <input type="number" defaultValue={20} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
            </div>
          </section>

          {/* Section 4: Contact & Notice */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 flex items-center mb-4 border-b pb-2">
              <Mail className="w-5 h-5 mr-2 text-red-600" />
              Communications
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Mail className="w-4 h-4 mr-1 text-gray-400" /> Contact Email
                </label>
                <input type="email" defaultValue="contact@royalbar.com" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Phone className="w-4 h-4 mr-1 text-gray-400" /> Contact Phone
                </label>
                <input type="text" defaultValue="+44 20 7123 4567" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1 text-gray-400" /> Global Notice Banner
                </label>
                <input type="text" defaultValue="Welcome to Royal Bar! Enjoy free delivery on orders over £50." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button 
            type="submit" 
            disabled={isSaving}
            className="flex items-center px-6 py-3 bg-red-600 rounded-lg text-sm font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 transition"
          >
            {isSaving ? (
              <span className="flex items-center"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span> Saving...</span>
            ) : (
              <><Save className="w-4 h-4 mr-2" /> Save All Changes</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
