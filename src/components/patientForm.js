import React, { useState } from 'react';
import './patientForm.css';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [fee, setFee] = useState('');
  const [insurance, setInsurance] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  // ===================== VALIDATION =====================
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    else if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!age) newErrors.age = 'Age is required';
    else if (age < 0 || age > 150) newErrors.age = 'Enter a valid age';

    if (!gender) newErrors.gender = 'Gender is required';
    if (!address.trim()) newErrors.address = 'Address is required';

    if (!mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    else if (!/^\d{10}$/.test(mobileNumber)) newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';

    if (!fee) newErrors.fee = 'Fee is required';
    else if (fee < 0) newErrors.fee = 'Fee cannot be negative';

    if (insurance && !/^[A-Za-z0-9_-]+$/.test(insurance))
      newErrors.insurance = 'Insurance ID can only contain letters, numbers, hyphens, and underscores';

    return newErrors;
  };

  // ===================== SUBMIT FORM =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    const data = { name, age, gender, address, mobileNumber, fee, insurance };

    try {
      const response = await fetch(`${BASE_URL}/admin/newpatient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Patient registered successfully!');
        // Reset form
        setName('');
        setAge('');
        setGender('');
        setAddress('');
        setMobileNumber('');
        setFee('');
        setInsurance('');
        setErrors({});
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===================== HELPERS =====================
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(value);
    if (errors.mobileNumber) setErrors(prev => ({ ...prev, mobileNumber: '' }));
  };

  const handleChange = (setter, field) => (e) => {
    setter(e.target.value);
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // ===================== JSX =====================
  return (
    <div className="patient-form-container">
      <div className="form-header">
        <h2>New Patient Registration</h2>
        <p>Fill in the details to register a patient</p>
      </div>

      <form className="patient-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="required">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={handleChange(setName, 'name')}
              className={errors.name ? 'error' : ''}
              placeholder="Enter patient's full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="required">Age</label>
            <input
              type="number"
              value={age}
              onChange={handleChange(setAge, 'age')}
              className={errors.age ? 'error' : ''}
              placeholder="Enter age"
              min="0"
              max="150"
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="required">Gender</label>
            <select
              value={gender}
              onChange={handleChange(setGender, 'gender')}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label className="required">Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={handleMobileChange}
              className={errors.mobileNumber ? 'error' : ''}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
            />
            {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
          </div>
        </div>

        <div className="form-group full-width">
          <label className="required">Address</label>
          <textarea
            value={address}
            onChange={handleChange(setAddress, 'address')}
            className={errors.address ? 'error' : ''}
            placeholder="Enter complete address"
            rows="3"
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="required">Consultation Fee (₹)</label>
            <input
              type="number"
              value={fee}
              onChange={handleChange(setFee, 'fee')}
              className={errors.fee ? 'error' : ''}
              placeholder="Enter fee"
              min="0"
              step="0.01"
            />
            {errors.fee && <span className="error-message">{errors.fee}</span>}
          </div>

          <div className="form-group">
            <label>Insurance ID (Optional)</label>
            <input
              type="text"
              value={insurance}
              onChange={handleChange(setInsurance, 'insurance')}
              className={errors.insurance ? 'error' : ''}
              placeholder="Enter insurance ID"
            />
            {errors.insurance && <span className="error-message">{errors.insurance}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Registering...
              </>
            ) : (
              'Register Patient'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
