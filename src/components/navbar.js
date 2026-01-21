// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import './navbar.css'; // CSS file for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar-container ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-background"></div>
        
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">🏥</div>
            <h2>GTB Hospital</h2>
          </div>

          <div className={`nav-items ${isMobileMenuOpen ? 'active' : ''}`}>
            <div className="nav-links">
              <a href="/" className="nav-link" onClick={closeMobileMenu}>
                <span className="link-text">Home</span>
                <span className="link-underline"></span>
              </a>
              <Link to="/service" className="nav-link" onClick={closeMobileMenu}>
                <span className="link-text">Services</span>
                <span className="link-underline"></span>
              </Link>
              <Link to="/doctor" className="nav-link" onClick={closeMobileMenu}>
                <span className="link-text">Doctors</span>
                <span className="link-underline"></span>
              </Link>
              <Link to="/about" className="nav-link" onClick={closeMobileMenu}>
                <span className="link-text">About</span>
                <span className="link-underline"></span>
              </Link>
              <Link to="/contact" className="nav-link" onClick={closeMobileMenu}>
                <span className="link-text">Contact</span>
                <span className="link-underline"></span>
              </Link>
              
            </div>

            <div className="nav-actions-mobile">
              <Link to="/hospitalauth" className="login-btn mobile" onClick={closeMobileMenu}>
               <span className="btn-icon">👤</span>
                Login
            
              </Link> 
            </div>
          </div>

          <div className="nav-actions">
            <Link to="/hospitalauth" className="login-btn">
              <span className="btn-icon">👤</span>
              Login
             </Link> 
          </div>

          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>
    </>
  );
};

export default Navbar;