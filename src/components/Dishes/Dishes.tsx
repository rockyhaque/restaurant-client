import { getAllFoods } from "@/services/FoodServices";
import { IDishesProps, IFoodItem } from "@/types/IFood";
import Image from "next/image";
import React from "react";

interface DishesProps {
  category?: string;
  searchQuery?: string;
}

const Dishes = async ({ category, searchQuery }: IDishesProps) => {
  // const [foods, setFoods] = useState<IFoodItem[]>([])
  //   const [categories, setCategories] = useState<Category[]>([])
  //   const [activeCategory, setActiveCategory] = useState("All")
  //   const [showAddFood, setShowAddFood] = useState(false)
  //   const [showAddCategory, setShowAddCategory] = useState(false)
  //   const [loading, setLoading] = useState(true)

  const foods = await getAllFoods({
    ...(category && { category }),
    ...(searchQuery && { search: searchQuery }),
  });

  // Extract unique categories from foods
  const categories = [
    "All",
    ...new Set(foods.map((food: IFoodItem) => food.category)),
  ];

  console.log(categories);

  return (
    <div className="container mx-auto px-4 py-8">
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

      {/* <h1 className="text-3xl font-bold mb-6">
        {category ? `${category} Dishes` : "All Dishes"}
        {searchQuery && ` matching "${searchQuery}"`}
      </h1> */}

      {/* Tab Category */}
      <div className="flex justify-between mb-6 ">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat}
              href={cat === "All" ? "/dishes" : `/dishes?category=${cat}`}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat || (cat === "All" && !category)
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat}
            </a>
          ))}
        </div>
        {/* Action Buttons */}
        <div>
          <div className="space-x-2">
            <button className="px-5 py-2 rounded-full text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-700 cursor-pointer">
              Add Food
            </button>
            <button className="px-5 py-2 rounded-full text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-700 cursor-pointer">
              Add Category
            </button>
          </div>
        </div>
      </div>

      {foods.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food: IFoodItem) => (
            <div
              key={food._id}
              className="bg-white  overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="aspect-square relative">
                <Image
                  src={food?.img || "/food-placeholder.jpg"}
                  alt={food?.title || "Food item"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {food.title}
                  </h3>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-2xl">
                    {food.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400 text-sm">★ ★ ★ ★ ★</span>
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
    </div>
  );
};

export default Dishes;
