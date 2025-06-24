"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { IFoodItem } from "@/types/IFood";
import { getAllFoodCategories } from "@/services/FoodServices";

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (payload: IFoodItem) => void;
}

export const AddFoodModal = ({
  isOpen,
  onClose,
  onAddFood,
}: AddFoodModalProps) => {
  const [formData, setFormData] = useState<IFoodItem>({
    title: "",
    category: "",
    price: 0,
    rating: 5,
    img: "",
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllFoodCategories();
        if (response && Array.isArray(response)) {
          setCategories(response.map((item: IFoodItem) => item.category));
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFood(formData);
    setFormData({
      title: "",
      category: "",
      price: 0,
      img: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onClick={onClose}
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md p-6 rounded-xl"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-center text-white mb-4">Add Food</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-opacity-70 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-white"
                  placeholder="Food Name"
                  required
                />
              </div>

              <div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-opacity-70 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-white bg-transparent"
                  required
                >
                  <option
                    value=""
                    disabled
                    className="bg-transparent text-white"
                  >
                    Select Category
                  </option>
                  {categories.map((category, index) => (
                    <option
                      key={index}
                      value={category}
                      className="bg-transparent text-black"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-opacity-70 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-white text-white"
                  placeholder="Price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-opacity-70 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-white"
                  placeholder="Image URL"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all w-full"
                >
                  Add Food
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
