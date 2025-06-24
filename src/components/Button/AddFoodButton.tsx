"use client";

import { addFood } from "@/services/FoodServices";
import { IFoodItem } from "@/types/IFood";
import { useState } from "react";
import { AddFoodModal } from "../Modal/AddFoodModal";

export const AddFoodButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFood = async (payload: IFoodItem) => {
    setIsLoading(true);
    try {
      const result = await addFood(payload);
      
      if (result.success) {
        console.log("Food added successfully")
      } else {
        // toast.error(result.error || "Failed to add food");
        console.log("Failed to add food")
      }
    } catch (error) {
      console.error("Error adding food:", error);
      // toast.error("An error occurred while adding the category");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-5 py-2 rounded-full text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Food"}
      </button>

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => !isLoading && setIsModalOpen(false)}
        onAddFood={handleAddFood}
      />
    </>
  );
};