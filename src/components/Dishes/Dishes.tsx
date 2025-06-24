import { getAllFoods } from "@/services/FoodServices";
import { IDishesProps, IFoodItem } from "@/types/IFood";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { FoodCardSkeleton } from "../Skeleton/FoodCardSkeleton";

interface DishesProps {
  category?: string;
  searchQuery?: string;
}

const Dishes = async ({ category, searchQuery }: IDishesProps) => {


  const allFoods = await getAllFoods();

  // Filter foods based on category if provided
  const filteredFoods = category
    ? allFoods.filter((food) => food.category === category)
    : allFoods;

  // Extract unique categories from all foods
  const categories = [
    "All",
    ...new Set(allFoods.map((food: IFoodItem) => food.category)),
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Our best Seller Dishes
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our fresh garden salad is a light and refreshing option. It features a
          mix of crisp lettuce, juicy tomatoes all tossed in your choice of
          dressing.
        </p>
      </div>

      {/* Tab Category */}
      <div className="flex justify-between mb-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/" : `/?category=${cat}`}
              scroll={false}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat || (cat === "All" && !category)
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="px-5 py-2 rounded-full text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-700 cursor-pointer">
            Add Food
          </button>
          <button className="px-5 py-2 rounded-full text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-700 cursor-pointer">
            Add Category
          </button>
        </div>
      </div>

      {/* Food Grid with Skeleton Loading */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))}
          </div>
        }
      >
        {filteredFoods.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No dishes found{category ? ` in ${category} category` : ""}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food: IFoodItem) => (
              <div
                key={food._id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative">
                  <Image
                    src={food?.img || "/food-placeholder.jpg"}
                    alt={food?.title || "Food item"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {food.title}
                    </h3>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-2xl text-xs">
                      {food.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400 text-sm">
                        ★ {food.rating}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      ${food.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Dishes;
