// components/ReportsForm.js
import React, { useState } from 'react';
import './reportsForm.css';

const ReportsForm = () => {
  const [report, setReport] = useState({
    reportID: '',
    patientID: '',
    reportType: 'Lab Test',
    reportDate: '',
    doctorID: '',
    reportDetails: ''
  });

  const [reports, setReports] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setReports([...reports, { ...report, id: Date.now() }]);
      setReport({
        reportID: '',
        patientID: '',
        reportType: 'Lab Test',
        reportDate: '',
        doctorID: '',
        reportDetails: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="reports-form-container">
      <div className="form-background">
        <div className="lab-equipment">
          <div className="microscope"></div>
          <div className="test-tubes">
            <div className="tube tube-1"></div>
            <div className="tube tube-2"></div>
            <div className="tube tube-3"></div>
          </div>
          <div className="scanning-machine"></div>
        </div>
      </div>

      <div className="form-content">
        <div className="form-header">
          <i className="fas fa-file-medical-alt"></i>
          <h2>Medical Reports & Diagnostics</h2>
          <p>Manage patient reports and diagnostic information</p>
        </div>

        <form onSubmit={handleSubmit} className="reports-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="reportID">
                <i className="fas fa-file-medical"></i>
                Report ID
              </label>
              <input
                type="text"
                id="reportID"
                name="reportID"
                value={report.reportID}
                onChange={handleChange}
                required
                placeholder="Enter Report ID"
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientID">
                <i className="fas fa-user-injured"></i>
                Patient ID
              </label>
              <input
                type="text"
                id="patientID"
                name="patientID"
                value={report.patientID}
                onChange={handleChange}
                required
                placeholder="Enter Patient ID"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reportType">
                <i className="fas fa-vial"></i>
                Report Type
              </label>
              <select
                id="reportType"
                name="reportType"
                value={report.reportType}
                onChange={handleChange}
                required
              >
                <option value="Lab Test">Lab Test</option>
                <option value="Radiology">Radiology</option>
                <option value="Prescription">Prescription</option>
                <option value="Blood Test">Blood Test</option>
                <option value="MRI Scan">MRI Scan</option>
                <option value="CT Scan">CT Scan</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reportDate">
                <i className="fas fa-calendar-check"></i>
                Report Date
              </label>
              <input
                type="date"
                id="reportDate"
                name="reportDate"
                value={report.reportDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctorID">
                <i className="fas fa-user-md"></i>
                Doctor ID
              </label>
              <input
                type="text"
                id="doctorID"
                name="doctorID"
                value={report.doctorID}
                onChange={handleChange}
                required
                placeholder="Enter Doctor ID"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="reportDetails">
                <i className="fas fa-stethoscope"></i>
                Report Details / File Link
              </label>
              <textarea
                id="reportDetails"
                name="reportDetails"
                value={report.reportDetails}
                onChange={handleChange}
                rows="4"
                placeholder="Enter report details or file link"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Generating Report...
              </>
            ) : (
              <>
                <i className="fas fa-file-export"></i>
                Generate Report
              </>
            )}
          </button>
        </form>

        {reports.length > 0 && (
          <div className="reports-list">
            <h3>Generated Reports</h3>
            <div className="reports-grid">
              {reports.map((rep, index) => (
                <div key={rep.id} className="report-card" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="report-header">
                    <h4>{rep.reportType}</h4>
                    <span className={`report-status ${rep.reportType.toLowerCase().replace(' ', '-')}`}>
                      {rep.reportType}
                    </span>
                  </div>
                  <div className="report-details">
                    <p><strong>Report ID:</strong> {rep.reportID}</p>
                    <p><strong>Patient ID:</strong> {rep.patientID}</p>
                    <p><strong>Doctor ID:</strong> {rep.doctorID}</p>
                    <p><strong>Date:</strong> {rep.reportDate}</p>
                    <p><strong>Details:</strong> {rep.reportDetails}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsForm;