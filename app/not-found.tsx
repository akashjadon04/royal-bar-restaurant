"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Lottie from "lottie-react"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    // We'll use the story lottie or an online URL for 404
    fetch('/lottie-story.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full">
        
        <div className="w-64 h-64 mx-auto mb-8 relative">
          {animationData ? (
            <Lottie animationData={animationData} loop={true} className="w-full h-full drop-shadow-xl" />
          ) : (
            <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse" />
          )}
        </div>

        <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like this page got lost in the kitchen! The recipe you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 hover:border-gray-400 transition flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </button>
          <Link 
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition shadow-lg shadow-red-200 flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}
