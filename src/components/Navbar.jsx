import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/authStore';
import { getCurrentUser } from "../utils/getCurrentUser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setUserInfo, clearUserInfo } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate('/')
  useEffect(() => {
    const getUser = async () => {
      try {
        
        const data = await getCurrentUser()
        // console.log(data)
        if (data.statusCode === 200) {
          setIsLoggedIn(true);
          setUserInfo(data.data.user);
        //   console.log(isLoggedIn)
        }
      } catch (error) {
        toast.error('Error fetching user:', error);
      }
    };

    getUser();
  }, [setIsLoggedIn, setUserInfo]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        toast.success('Logout Successfull', {
            autoClose: 3000,
            theme: "dark",
        });

        setTimeout(() => {
            setIsLoggedIn(false);
            clearUserInfo();
            navigate('/')
          }, 2000);
        
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      {/* Desktop Navigation */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          Template Builder
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Browse Templates
          </Link>
          {isLoggedIn && (
            <Link 
              to="/user-templates" 
              className="text-gray-300 hover:text-white transition duration-200"
            >
              My Templates
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 space-y-3 border-t border-gray-700">
          <Link 
            to="/" 
            className="block text-gray-300 hover:text-white transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Templates
          </Link>
          {isLoggedIn && (
            <Link 
              to="/user-templates" 
              className="block text-gray-300 hover:text-white transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              My Templates
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium text-center transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;