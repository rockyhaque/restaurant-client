import React from "react";

export const FoodCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
    <div className="aspect-square relative bg-gray-200 animate-pulse"></div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);