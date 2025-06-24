/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any[] | any;
}

export const getAllFoods = async (params?: {
  category?: string;
  search?: string;
}): Promise<any[]> => {
  try {
    const url = new URL("https://restaurant-two-gilt.vercel.app/api/foods");

    if (params?.category) {
      url.searchParams.append("category", params.category);
    }
    if (params?.search) {
      url.searchParams.append("search", params.search);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch foods: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    return Array.isArray(result?.data) ? result.data : [];
  } catch (error) {
    console.error("Error fetching foods:", error);
    return [];
  }
};

export const getAllFoodCategories = async () => {
  try {
    const url = new URL(
      "https://restaurant-two-gilt.vercel.app/api/foods/all-categories"
    );

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch food categories: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    return Array.isArray(result?.data) ? result.data : [];
  } catch (error) {
    console.error("Error fetching food categories:", error);
    return [];
  }
};

export const addFoodCategory = async (category: string) => {
  try {
    const response = await fetch(
      "https://restaurant-two-gilt.vercel.app/api/foods/add-food-category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add food category: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      throw new Error(result.message || "Failed to add food category");
    }
  } catch (error) {
    console.error("Error adding food category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
