import React from 'react';
import './service.css';
import Footer from '../footer';

const services = [
  {
    title: "24x7 Emergency Care",
    description: "Quick and reliable emergency support with fully-equipped ambulances and trained staff.",
    icon: "🚑",
  },
  {
    title: "Outpatient Department (OPD)",
    description: "Expert consultation and diagnosis by specialist doctors for all age groups.",
    icon: "🩺",
  },
  {
    title: "Pathology & Diagnostics",
    description: "Advanced lab facilities for accurate routine and specialized diagnostic tests.",
    icon: "🔬",
  },
  {
    title: "Pharmacy",
    description: "On-campus medical store, ensuring availability of all prescribed medicines.",
    icon: "💊",
  },
  {
    title: "Inpatient Department (IPD)",
    description: "Clean, safe, and comfortable wards and private rooms for patients requiring admission.",
    icon: "🏥",
  },
  {
    title: "Ambulance Service",
    description: "24x7 ambulance service for fast and safe patient transfer.",
    icon: "🚐",
  },
];

const Service = () => (
  <>
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-main-title">Our Premium Services</h2>
          <p className="services-subtitle">
            Comprehensive healthcare solutions with cutting-edge technology and compassionate care
          </p>
          <div className="title-underline"></div>
        </div>
        
        <div className="services-grid">
          {services.map((service, idx) => (
            <div className="service-card" key={idx}>
              <div className="card-background"></div>
              <div className="card-content">
                <div className="service-icon-container">
                  <span className="service-icon">{service.icon}</span>
                  <div className="icon-glow"></div>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-cta">
                  <span className="cta-text">Learn More</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="services-cta-section">
          <div className="cta-content">
            <h3>Need Emergency Assistance?</h3>
            <p>Our team is available 24/7 to provide immediate medical support</p>
            <button className="emergency-btn">
              <span className="btn-icon">📞</span>
              Call Emergency: 1-800-HELP
            </button>
          </div>
        </div>
      </div>
    </section>
    {/* <Footer/> */}
  </>
);

export default Service;