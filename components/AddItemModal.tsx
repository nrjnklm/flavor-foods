import React, { useState } from 'react';
import { FoodCategory, FoodItem } from '../types';
import { ADDONS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: FoodItem) => void;
}

export const AddItemModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: FoodCategory.Burgers as string, // Allow string for custom categories
    image: '',
    hasSpiceOption: false,
  });
  
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: FoodItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      image: formData.image || `https://source.unsplash.com/400x300/?${formData.category.toLowerCase()},food`,
      availableAddOns: [ADDONS.CHEESE, ADDONS.VEGGIES], // Default add-ons for custom items
      hasSpiceOption: formData.hasSpiceOption,
      hasCookingStyleOption: false,
    };

    onAdd(newItem);
    onClose();
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: FoodCategory.Burgers,
      image: '',
      hasSpiceOption: false,
    });
    setIsCustomCategory(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
        <div className="bg-gray-900 p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white">
                <i className="fas fa-plus"></i>
             </div>
             <h2 className="text-white text-xl font-bold">Add Your Creation</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto no-scrollbar">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Dish Name</label>
            <input
              required
              type="text"
              className="w-full border-gray-300 bg-gray-100 rounded-lg p-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all shadow-inner"
              placeholder="e.g. Ultimate Cheese Blast"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
            <div className="flex gap-2">
              {isCustomCategory ? (
                <input
                  required
                  type="text"
                  className="flex-grow border-gray-300 bg-gray-100 rounded-lg p-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all shadow-inner"
                  placeholder="Enter new category..."
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              ) : (
                <div className="relative flex-grow">
                  <select
                    className="w-full border-gray-300 bg-gray-100 rounded-lg p-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all shadow-inner appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {Object.values(FoodCategory).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>
              )}
              
              <button
                type="button"
                onClick={() => {
                  setIsCustomCategory(!isCustomCategory);
                  // Reset category if switching modes
                  if (!isCustomCategory) {
                    setFormData({ ...formData, category: '' });
                  } else {
                    setFormData({ ...formData, category: FoodCategory.Burgers });
                  }
                }}
                className={`w-12 shrink-0 rounded-lg border flex items-center justify-center transition-colors ${
                  isCustomCategory 
                    ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100' 
                    : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-brand-orange'
                }`}
                title={isCustomCategory ? "Cancel custom category" : "Add new category"}
              >
                <i className={`fas ${isCustomCategory ? 'fa-times' : 'fa-plus'}`}></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold">$</span>
                </div>
                <input
                  required
                  type="number"
                  step="0.01"
                  className="w-full pl-8 border-gray-300 bg-gray-100 rounded-lg p-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all shadow-inner"
                  placeholder="9.99"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>
             <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Image URL (Optional)</label>
              <input
                type="text"
                className="w-full border-gray-300 bg-gray-100 rounded-lg p-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all shadow-inner"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Description / Your Opinion</label>
            <textarea
              required
              rows={3}
              className="w-full border-gray-300 bg-gray-100 rounded-lg p-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all shadow-inner"
              placeholder="Describe the flavors, textures, and why this dish is amazing..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex items-center space-x-3">
            <input
              type="checkbox"
              id="spiceOption"
              checked={formData.hasSpiceOption}
              onChange={(e) => setFormData({ ...formData, hasSpiceOption: e.target.checked })}
              className="h-5 w-5 text-brand-orange focus:ring-brand-orange border-gray-300 rounded"
            />
            <label htmlFor="spiceOption" className="text-sm font-medium text-gray-800 cursor-pointer select-none">Available in different spice levels?</label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-brand-orange text-white font-bold py-4 rounded-xl hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Add to Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};