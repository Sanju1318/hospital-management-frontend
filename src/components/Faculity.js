import React from 'react';
import './faculity.css';

const facilities = [
  { name: "Beds", desc: "Well-maintained and comfortable patient beds.", icon: "🛏️" },
  { name: "Nebulizer", desc: "Nebulizer machines for respiratory care.", icon: "💨" },
  { name: "ECG Machine", desc: "Advanced ECG machines for heart monitoring.", icon: "🫀" },
  { name: "Oxygen Supply", desc: "Dedicated oxygen supply in all wards.", icon: "🫁" },
  { name: "Wheelchairs", desc: "Easy access wheelchairs for mobility support.", icon: "🦽" },
  { name: "Ventilators", desc: "Critical care ventilators for emergencies.", icon: "🔌" },
  { name: "Path Lab", desc: "Modern pathology lab for all major tests.", icon: "🧪" },
  { name: "Pharmacy", desc: "24x7 in-house medical shop.", icon: "💊" },
];

const Faculity = () => (
  <section className="facilities-section">
    <div className="facilities-container">
      <div className="facilities-header">
        <h2 className="facilities-main-title">Our Advanced Facilities</h2>
        <p className="facilities-subtitle">
          State-of-the-art medical equipment and infrastructure for comprehensive patient care
        </p>
        <div className="title-underline"></div>
      </div>
      
      <div className="facility-card-wrap">
        {facilities.map((f, idx) => (
          <div className="facility-card" key={idx}>
            <div className="card-background-effect"></div>
            <div className="card-inner-content">
              <div className="icon-container">
                <span className="facility-icon">{f.icon}</span>
                <div className="icon-glow"></div>
                <div className="icon-pulse"></div>
              </div>
              <h3 className="facility-title">{f.name}</h3>
              <p className="facility-desc">{f.desc}</p>
              <div className="facility-cta">
                <span className="cta-text">Explore</span>
                <span className="cta-arrow">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="facilities-cta">
        <div className="cta-content">
          <h3>World-Class Medical Infrastructure</h3>
          <p>Equipped with cutting-edge technology and maintained by expert technicians</p>
        </div>
      </div>
    </div>
  </section>
);

export default Faculity;