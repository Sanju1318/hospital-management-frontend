import React, { useState } from "react";
import "./DoctorSchedule.css";

function DoctorSchedule() {
  const [schedules, setSchedules] = useState([
    { id: 1, doctor: "Dr. Sharma", date: "2024-01-15", time: "09:00", status: "ACTIVE" },
    { id: 2, doctor: "Dr. Khan", date: "2024-01-15", time: "10:30", status: "ACTIVE" },
    { id: 3, doctor: "Dr. Patel", date: "2024-01-16", time: "14:00", status: "INACTIVE" },
    { id: 4, doctor: "Dr. Gupta", date: "2024-01-16", time: "16:30", status: "ACTIVE" },
    { id: 5, doctor: "Dr. Sharma", date: "2024-01-17", time: "11:00", status: "ACTIVE" },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    doctor: "",
    date: "",
    time: "",
    status: "ACTIVE"
  });

  const doctors = ["Dr. Sharma", "Dr. Khan", "Dr. Patel", "Dr. Gupta", "Dr. Verma"];
  
  const statusOptions = [
    { value: "ACTIVE", label: "Available", color: "#10b981" },
    { value: "INACTIVE", label: "Unavailable", color: "#ef4444" },
    { value: "BREAK", label: "On Break", color: "#f59e0b" },
    { value: "FULL", label: "Fully Booked", color: "#6b7280" }
  ];

  const addSchedule = () => {
    if (!newSchedule.doctor || !newSchedule.date || !newSchedule.time) {
      alert("Please fill all required fields");
      return;
    }
    
    const newId = schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1;
    const scheduleToAdd = { ...newSchedule, id: newId };
    
    setSchedules([...schedules, scheduleToAdd]);
    setNewSchedule({ doctor: "", date: "", time: "", status: "ACTIVE" });
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const toggleStatus = (id) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id 
        ? { ...schedule, status: schedule.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
        : schedule
    ));
  };

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find(s => s.value === status);
    return statusObj ? statusObj.color : "#6b7280";
  };

  const getStatusLabel = (status) => {
    const statusObj = statusOptions.find(s => s.value === status);
    return statusObj ? statusObj.label : "Unknown";
  };

  return (
    <div className="schedule-page" style={{marginTop:"100px"}}>
      {/* Header Section */}
      <div className="schedule-header">
        <div className="header-content">
          <h1 className="main-title">📅 Doctor Availability Schedule</h1>
          <p className="subtitle">Manage doctor availability, schedules, and appointment slots</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-info">
              <h3>{doctors.length}</h3>
              <p>Doctors</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{schedules.length}</h3>
              <p>Total Slots</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{schedules.filter(s => s.status === "ACTIVE").length}</h3>
              <p>Available Slots</p>
            </div>
          </div>
        </div>
      </div>

      <div className="schedule-content">
        {/* Left Side - Add New Schedule */}
        <div className="add-schedule-section">
          <div className="form-card">
            <div className="card-header">
              <h2>➕ Add New Schedule</h2>
              <p>Create new availability slots for doctors</p>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">👨‍⚕️</span>
                Select Doctor *
              </label>
              <div className="select-wrapper">
                <select
                  value={newSchedule.doctor}
                  onChange={(e) => setNewSchedule({...newSchedule, doctor: e.target.value})}
                  className="form-select"
                >
                  <option value="">Choose Doctor</option>
                  {doctors.map((doctor, index) => (
                    <option key={index} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📅</span>
                  Date *
                </label>
                <input
                  type="date"
                  value={newSchedule.date}
                  onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">⏰</span>
                  Time *
                </label>
                <input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🔧</span>
                Status
              </label>
              <div className="status-buttons">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    className={`status-btn ${newSchedule.status === status.value ? 'active' : ''}`}
                    onClick={() => setNewSchedule({...newSchedule, status: status.value})}
                    style={{ '--status-color': status.color }}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            <button className="add-btn" onClick={addSchedule}>
              <span className="btn-icon">➕</span>
              Add to Schedule
            </button>

            <div className="form-footer">
              <p className="footer-note">
                <span className="note-icon">💡</span>
                Schedule slots are visible to patients for booking appointments
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stats-card">
            <h3>📊 Schedule Statistics</h3>
            <div className="stats-grid">
              {doctors.map(doctor => {
                const doctorSlots = schedules.filter(s => s.doctor === doctor);
                return (
                  <div key={doctor} className="doctor-stat">
                    <div className="doctor-name">{doctor}</div>
                    <div className="slot-count">{doctorSlots.length} slots</div>
                    <div className="slot-bar">
                      <div 
                        className="slot-fill"
                        style={{ width: `${(doctorSlots.length / schedules.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Schedule List */}
        <div className="schedule-list-section">
          <div className="list-header">
            <h2>📋 Current Schedule</h2>
            <div className="filter-controls">
              <input
                type="text"
                placeholder="Search doctor or date..."
                className="search-input"
              />
              <select className="filter-select">
                <option value="">All Status</option>
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="schedule-table-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map(schedule => (
                  <tr key={schedule.id} className="schedule-row">
                    <td className="doctor-cell">
                      <div className="doctor-info">
                        <div className="doctor-avatar">👨‍⚕️</div>
                        <div className="doctor-details">
                          <strong>{schedule.doctor}</strong>
                          <span className="doctor-specialty">Cardiologist</span>
                        </div>
                      </div>
                    </td>
                    <td className="date-cell">
                      <div className="date-display">
                        <div className="date-day">{new Date(schedule.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="date-main">{new Date(schedule.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</div>
                        <div className="date-year">{new Date(schedule.date).getFullYear()}</div>
                      </div>
                    </td>
                    <td className="time-cell">
                      <div className="time-display">
                        <span className="time-icon">🕒</span>
                        {schedule.time}
                      </div>
                    </td>
                    <td className="status-cell">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(schedule.status) }}
                        onClick={() => toggleStatus(schedule.id)}
                      >
                        {getStatusLabel(schedule.status)}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit-btn"
                          title="Edit Schedule"
                        >
                          ✏️
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => deleteSchedule(schedule.id)}
                          title="Delete Schedule"
                        >
                          🗑️
                        </button>
                        <button 
                          className="action-btn copy-btn"
                          title="Duplicate"
                        >
                          📋
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="legend-card">
            <h4>Status Legend</h4>
            <div className="legend-items">
              {statusOptions.map(status => (
                <div key={status.value} className="legend-item">
                  <span 
                    className="legend-color" 
                    style={{ backgroundColor: status.color }}
                  ></span>
                  <span className="legend-text">{status.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="calendar-section">
        <h3>📅 Weekly Calendar View</h3>
        <div className="calendar-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="calendar-day">
              <div className="day-header">{day}</div>
              <div className="day-slots">
                {schedules
                  .filter(schedule => new Date(schedule.date).getDay() === ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(day))
                  .map(schedule => (
                    <div 
                      key={schedule.id} 
                      className="calendar-slot"
                      style={{ 
                        backgroundColor: getStatusColor(schedule.status),
                        opacity: schedule.status === 'ACTIVE' ? 1 : 0.6
                      }}
                    >
                      <div className="slot-time">{schedule.time}</div>
                      <div className="slot-doctor">{schedule.doctor.split(' ')[1]}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorSchedule;