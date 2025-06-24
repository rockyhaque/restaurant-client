export interface IFoodItem {
  _id?: string;
  title: string;
  img?: string;
  category: string;
  price: number;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IDishesProps {
  category?: string | string[];
  searchQuery?: string | string[];
}
