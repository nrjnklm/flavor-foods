import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { cartCount } = useCart();
  const auth = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 group ${
          isActive ? 'text-brand-orange' : 'text-gray-600 hover:text-brand-orange'
        }`}
      >
        {children}
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-brand-orange transition-all duration-300 ease-out ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        ></span>
      </Link>
    );
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-2' : 'bg-white py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-brand-orange transition-colors duration-300">
                <i className="fas fa-utensils text-brand-orange text-lg group-hover:text-white transition-colors duration-300"></i>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-brand-orange transition-colors duration-300">
                FlavorCraft
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            {auth.token && (
              <>
                <NavLink to="/menu">Menu</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </>
            )}

            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200 h-8">
              {auth.token && (
                <Link to="/cart" className="relative p-2 text-gray-500 hover:text-brand-orange transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                    <i className="fas fa-shopping-bag text-lg"></i>
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-red rounded-full border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {!auth.token ? (
                <Link
                  to="/login"
                  className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-orange hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Login
                </Link>
              ) : (
                <button onClick={() => auth.logout()} className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors">
                  Logout
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden gap-4">
            <Link to="/cart" className="relative text-gray-600">
              <i className="fas fa-shopping-bag text-2xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-red rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-orange focus:outline-none"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-orange-50 transition-colors">
            <i className="fas fa-home w-6"></i> Home
          </Link>
          {!auth.token && (
            <>
              <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-orange-50 transition-colors">
                <i className="fas fa-utensils w-6"></i> Menu
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-orange-50 transition-colors">
                <i className="fas fa-info-circle w-6"></i> About
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-orange-50 transition-colors">
                <i className="fas fa-envelope w-6"></i> Contact
              </Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-orange-50 transition-colors">
                <i className="fas fa-shopping-bag w-6"></i> Cart
              </Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-brand-orange bg-orange-50 mt-4 border border-orange-100">
                <i className="fas fa-user-circle w-6"></i> Login / Sign Up
              </Link>
            </>
          )}
          {auth.token && (
            <div className="px-4 py-3">
              <button onClick={() => { auth.logout(); setIsMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl bg-gray-900 text-white">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};