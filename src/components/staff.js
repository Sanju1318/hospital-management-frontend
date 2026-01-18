import React, { useEffect, useState } from 'react';
import './staff.css';

const Staff = () => {
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use environment variable as base URL
  const API_URL = process.env.REACT_APP_API_URL;

  const findStaff = async () => {
    try {
      const response = await fetch(`${API_URL}/staff`, { method: 'GET' });
      const data = await response.json();

      if (data) {
        setShow(data);
      } else {
        alert("Internal error");
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
      alert("Failed to load staff data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findStaff();
  }, []);

  if (loading) {
    return (
      <section className="staff-section">
        <div className="staff-container">
          {[...Array(6)].map((_, index) => (
            <div className="staff-card loading" key={index}>
              <div className="staff-image-skeleton"></div>
              <div className="staff-info-skeleton">
                <div className="skeleton-line name"></div>
                <div className="skeleton-line qualification"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="staff-section">
      <div className="staff-header">
        <h2 className="staff-main-title">Our Expert Medical Team</h2>
        <p className="staff-subtitle">
          Meet our dedicated healthcare professionals committed to your well-being
        </p>
        <div className="title-underline"></div>
      </div>

      <div className="staff-container">
        {show.map((staff, index) => (
          <div className="staff-card" key={index}>
            <div className="card-inner">
              <div className="image-container">
                <img
                  src={`${API_URL}/staff/image/${staff.imagename}`}
                  alt={staff.sname}
                  className="staff-image"
                  loading="lazy"
                />
                <div className="image-overlay"></div>
                <div className="social-links">
                  <span className="social-icon">👁️</span>
                  <span className="social-icon">📞</span>
                  <span className="social-icon">✉️</span>
                </div>
              </div>

              <div className="staff-info">
                <h3 className="staff-name">{staff.sname}</h3>
                <p className="staff-qualification">{staff.qualification}</p>
                <div className="staff-expertise">
                  <span className="expertise-tag">Expert</span>
                  <span className="experience-tag">5+ Years</span>
                </div>
              </div>

              <div className="card-background"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="staff-cta">
        <div className="cta-content">
          <h3>Need Specialized Care?</h3>
          <p>Our team of specialists is here to provide personalized treatment plans</p>
        </div>
      </div>
    </section>
  );
};

export default Staff;
