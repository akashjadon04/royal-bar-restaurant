"use client"

import { useState, useRef } from "react"
import { Search, Plus, Trash2, Edit2, Star, CheckCircle, XCircle, MoreVertical, Upload } from "lucide-react"
import { LottiePlayer } from '@/components/motion/LottiePlayer';

export function ProductsClient({ initialProducts, addProductAction, deleteProductAction, editProductAction }: any) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [base64Image, setBase64Image] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBase64Image(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setIsAdding(false)
    setEditingId(null)
    setBase64Image(null)
  }

  const activeProduct = editingId ? initialProducts.find((p: any) => p.id === editingId) : null

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products Catalog</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-red-500 focus:border-red-500 w-full sm:w-64"
            />
          </div>
          <button onClick={() => { resetForm(); setIsAdding(true) }} className="flex items-center px-4 py-2 bg-red-600 rounded-lg text-sm font-medium text-white hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 relative">
           <button onClick={resetForm} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
             <XCircle className="w-6 h-6" />
           </button>
           <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
           <form action={async (formData) => {
             setIsSaving(true)
             if (editingId) {
               await editProductAction(editingId, formData)
             } else {
               await addProductAction(formData)
             }
             setIsSaving(false)
             resetForm()
           }} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                 <input name="name" required type="text" defaultValue={activeProduct?.name} className="w-full border-gray-300 rounded-md shadow-sm" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (£)</label>
                 <input name="basePrice" required type="number" step="0.01" defaultValue={activeProduct?.basePrice} className="w-full border-gray-300 rounded-md shadow-sm" />
               </div>
               <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                 <textarea name="description" required rows={3} defaultValue={activeProduct?.description} className="w-full border-gray-300 rounded-md shadow-sm" />
               </div>
               <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                 
                 <div className="flex items-center gap-4">
                   <div 
                     onClick={() => fileInputRef.current?.click()} 
                     className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition overflow-hidden relative"
                   >
                     {(base64Image || activeProduct?.imageUrl) ? (
                       <img src={base64Image || activeProduct?.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                     ) : (
                       <>
                         <Upload className="w-6 h-6 text-gray-400 mb-1" />
                         <span className="text-xs text-gray-500">Upload</span>
                       </>
                     )}
                   </div>
                   <div className="flex-1">
                     <p className="text-xs text-gray-500 mb-2">Upload a PNG, JPG, or HEIC from your device.</p>
                     <input 
                       type="file" 
                       accept="image/*" 
                       ref={fileInputRef} 
                       onChange={handleImageUpload} 
                       className="hidden" 
                     />
                     <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-sm font-medium hover:bg-gray-200 transition">
                       Choose File
                     </button>
                   </div>
                 </div>
                 {/* Hidden input to pass the actual URL to the Server Action */}
                 <input type="hidden" name="imageUrl" value={base64Image || activeProduct?.imageUrl || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"} />
               </div>
               <div className="md:col-span-2 flex items-center space-x-2">
                 <input name="isFeatured" type="checkbox" defaultChecked={activeProduct?.isFeatured} id="featuredCheck" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                 <label htmlFor="featuredCheck" className="text-sm font-medium text-gray-700">Feature this product on homepage?</label>
               </div>
             </div>
             <div className="flex justify-end pt-4">
               <button disabled={isSaving} type="submit" className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50">
                 {isSaving ? "Saving..." : "Save Product"}
               </button>
             </div>
           </form>
        </div>
      )}

      {/* Advanced Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Bulk Actions</button>
            <div className="h-4 w-px bg-gray-300" />
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Filter by Category</button>
          </div>
          <p className="text-sm text-gray-500">{initialProducts.length} total products</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {initialProducts.map((product: any) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img className="h-12 w-12 rounded-lg object-cover border border-gray-100" src={product.imageUrl} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 truncate w-48">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">£{Number(product.basePrice).toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.isActive !== false ? (
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.isFeatured ? (
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    ) : (
                      <Star className="w-5 h-5 text-gray-300" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button onClick={() => { resetForm(); setEditingId(product.id) }} className="text-gray-400 hover:text-blue-600" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <form action={async () => { await deleteProductAction(product.id) }}>
                        <button type="submit" className="text-gray-400 hover:text-red-600" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {initialProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <LottiePlayer src="/lottie/anim_7.json" className="w-32 h-32 mx-auto opacity-60 mb-2" />
                    <p className="text-gray-500 text-sm font-medium">No products found. Start by adding one!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
