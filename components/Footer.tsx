import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t-4 border-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          
          {/* Logo Section */}
          <div className="flex items-center justify-center bg-gray-800 p-4 rounded-full shadow-lg mb-2">
             <i className="fas fa-utensils text-brand-orange text-2xl mr-3"></i>
             <span className="font-bold text-2xl tracking-tight text-white">FlavorCraft</span>
          </div>

          {/* Copyright Text */}
          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium tracking-wide">
              &copy; {new Date().getFullYear()} FlavorCraft Foods. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Designed with <i className="fas fa-heart text-brand-red mx-1"></i> for food lovers.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};