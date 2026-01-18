import React from 'react';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "About Us", path: "/about", icon: "👥" },
    { name: "Service", path: "/service", icon: "🩺" },
    { name: "Doctors", path: "/doctors", icon: "👨‍⚕️" },
    { name: "Contact", path: "/contact", icon: "📞" },
    { name: "Appointments", path: "/appointments", icon: "📅" }
  ];

  const services = [
    "Emergency Care",
    "OPD Services",
    "Surgery",
    "Diagnostics",
    "Pharmacy",
    "Ambulance"
  ];

  const socialLinks = [
    { platform: "Facebook", icon: "📘", url: "#", color: "#1877F2" },
    { platform: "Twitter", icon: "🐦", url: "#", color: "#1DA1F2" },
    { platform: "Instagram", icon: "📸", url: "#", color: "#E4405F" },
    { platform: "LinkedIn", icon: "🔗", url: "#", color: "#0A66C2" },
    { platform: "YouTube", icon: "📺", url: "#", color: "#FF0000" }
  ];

  const contactInfo = [
    { icon: "📍", info: "Green Park plahi Road, Phagwara (144401), Kapurthala.(PB)" },
    { icon: "📞", info: "+91 98765 43210" },
    { icon: "📠", info: "+91 98765 43211" },
    { icon: "✉️", info: "info@gtbhospital.com" },
    { icon: "🌐", info: "www.gtbhospital.com" }
  ];

  return (
    <footer className="footer">
      <div className="footer-background"></div>
      
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-header">
              <div className="hospital-icon">🏥</div>
              <h3 className="brand-name">GTB Hospital</h3>
            </div>
            <p className="brand-tagline">
              Committed to providing compassionate healthcare with advanced technology and world-class medical expertise.
            </p>
            <div className="brand-stats">
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Patients Served</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <div className="links-grid">
              {quickLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.path} 
                  className="footer-link"
                >
                  <span className="link-icon">{link.icon}</span>
                  <span className="link-text">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="section-title">Our Services</h4>
            <div className="services-list">
              {services.map((service, index) => (
                <div key={index} className="service-item">
                  <span className="service-bullet">•</span>
                  <span className="service-name">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="section-title">Contact Info</h4>
            <div className="contact-list">
              {contactInfo.map((contact, index) => (
                <div key={index} className="contact-item">
                  <span className="contact-icon">{contact.icon}</span>
                  <span className="contact-info">{contact.info}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter & Social */}
          
        </div>

        {/* Emergency Banner */}
        <div className="emergency-banner">
          <div className="emergency-content">
            <div className="emergency-icon">🚨</div>
            <div className="emergency-text">
              <h4>24/7 Emergency Services</h4>
              <p>Immediate medical assistance available round the clock</p>
              <div className="emergency-contact">
                <span className="emergency-number">+91 98765 43210</span>
                <span className="emergency-arrow">➞</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              &copy; {currentYear} GTB Hospital. All rights reserved.
            </div>
            <div className="footer-links-bottom">
              <a href="/privacy" className="bottom-link">Privacy Policy</a>
              <a href="/terms" className="bottom-link">Terms of Service</a>
              <a href="/sitemap" className="bottom-link">Sitemap</a>
            </div>
            <div className="trust-badges">
              <span className="trust-badge">🏆 NABH Accredited</span>
              <span className="trust-badge">⭐ ISO Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <span className="arrow-up">↑</span>
      </button>
    </footer>
  );
};

export default Footer;