import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../ContextProvider/CartContext';
import { IoMdCart } from 'react-icons/io';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
    navigate('/Login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg fixed w-full z-[60] top-0">
      <div className="container mx-auto flex items-center justify-between p-2">
        <Link to="/" className="text-gray-900 font-medium text-lg">
          <img className="w-24" src="./Logo.png" alt="Book Store" />
        </Link>

        <div className="hidden md:flex flex-grow space-x-4 justify-center">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link to="/addBook" className="hover:text-gray-900">
            Add Book
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4 relative">
          <Link
            to="/Cart"
            className="relative hover:text-gray-900 flex justify-center items-center"
          >
            <IoMdCart size={30} />
            <div className="absolute -top-1 right-1 bg-red-500 rounded-full h-4 w-4 text-black text-xs flex items-center justify-center">
              {cartCount}
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="hidden md:block text-gray-600 focus:outline-none"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col items-center py-4 space-y-2">
            <Link
              to="/"
              className="text-gray-900 font-medium hover:text-gray-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/addBook"
              className="text-gray-900 font-medium hover:text-gray-600"
              onClick={toggleMenu}
            >
              Add Book
            </Link>
            <Link
            to="/Cart"
            className="relative hover:text-gray-900 flex justify-center items-center"
          >
            <IoMdCart size={30} />
            <div className="absolute -top-1 right-1 bg-red-500 rounded-full h-4 w-4 text-black text-xs flex items-center justify-center">
              {cartCount}
            </div>
          </Link>
            <button
              onClick={handleLogout}
              className="text-gray-900 font-medium hover:text-gray-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
