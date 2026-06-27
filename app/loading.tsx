"use client"

import { useEffect, useState } from "react"
import Lottie from "lottie-react"

export default function Loading() {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    // We use the cart animation for a fun loading screen
    fetch('/lottie-cart.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-48 h-48 mx-auto relative mb-6">
        {animationData ? (
          <Lottie animationData={animationData} loop={true} className="w-full h-full" />
        ) : (
          <div className="absolute inset-0 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Cooking up something good...</h2>
      <p className="text-gray-500">Please wait while we prepare this page.</p>
    </div>
  )
}
