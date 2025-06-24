"use client"

import { useState } from "react"
import Image from "next/image"

interface Review {
  id: number
  text: string
  customerName: string
  customerTitle: string
  customerImage: string
}

const reviews: Review[] = [
  {
    id: 1,
    text: "Fresh, flavorful, and just the right amount of heat. The tuna was buttery, the rice well-seasoned, and the chili mayo added a great kick. A must-try for sushi lovers.",
    customerName: "Tayyab Sohail",
    customerTitle: "UX/UI Designer",
    customerImage: "https://i.ibb.co/QcjbGs5/tofan-teodor-Kjht-Jp7-Rh3-E-unsplash.jpg",
  },
  {
    id: 2,
    text: "Absolutely amazing experience! The flavors were perfectly balanced and the presentation was outstanding. Every bite was a delight.",
    customerName: "Sarah Johnson",
    customerTitle: "Food Blogger",
    customerImage: "https://i.ibb.co/Zx8HTV2/harry-pappas-xyaui-SBWRFs-unsplash.jpg",
  },
  {
    id: 3,
    text: "Best restaurant in town! The service was exceptional and the food quality exceeded all expectations. Highly recommended!",
    customerName: "Mike Chen",
    customerTitle: "Restaurant Critic",
    customerImage: "https://i.ibb.co/tMK85PF/rodney-gainous-jr-p-VF71muh-Rs-unsplash.jpg",
  },
]

export default function Feedback() {
  const [currentReview, setCurrentReview] = useState(0)

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Customer <span className="text-red-600">Feedback</span>
              </h2>

              {/* Review Text */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{reviews[currentReview].text}</p>
            </div>

            {/* Customer Info and Pagination */}
            <div className="flex items-center justify-between">
              {/* Customer Profile */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={reviews[currentReview].customerImage || "/placeholder.svg"}
                    alt={reviews[currentReview].customerName}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{reviews[currentReview].customerName}</h4>
                  <p className="text-gray-500 text-sm">{reviews[currentReview].customerTitle}</p>
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentReview ? "bg-red-600" : "border-2 border-gray-300 bg-transparent"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative">
              {/* Red geometric background */}
              <div className="absolute inset-0 bg-red-600 rounded-tl-[100px] rounded-br-[100px] transform rotate-3"></div>

              {/* Chef image */}
              <div className="relative z-10 p-8">
                <Image
                  src="/placeholder.svg?height=400&width=350"
                  alt="Professional chef making OK gesture"
                  width={350}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
