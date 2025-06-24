/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any[]; 
}

export const getAllFoods = async (params?: { category?: string, search?: string }): Promise<any[]> => {
  try {
    const url = new URL('https://restaurant-two-gilt.vercel.app/api/foods');
    
    if (params?.category) {
      url.searchParams.append('category', params.category);
    }
    if (params?.search) {
      url.searchParams.append('search', params.search);
    }
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch foods: ${response.status}`);
    }
    
    const result: ApiResponse = await response.json();
    
    return Array.isArray(result?.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching foods:', error);
    return [];
  }
}
