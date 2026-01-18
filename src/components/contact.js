import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [cname, setcname] = useState('')
  const [cemail, setcemail] = useState('')
  const [csubject, setcsubject] = useState('')
  const [cmessage, setcmessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

    // ✅ ENV BASE URL
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const sendMessage = async () => {
    if (!cname || !cemail || !cmessage) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const data = { cname, cemail, csubject, cmessage }
      const rest = await fetch(`${BASE_URL}/user/contact`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const result = await rest.json();
      
      if (result) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' })
        // Reset form
        setcname('')
        setcemail('')
        setcsubject('')
        setcmessage('')
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      details: "Green Park Plahi Road, Phagwara, Kapurthala (PB)",
      description: "Visit our state-of-the-art medical facility"
    },
    {
      icon: "📞",
      title: "Phone",
      details: "+91 98765 43210",
      description: "24/7 Emergency Helpline Available"
    },
    {
      icon: "✉️",
      title: "Email",
      details: "contact@gtbhospital.com",
      description: "We respond within 24 hours"
    },
    {
      icon: "🕒",
      title: "Working Hours",
      details: "Mon - Sat: 9:00 AM - 8:00 PM",
      description: "Emergency services available 24/7"
    }
  ]

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <h2 className="contact-main-title">Get In Touch With Us</h2>
          <p className="contact-subtitle">
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="contact-content">
          {/* Contact Information Cards */}
          <div className="contact-info-section">
            <div className="info-cards-grid">
              {contactInfo.map((info, index) => (
                <div className="info-card" key={index}>
                  <div className="card-icon">{info.icon}</div>
                  <div className="card-content">
                    <h3 className="card-title">{info.title}</h3>
                    <p className="card-details">{info.details}</p>
                    <p className="card-description">{info.description}</p>
                  </div>
                  <div className="card-background"></div>
                </div>
              ))}
            </div>

            {/* Emergency CTA */}
            <div className="emergency-cta">
              <div className="emergency-icon">🚨</div>
              <div className="emergency-content">
                <h3>Emergency Assistance</h3>
                <p>Immediate medical help available 24/7</p>
                <div className="emergency-number">+91 98765 43210</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-container">
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p>Fill out the form below and we'll get back to you promptly</p>
              </div>

              {/* Status Message */}
              {submitStatus && (
                <div className={`status-message ${submitStatus.type}`}>
                  <span className="status-icon">
                    {submitStatus.type === 'success' ? '✅' : '❌'}
                  </span>
                  {submitStatus.message}
                </div>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    value={cname}
                    onChange={(e) => setcname(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={cemail}
                    onChange={(e) => setcemail(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Enter message subject"
                    value={csubject}
                    onChange={(e) => setcsubject(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message" className="form-label">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    value={cmessage}
                    onChange={(e) => setcmessage(e.target.value)}
                    required
                    rows="6"
                    className="form-textarea"
                  ></textarea>
                </div>
              </div>

              <button 
                type="button" 
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                onClick={sendMessage}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">📨</span>
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <div className="section-header">
            <h3>Find Our Location</h3>
            <p>Visit us at our conveniently located medical facility</p>
          </div>
          <div className="map-container">
            <iframe
              title="Hospital Location"
              src="https://maps.google.com/maps?q=123%20Healthcare%20St&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              loading="lazy"
            ></iframe>
            <div className="map-overlay">
              <div className="overlay-content">
                <h4>GuruTeg Bahadur Hospital</h4>
                <p>Green Park Plahi Road, Phagwara</p>
                <p>Kapurthala 144401</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Options */}
    
      </div>
    </section>
  );
};

export default Contact;