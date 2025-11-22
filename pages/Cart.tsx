import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { UserDetails } from '../types';

export const Cart: React.FC = () => {
  const { items, removeFromCart, cartTotal, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'COD',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    clearCart();
  };

  if (checkoutStep === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-green-500 text-4xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {userDetails.name}. Your order has been received and will be with you shortly.
          </p>
          <Link to="/" className="bg-brand-orange text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && checkoutStep === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-shopping-basket text-gray-400 text-4xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/menu" className="bg-brand-orange text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors">
          Start Ordering
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Left Column: Cart Items or Form */}
          <div className="lg:col-span-7">
            {checkoutStep === 'cart' ? (
              <>
                <div className="flex justify-between items-center mb-6">
                   <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                   <span className="text-sm text-gray-500">{items.length} items</span>
                </div>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.cartId} className="bg-white rounded-xl p-4 shadow-sm flex gap-4 border border-gray-100">
                      <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <p className="font-bold text-brand-orange">${item.totalPrice.toFixed(2)}</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Qty: {item.quantity} | 
                            {item.selectedSpice && ` ${item.selectedSpice} Spice |`}
                            {item.selectedCookingStyle && ` ${item.selectedCookingStyle}`}
                          </p>
                          {item.selectedAddOns.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              + {item.selectedAddOns.map(a => a.name).join(', ')}
                            </p>
                          )}
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-red-500 text-sm font-medium hover:text-red-600 self-start mt-2 flex items-center"
                        >
                          <i className="fas fa-trash-alt mr-1"></i> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                 <div className="flex items-center mb-6">
                   <button onClick={() => setCheckoutStep('cart')} className="text-gray-500 hover:text-brand-orange mr-4">
                     <i className="fas fa-arrow-left"></i>
                   </button>
                   <h1 className="text-2xl font-bold text-gray-900">Delivery Details</h1>
                 </div>
                 <form id="checkout-form" onSubmit={handleCheckout} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 border p-3 focus:ring-brand-orange focus:border-brand-orange" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 border p-3 focus:ring-brand-orange focus:border-brand-orange" 
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                      <textarea 
                        required 
                        name="address"
                        value={userDetails.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full rounded-lg border-gray-300 border p-3 focus:ring-brand-orange focus:border-brand-orange" 
                        placeholder="123 Food Street, Apt 4B..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <select 
                        name="paymentMethod"
                        value={userDetails.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 border p-3 focus:ring-brand-orange focus:border-brand-orange"
                      >
                        <option value="COD">Cash on Delivery</option>
                        <option value="Online">Credit Card / Online (Mock)</option>
                      </select>
                    </div>
                 </form>
              </>
            )}
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Delivery Fee</dt>
                    <dd className="font-medium text-gray-900">$5.00</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between border-t border-gray-200">
                    <dt className="text-base font-bold text-gray-900">Order Total</dt>
                    <dd className="text-xl font-bold text-brand-orange">${(cartTotal + 5).toFixed(2)}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6">
                {checkoutStep === 'cart' ? (
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="w-full bg-brand-orange text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};