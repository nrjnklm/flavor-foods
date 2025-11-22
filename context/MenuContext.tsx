import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FoodItem } from '../types';
import { MENU_ITEMS } from '../constants';

interface MenuContextType {
  items: FoodItem[];
  addMenuItem: (item: FoodItem) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<FoodItem[]>(MENU_ITEMS);

  const addMenuItem = (newItem: FoodItem) => {
    // Prepend the new item to the list so it shows up first
    setItems((prev) => [newItem, ...prev]);
  };

  return (
    <MenuContext.Provider value={{ items, addMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};