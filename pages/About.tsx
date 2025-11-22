import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
             <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-yellow rounded-xl z-0"></div>
             <img 
               src="https://picsum.photos/id/431/600/400" 
               alt="Chefs cooking" 
               className="relative z-10 rounded-xl shadow-lg w-full"
             />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Passion on a Plate</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2020, FlavorCraft Foods started with a simple mission: to banish boring meals. We believe that fast food shouldn't mean fast shortcuts. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our chefs meticulously craft every recipe, blending traditional techniques with bold, modern flavors. Whether it's our 24-hour marinated smash burgers or our hand-tossed artisan pizzas, quality is our secret ingredient.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
           <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Makes Us Special</h2>
           <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                 <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                    <i className="fas fa-award text-brand-orange text-2xl"></i>
                 </div>
                 <h3 className="text-xl font-bold mb-2">Award Winning Taste</h3>
                 <p className="text-gray-600">Voted "Best Burger in Town" two years running by Local Eats.</p>
              </div>
              <div className="text-center">
                 <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                    <i className="fas fa-users text-brand-red text-2xl"></i>
                 </div>
                 <h3 className="text-xl font-bold mb-2">Community First</h3>
                 <p className="text-gray-600">We source 80% of our vegetables from local farmers within a 50-mile radius.</p>
              </div>
              <div className="text-center">
                 <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                    <i className="fas fa-magic text-brand-yellow text-2xl"></i>
                 </div>
                 <h3 className="text-xl font-bold mb-2">Customization</h3>
                 <p className="text-gray-600">Over 1,000 possible flavor combinations. Your meal, exactly your way.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};