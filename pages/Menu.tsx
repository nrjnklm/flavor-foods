import React, { useState, useMemo } from 'react';
import { FoodCategory, FoodItem } from '../types';
import { CustomizationModal } from '../components/CustomizationModal';
import { AddItemModal } from '../components/AddItemModal';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';

export const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [itemToCustomize, setItemToCustomize] = useState<FoodItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { addToCart } = useCart();
  const { items, addMenuItem } = useMenu();

  // Dynamically calculate available categories from items + predefined enum
  const availableCategories = useMemo(() => {
    const itemCategories = new Set(items.map(item => item.category));
    // Ensure default enum categories are always present
    Object.values(FoodCategory).forEach(cat => itemCategories.add(cat));
    return Array.from(itemCategories);
  }, [items]);

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-center items-center mb-10 relative">
           <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">Our Menu</h1>
           <button 
            onClick={() => setIsAddModalOpen(true)}
            className="md:absolute md:right-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
           >
             <i className="fas fa-plus-circle"></i>
             <span>Add Your Dish</span>
           </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              selectedCategory === 'All'
                ? 'bg-brand-orange text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            All
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === category
                  ? 'bg-brand-orange text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <div className="h-48 overflow-hidden bg-gray-100 relative group">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold text-gray-800 leading-tight">{item.name}</h3>
                   <span className="bg-orange-100 text-brand-orange text-xs font-bold px-2 py-1 rounded uppercase">{item.category}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{item.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-brand-orange">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => setItemToCustomize(item)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Customize <i className="fas fa-chevron-right ml-1 text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {itemToCustomize && (
        <CustomizationModal
          item={itemToCustomize}
          isOpen={!!itemToCustomize}
          onClose={() => setItemToCustomize(null)}
          onAddToCart={addToCart}
        />
      )}

      <AddItemModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addMenuItem}
      />
    </div>
  );
};