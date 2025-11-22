import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
            src="https://blog.swiggy.com/wp-content/uploads/2024/03/Biryani-2-1024x538.jpg" 
            alt="Delicious Food Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Craft Your <span className="text-brand-orange">Perfect</span> Meal
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Experience flavors like never before. Fresh ingredients, endless customizations, and delivered hot to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/menu" 
              className="bg-brand-orange text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:bg-orange-600 transform hover:-translate-y-1 transition-all"
            >
              Order Now
            </Link>
            <Link 
              to="/menu" 
              className="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-leaf text-brand-orange text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We source the finest produce daily to ensure every bite is bursting with freshness.</p>
            </div>
            <div className="p-6">
               <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-fire text-brand-red text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hot & Spicy</h3>
              <p className="text-gray-600">Customize your spice levels exactly how you like them. From mild to blazing hot.</p>
            </div>
            <div className="p-6">
               <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-truck text-brand-yellow text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Our swift delivery partners ensure your food arrives hot and on time.</p>
            </div>
          </div>
        </div>
      </section>

       {/* Promo Banner */}
       <section className="py-16 bg-brand-yellow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Hungry? Don't wait!</h2>
              <p className="text-gray-800 text-lg">Get 20% off your first order with code <span className="font-mono font-bold">FLAVOR20</span></p>
            </div>
            <Link 
              to="/menu" 
              className="bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
            >
              Grab Deal
            </Link>
          </div>
       </section>
    </div>
  );
};