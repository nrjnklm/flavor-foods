export enum FoodCategory {
  Burgers = 'Burgers',
  Pizzas = 'Pizzas',
  Biriyani = 'Biriyani',
  Desserts = 'Desserts',
  Beverages = 'Beverages',
}

export enum SpiceLevel {
  Mild = 'Mild',
  Medium = 'Medium',
  Hot = 'Hot',
}

export enum CookingStyle {
  Fried = 'Fried',
  Grilled = 'Grilled',
  Baked = 'Baked',
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: FoodCategory | string;
  availableAddOns: AddOn[];
  hasSpiceOption: boolean;
  hasCookingStyleOption: boolean;
}

export interface CartItem extends FoodItem {
  cartId: string;
  selectedSpice?: SpiceLevel;
  selectedCookingStyle?: CookingStyle;
  selectedAddOns: AddOn[];
  quantity: number;
  totalPrice: number;
}

export interface UserDetails {
  name: string;
  phone: string;
  address: string;
  paymentMethod: 'COD' | 'Online';
}