"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (name: string) => void;
}

export const AddCategoryModal = ({
  isOpen,
  onClose,
  onAddCategory,
}: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onAddCategory(categoryName.trim());
      setCategoryName("");
      onClose();
    }
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
          {/* Enhanced glass backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            style={{
              // background: "rgba(15, 23, 42, 0.3)", 
              background: "rgba(0, 0, 0, 0.8)", 
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onClick={onClose}
          />

          {/* Glass morphism modal */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xs p-6 rounded-xl"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-center text-white mb-4">
              Add Category
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="category-name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3 py-2 bg-opacity-70 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-white"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-3 py-1 rounded-2xl hover:bg-opacity-100 transition-all"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
