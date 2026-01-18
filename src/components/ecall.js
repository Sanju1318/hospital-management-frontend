import React, { useState } from 'react';
import './ecall.css';

const Ecall = () => {
  const [formData, setFormData] = useState({
    priorityLevel: 'critical',
    patientSituation: '',
    patientName: '',
    contactNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Emergency Alert:', formData);
    alert('🚨 EMERGENCY ALERT SENT! Medical team notified!');
  };

  // Call functionality
  const callEmergency = () => {
    window.open('tel:911');
  };

  const callAmbulance = () => {
    window.open('tel:102');
  };

  const callHospital = () => {
    window.open('tel:+1234567890');
  };

  return (
    <div className="critical-form-container">
      {/* Emergency Header */}
      <div className="critical-header">
        <div className="header-alert">
          <div className="alert-icon">🚨</div>
          <div className="alert-text">
            <h1>CRITICAL EMERGENCY</h1>
            <p>IMMEDIATE MEDICAL ATTENTION REQUIRED</p>
          </div>
        </div>
      </div>

      {/* Emergency Call Buttons */}
      <div className="emergency-call-section">
        <div className="call-buttons-grid">
          <button className="call-btn emergency-call" onClick={callEmergency}>
            <span className="call-icon">📞</span>
            <span className="call-text">CALL 911</span>
            <span className="call-subtext">Emergency</span>
          </button>
          
          <button className="call-btn ambulance-call" onClick={callAmbulance}>
            <span className="call-icon">🚑</span>
            <span className="call-text">CALL AMBULANCE</span>
            <span className="call-subtext">Medical Transport</span>
          </button>
          
          <button className="call-btn hospital-call" onClick={callHospital}>
            <span className="call-icon">🏥</span>
            <span className="call-text">CALL HOSPITAL</span>
            <span className="call-subtext">Main Line</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="critical-form">
        
        {/* Section 1: Priority Level */}
        <div className="form-section priority-section">
          <div className="section-header">
            <h3>🆘 PRIORITY LEVEL</h3>
            <span className="urgency-badge">URGENT</span>
          </div>
          
          <div className="priority-options">
            <label className="priority-option">
              <input
                type="radio"
                name="priorityLevel"
                value="critical"
                checked={formData.priorityLevel === 'critical'}
                onChange={handleChange}
              />
              <span className="priority-card critical-priority">
                <span className="priority-icon">🔴</span>
                <span className="priority-text">
                  <strong>CRITICAL</strong>
                  <small>Immediate resuscitation required</small>
                </span>
              </span>
            </label>

            <label className="priority-option">
              <input
                type="radio"
                name="priorityLevel"
                value="emergency"
                checked={formData.priorityLevel === 'emergency'}
                onChange={handleChange}
              />
              <span className="priority-card emergency-priority">
                <span className="priority-icon">🟡</span>
                <span className="priority-text">
                  <strong>EMERGENCY</strong>
                  <small>Life-threatening condition</small>
                </span>
              </span>
            </label>

            <label className="priority-option">
              <input
                type="radio"
                name="priorityLevel"
                value="urgent"
                checked={formData.priorityLevel === 'urgent'}
                onChange={handleChange}
              />
              <span className="priority-card urgent-priority">
                <span className="priority-icon">🟠</span>
                <span className="priority-text">
                  <strong>URGENT</strong>
                  <small>Serious but stable condition</small>
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* Section 2: Patient Situation */}
        <div className="form-section situation-section">
          <div className="section-header">
            <h3>📋 PATIENT SITUATION</h3>
            <span className="info-badge">DETAILS</span>
          </div>
          
          <div className="situation-grid">
            <div className="form-group">
              <label>Patient Name *</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient full name"
                required
                className="critical-input"
              />
            </div>

            <div className="form-group">
              <label>Contact Number *</label>
              <div className="input-with-call">
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Patient phone number"
                  required
                />
                <button 
                  type="button" 
                  className="call-small-btn"
                  onClick={() => makeCall(formData.contactNumber)}
                >
                  📞
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Emergency Situation Description *</label>
            <textarea
              name="patientSituation"
              value={formData.patientSituation}
              onChange={handleChange}
              placeholder="Describe the critical situation, symptoms, and immediate concerns..."
              rows="4"
              required
              className="situation-textarea"
            />
          </div>

          <div className="quick-symptoms">
            <label>Quick Symptoms (Select all that apply):</label>
            <div className="symptoms-grid">
              <span className="symptom-tag">😵 Unconscious</span>
              <span className="symptom-tag">💔 Chest Pain</span>
              <span className="symptom-tag">😫 Breathing Difficulty</span>
              <span className="symptom-tag">🩸 Severe Bleeding</span>
              <span className="symptom-tag">🔥 Severe Pain</span>
              <span className="symptom-tag">🌀 Confusion</span>
            </div>
          </div>
        </div>

        {/* Emergency Actions */}
        <div className="emergency-actions">
          <button type="submit" className="emergency-submit-btn">
            🚨 SEND EMERGENCY ALERT
          </button>
          <button type="button" className="quick-help-btn">
            🆘 NEED IMMEDIATE HELP
          </button>
        </div>
      </form>
    </div>
  );

  function makeCall(phoneNumber) {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`);
    } else {
      alert('Please enter a phone number first');
    }
  }
};

export default Ecall;