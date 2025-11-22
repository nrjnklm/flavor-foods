import { FoodCategory, FoodItem } from './types';

export const ADDONS = {
  CHEESE: { id: 'cheese', name: 'Extra Cheese', price: 1.5 },
  VEGGIES: { id: 'veggies', name: 'Extra Veggies', price: 1.0 },
  CHICKEN: { id: 'chicken', name: 'Extra Chicken', price: 2.5 },
  PANEER: { id: 'paneer', name: 'Extra Paneer', price: 2.0 },
  DIP: { id: 'dip', name: 'Spicy Dip', price: 0.5 },
};

export const MENU_ITEMS: FoodItem[] = [
  // Burgers
  {
    id: 'b1',
    name: 'Classic Smash Burger',
    description: 'Juicy beef patty with cheddar, lettuce, tomato, and house sauce.',
    price: 8.99,
    image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg',
    category: FoodCategory.Burgers,
    availableAddOns: [ADDONS.CHEESE, ADDONS.VEGGIES, ADDONS.CHICKEN],
    hasSpiceOption: true,
    hasCookingStyleOption: true,
  },
  {
    id: 'b2',
    name: 'Spicy Chicken Crisp',
    description: 'Crispy fried chicken breast with spicy mayo and pickles.',
    price: 7.99,
    image: 'https://media.istockphoto.com/id/835903320/photo/baked-chicken-wings-with-sesame-seeds-and-sweet-chili-sauce-on-white-wooden-board.jpg?s=612x612&w=0&k=20&c=SH8ZCkEKuWD_wxulpntIJ0uD4yRnUf9UXovQwSwrmmA=',
    category: FoodCategory.Burgers,
    availableAddOns: [ADDONS.CHEESE, ADDONS.DIP],
    hasSpiceOption: true,
    hasCookingStyleOption: false,
  },    
  // Pizzas
  {
    id: 'p1',
    name: 'Margherita Supreme',
    description: 'Fresh basil, mozzarella, and san marzano tomato sauce.',
    price: 12.99,
    image: 'https://kashichat.com/wp-content/uploads/2025/04/4b726afb-6e8b-4b0f-88a9-07efbe649545-450x450.jpeg',
    category: FoodCategory.Pizzas,
    availableAddOns: [ADDONS.CHEESE, ADDONS.VEGGIES],
    hasSpiceOption: true,
    hasCookingStyleOption: false,
  },
  {
    id: 'p2',
    name: 'BBQ Chicken Feast',
    description: 'Grilled chicken, red onions, cilantro, and tangy BBQ sauce.',
    price: 14.99,
    image: 'https://media.istockphoto.com/id/822933854/photo/bbq-chicken-feast.jpg?s=612x612&w=0&k=20&c=3d62z8rHbFP9MauXON5QU6NMq3HZq9JFP_1McVmm2Oo=',
    category: FoodCategory.Pizzas,
    availableAddOns: [ADDONS.CHEESE, ADDONS.CHICKEN, ADDONS.DIP],
    hasSpiceOption: true,
    hasCookingStyleOption: false,
  },
  // Biriyani
  {
    id: 'bi1',
    name: 'Hyderabadi Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken and spices.',
    price: 11.99,
    image: 'https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg',
    category: FoodCategory.Biriyani,
    availableAddOns: [ADDONS.CHICKEN, ADDONS.DIP],
    hasSpiceOption: true,
    hasCookingStyleOption: false,
  },
  // Desserts
  {
    id: 'd1',
    name: 'Molten Lava Cake',
    description: 'Rich chocolate cake with a gooey center, served with vanilla ice cream.',
    price: 6.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnuNMk8sS39SNEGW_8iNF6LwCp6H2u85nvzQ&s',
    category: FoodCategory.Desserts,
    availableAddOns: [],
    hasSpiceOption: false,
    hasCookingStyleOption: false,
  },
  // Beverages
  {
    id: 'bev1',
    name: 'Tropical Mango Smoothie',
    description: 'Fresh mango blended with yogurt and a hint of honey.',
    price: 4.99,
    image: 'https://www.worldofvegan.com/wp-content/uploads/2020/05/mango-banana-smoothie.jpg',
    category: FoodCategory.Beverages,
    availableAddOns: [],
    hasSpiceOption: false,
    hasCookingStyleOption: false,
  },
];
