// src/components/Banner.js

import React, { useEffect, useRef } from 'react';
import './banner.css'; // apni styling yaha import karo
import image1 from './image1.png'

const Banner = () => {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Add animation class after component mounts
    const timer = setTimeout(() => {
      if (bannerRef.current) {
        bannerRef.current.classList.add('loaded');
      }
      if (contentRef.current) {
        contentRef.current.classList.add('slide-in');
      }
      if (imageRef.current) {
        imageRef.current.classList.add('float-in');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="banner-container" ref={bannerRef}>
      {/* Animated background elements */}
      <div className="animated-bg">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="pulse-dot dot-1"></div>
        <div className="pulse-dot dot-2"></div>
      </div>

      <div className="banner-content" ref={contentRef}>
        <h1>
          <span className="title-line">Every Good Thing Starts</span>
          <span className="title-line">With Good Health</span>
        </h1>
        <p className="fade-in-text">
          We are here to serve people with patient-centric care, clinic specialists & <br />
          advanced medical technology for healthy tomorrow.
        </p>
        <div className="banner-buttons">
          <a href="/bookappointment" className="banner-btn primary pulse-hover">
            <span className="btn-text">Book Appointment</span>
            <span className="btn-icon">→</span>
          </a>
          <a href="/service" className="banner-btn secondary slide-hover">
            <span className="btn-text">Our Services</span>
            <span className="btn-icon">+</span>
          </a>
        </div>
        
        {/* Stats counter */}
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number" data-count="5000">4000+</div>
            <div className="stat-label">Happy Patients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="50">12</div>
            <div className="stat-label">Expert Doctors</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="15">10</div>
            <div className="stat-label">Years Experience</div>
          </div>
        </div>
      </div>
      
      <div className="banner-image" ref={imageRef}>
        {/* Doctor image with enhanced styling */}
        <div className="image-wrapper">
          <img src={image1} alt="Doctor" className="main-image" />
          <div className="image-glow"></div>
        </div>
        
        {/* Floating badges */}
        <div className="floating-badge badge-1">
          <span>24/7</span>
          <small>Emergency</small>
        </div>
        <div className="floating-badge badge-2">
          <span>99%</span>
          <small>Success Rate</small>
        </div>
      </div>
    </header>
  );
};

export default Banner;