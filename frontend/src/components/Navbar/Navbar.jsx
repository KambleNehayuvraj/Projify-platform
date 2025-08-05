import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './navbar.css';
import Login from '../Login/login';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProjects = (e) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Scroll to the "Choose Your Project Type" section
    const projectTypeSection = document.getElementById('project-type-section');
    if (projectTypeSection) {
      projectTypeSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If section doesn't exist on current page, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById('project-type-section');
        if (section) {
          section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close profile dropdown when mobile menu opens
    setShowProfileDropdown(false);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsMenuOpen(false);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    // Recheck auth status after login modal closes
    setTimeout(() => {
      checkAuthStatus();
    }, 100);
  };

  const handleCartClick = () => {
    navigate('/cart');
    setIsMenuOpen(false);
    setShowProfileDropdown(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsMenuOpen(false);
    setShowProfileDropdown(false);
  };

  const handleOrdersClick = () => {
    navigate('/orders');
    setIsMenuOpen(false);
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Update state
    setIsAuthenticated(false);
    setUser(null);
    setShowProfileDropdown(false);
    setIsMenuOpen(false);
    
    // Redirect to home
    navigate('/');
    
    // Optional: Show logout message
    console.log('Logged out successfully');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Brand */}
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="currentColor" className="logo-icon">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <span className="brand-name">Progify</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <a href="/" className="nav-link">Home</a>
          <a href="#" className="nav-link" onClick={handleProjects}>Projects</a>
          <a href="/order-project" className="nav-link">Order Project</a>
          <a href="/how-it-works" className="nav-link">How It Works</a>
          <a href="/about" className="nav-link">About Us</a>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Cart Button */}
          <button className="cart-btn" onClick={handleCartClick} title="Shopping Cart">
            <svg viewBox="0 0 24 24" fill="currentColor" className="cart-icon">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
            </svg>
            {getCartItemsCount() > 0 && (
              <span className="cart-badge">{getCartItemsCount()}</span>
            )}
          </button>

          {/* Authentication Section */}
          {isAuthenticated ? (
            <div className="auth-section">
              {/* Orders Button */}
              <button className="orders-btn" onClick={handleOrdersClick} title="My Orders">
                <svg viewBox="0 0 24 24" fill="currentColor" className="orders-icon">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"/>
                  <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z"/>
                </svg>
              </button>

              {/* Profile Dropdown */}
              <div className="profile-dropdown-container" ref={dropdownRef}>
                <button className="profile-btn" onClick={toggleProfileDropdown} title="Profile">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="profile-icon">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                  </svg>
                </button>

                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <span className="user-name">{user?.name || user?.username || 'User'}</span>
                      <span className="user-email">{user?.email}</span>
                    </div>
                    <div className="profile-dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleOrdersClick}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="dropdown-icon">
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"/>
                        <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z"/>
                      </svg>
                      My Orders
                    </button>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="dropdown-icon">
                        <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button className="login-btn" onClick={openLogin}>Login</button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <a href="/" className="mobile-nav-link" onClick={toggleMenu}>Home</a>
        <a href="#" className="mobile-nav-link" onClick={handleProjects}>Projects</a>
        <a href="/order-project" className="mobile-nav-link" onClick={toggleMenu}>Order Project</a>
        <a href="/how-it-works" className="mobile-nav-link" onClick={toggleMenu}>How It Works</a>
        <a href="/about" className="mobile-nav-link" onClick={toggleMenu}>About Us</a>
        
        {/* Mobile Cart Button */}
        <button className="mobile-cart-btn" onClick={handleCartClick}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="cart-icon">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
            <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
          </svg>
          Cart ({getCartItemsCount()})
        </button>
        
        {/* Mobile Auth Section */}
        {isAuthenticated ? (
          <div className="mobile-auth-section">
            <div className="mobile-user-info">
              <span className="mobile-user-name">{user?.name || user?.username || 'User'}</span>
              <span className="mobile-user-email">{user?.email}</span>
            </div>
            <button className="mobile-profile-btn" onClick={handleProfileClick}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="mobile-icon">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
              </svg>
              Profile
            </button>
            <button className="mobile-orders-btn" onClick={handleOrdersClick}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="mobile-icon">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"/>
                <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z"/>
              </svg>
              My Orders
            </button>
            <button className="mobile-logout-btn" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="mobile-icon">
                <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"/>
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <button className="mobile-login-btn" onClick={openLogin}>Login</button>
        )}
      </div>

      {/* Login Modal */}
      <Login 
        isOpen={isLoginOpen}
        onClose={closeLogin}
      />
    </nav>
  );
};

export default Navbar;