import React, { useState, useEffect } from 'react';
import { FoodItem, SpiceLevel, CookingStyle, AddOn, CartItem } from '../types';
import { getChefSuggestion } from '../services/geminiService';

interface Props {
  item: FoodItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomizationModal: React.FC<Props> = ({ item, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [spice, setSpice] = useState<SpiceLevel>(SpiceLevel.Medium);
  const [cookingStyle, setCookingStyle] = useState<CookingStyle>(CookingStyle.Grilled);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [chefTip, setChefTip] = useState<string>("");
  const [loadingTip, setLoadingTip] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens for a new item
      setQuantity(1);
      setSpice(SpiceLevel.Medium);
      setCookingStyle(CookingStyle.Grilled);
      setSelectedAddOns([]);
      setChefTip("");
    }
  }, [isOpen, item]);

  const toggleAddOn = (addon: AddOn) => {
    if (selectedAddOns.find(a => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const calculateTotal = () => {
    const addOnsCost = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    return (item.price + addOnsCost) * quantity;
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...item,
      cartId: Math.random().toString(36).substr(2, 9),
      selectedSpice: item.hasSpiceOption ? spice : undefined,
      selectedCookingStyle: item.hasCookingStyleOption ? cookingStyle : undefined,
      selectedAddOns,
      quantity,
      totalPrice: calculateTotal(),
    };
    onAddToCart(cartItem);
    onClose();
  };

  const fetchChefTip = async () => {
    setLoadingTip(true);
    const tip = await getChefSuggestion(item);
    setChefTip(tip);
    setLoadingTip(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header Image */}
        <div className="h-48 bg-gray-200 relative shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-gray-800 hover:bg-white transition-all shadow-md"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="p-6 overflow-y-auto no-scrollbar flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
            <span className="text-2xl font-bold text-brand-orange">${calculateTotal().toFixed(2)}</span>
          </div>
          <p className="text-gray-600 mb-6">{item.description}</p>

          {/* AI Chef Button */}
          <div className="mb-6 bg-orange-50 p-4 rounded-xl border border-orange-100">
             <div className="flex items-start gap-3">
                <div className="bg-brand-orange text-white p-2 rounded-full shrink-0">
                    <i className="fas fa-robot"></i>
                </div>
                <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">Chef's AI Assistant</h3>
                    {chefTip ? (
                        <p className="text-sm text-gray-700 mt-1 italic">"{chefTip}"</p>
                    ) : (
                        <p className="text-sm text-gray-500 mt-1">Not sure what to choose? Ask our AI Chef!</p>
                    )}
                    {!chefTip && (
                         <button 
                         onClick={fetchChefTip}
                         disabled={loadingTip}
                         className="mt-2 text-sm text-brand-orange font-medium hover:underline flex items-center gap-1"
                       >
                         {loadingTip ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sparkles"></i>}
                         Get Recommendation
                       </button>
                    )}
                </div>
             </div>
          </div>

          <div className="space-y-6">
            {/* Spice Level */}
            {item.hasSpiceOption && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Spice Level</h3>
                <div className="flex gap-3">
                  {Object.values(SpiceLevel).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSpice(level)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                        spice === level
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cooking Style */}
            {item.hasCookingStyleOption && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Cooking Style</h3>
                <div className="flex gap-3">
                  {Object.values(CookingStyle).map((style) => (
                    <button
                      key={style}
                      onClick={() => setCookingStyle(style)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                        cookingStyle === style
                          ? 'bg-brand-yellow text-gray-900 border-brand-yellow'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-brand-yellow'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add Ons */}
            {item.availableAddOns.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Extra Toppings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.availableAddOns.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`flex justify-between items-center p-3 rounded-lg border transition-all ${
                        selectedAddOns.find((a) => a.id === addon.id)
                          ? 'border-brand-orange bg-orange-50'
                          : 'border-gray-200 hover:border-orange-200'
                      }`}
                    >
                      <span className="text-gray-700">{addon.name}</span>
                      <span className="text-sm font-bold text-gray-500">+{addon.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions - Sticky */}
        <div className="border-t p-4 bg-gray-50 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="px-4 font-semibold text-gray-800 w-12 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-grow bg-brand-orange text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors shadow-lg transform hover:-translate-y-0.5"
            >
              Add to Order - ${calculateTotal().toFixed(2)}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};