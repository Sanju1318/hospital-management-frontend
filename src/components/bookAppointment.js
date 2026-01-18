import React, { useState } from "react";
import "./BookAppointment.css";

function BookAppointment() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [leadership, setDoctor] = useState(''); // doctor ID
  const [adddate, setDate] = useState('');
  const [appointmentTime, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

    const BASE_URL = process.env.REACT_APP_API_BASE_URL;


 const submit = async () => {
  if (!name || !phone || !email || !leadership || !adddate || !appointmentTime) {
    setSubmitStatus({ type: 'error', message: 'Please fill all fields' });
    return;
  }

  setIsSubmitting(true);

  try {
    const data = {
      name,
      phone,
      email,
      leadershipId: Number(leadership),
      adddate: adddate,                 // YYYY-MM-DD
      appointmentTime: appointmentTime // HH:mm
    };

    const response = await fetch(`${BASE_URL}/user/apnt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error();

    await response.json();

    setSubmitStatus({
      type: 'success',
      message: 'Appointment booked successfully'
    });

    setName('');
    setPhone('');
    setEmail('');
    setDoctor('');
    setDate('');
    setTime('');

  } catch {
    setSubmitStatus({ type: 'error', message: 'Booking failed' });
  } finally {
    setIsSubmitting(false);
  }
};


  const appointmentFeatures = [
    { icon: "⏰", title: "Quick Booking", description: "Book your appointment in just a few clicks" },
    { icon: "👨‍⚕️", title: "Expert Doctors", description: "Consult with our experienced specialists" },
    { icon: "📱", title: "Instant Confirmation", description: "Get immediate booking confirmation" },
    { icon: "🔄", title: "Easy Rescheduling", description: "Flexible appointment changes" }
  ];

  return (
    <div className="appointment-section">
      <div className="appointment-container">
        {/* Header */}
        <div className="appointment-header">
          <h2 className="appointment-main-title">Book Your Appointment</h2>
          <p className="appointment-subtitle">
            Schedule your visit with our expert medical team. We're here to provide you with the best care.
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="appointment-content">
          {/* Features */}
          <div className="features-section">
            <div className="features-grid">
              {appointmentFeatures.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-desc">{feature.description}</p>
                  <div className="feature-background"></div>
                </div>
              ))}
            </div>

            {/* Emergency */}
            <div className="emergency-banner">
              <div className="emergency-content">
                <div className="emergency-icon">🚨</div>
                <div className="emergency-text">
                  <h3>Need Immediate Care?</h3>
                  <p>Emergency services available 24/7</p>
                  <div className="emergency-number">+91 98765 43210</div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="appointment-form-container">
            <div className="form-wrapper">
              <div className="form-header">
                <h3>Schedule Your Visit</h3>
                <p>Fill out the form below and we'll get back to you promptly</p>
              </div>

              {submitStatus && (
                <div className={`status-message ${submitStatus.type}`}>
                  <span className="status-icon">{submitStatus.type === 'success' ? '✅' : '❌'}</span>
                  {submitStatus.message}
                </div>
              )}

              <div className="appointment-form">
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name <span className="required">*</span></label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-input"/>
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number <span className="required">*</span></label>
                  <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input"/>
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address <span className="required">*</span></label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input"/>
                </div>

                {/* Doctor ID */}
                <div className="form-group">
                  <label htmlFor="doctor" className="form-label">Select Doctor <span className="required">*</span></label>
                  <select id="doctor" value={leadership} onChange={(e) => setDoctor(e.target.value)} className="form-input">
                    <option value="">Select Doctor</option>
                    <option value="1">Dr. Sharma</option>
                    <option value="2">Dr. Khan</option>
                    <option value="3">Dr. Patel</option>
                    <option value="4">Dr. Gupta</option>
                  </select>
                </div>

                {/* Date & Time */}
                <div className="form-group">
                  <label htmlFor="date" className="form-label">Preferred Date <span className="required">*</span></label>
                  <input type="date" id="date" value={adddate} onChange={(e) => setDate(e.target.value)} className="form-input"/>
                </div>
                <div className="form-group">
                  <label htmlFor="time" className="form-label">Preferred Time <span className="required">*</span></label>
                  <input type="time" id="time" value={appointmentTime} onChange={(e) => setTime(e.target.value)} className="form-input"/>
                </div>

                <button type="button" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} onClick={submit} disabled={isSubmitting}>
                  {isSubmitting ? <> <span className="loading-spinner"></span> Booking Appointment... </> : <> <span className="btn-icon">📅</span> Book Appointment Now </>}
                </button>
              </div>

              <div className="form-footer">
                <p className="footer-note"><span className="note-icon">ℹ️</span> We'll confirm your appointment via email and SMS within 2 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-card">
            <div className="info-icon">🏥</div>
            <div className="info-content">
              <h4>What to Bring</h4>
              <ul>
                <li>Previous medical records</li>
                <li>Insurance information</li>
                <li>Government ID proof</li>
                <li>List of current medications</li>
              </ul>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">⏱️</div>
            <div className="info-content">
              <h4>Before Your Visit</h4>
              <ul>
                <li>Arrive 15 minutes early</li>
                <li>Bring relevant test reports</li>
                <li>Note down your symptoms</li>
                <li>Prepare questions for the doctor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
