import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  FaUsers, 
  FaCalendarCheck, 
  FaUserMd, 
  FaBed,
  FaPlus,
  FaCalendarAlt,
  FaPills,
  FaChartBar,
  FaBell,
  FaCog,
  FaUserCircle,
  FaArrowUp,
  FaArrowDown,
  FaStethoscope,
  FaHospital,
  FaTimes
} from "react-icons/fa";
import "./dasboard.css";
import NotificationsPanel from "./notificationsPanel";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    availableDoctors: 0,
    occupiedBeds: 0,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [adminName, setAdminName] = useState("");
  
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Sample stats
    setStats({
      totalPatients: 1247,
      todayAppointments: 23,
      availableDoctors: 8,
      occupiedBeds: 45,
    });

    // Greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("Good Morning");
    else if (hour < 18) setTimeOfDay("Good Afternoon");
    else setTimeOfDay("Good Evening");

    // Get name & role from localStorage
    let storedName = localStorage.getItem("username") || "Admin";
    const role = localStorage.getItem("role");

    // Add "Dr." prefix for admin
    if (role === "ROLE_ADMIN" && !storedName.startsWith("Dr.")) {
      storedName = "Dr. "+ storedName;
    }

    // Convert to uppercase for display
    setAdminName("DR. "+storedName.toUpperCase());

  }, []);

  const quickActions = [
    { icon: <FaPlus />, title: "New Patient", path: "/patientForm", color: "#10b981" },
    { icon: <FaCalendarAlt />, title: "Schedule", path: "/doctorSchedule", color: "#3b82f6" },
    { icon: <FaPills />, title: "Pharmacy", path: "/adminPharmacy", color: "#8b5cf6" },
    { icon: <FaChartBar />, title: "Reports", path: "/adminReports", color: "#f59e0b" },
    { 
      icon: <FaBell />, 
      title: "Notifications", 
      path: "#", 
      color: "#ef4444", 
      badge: 3,
      onClick: (e) => {
        e.preventDefault();
        setShowNotifications(!showNotifications);
        setShowSettings(false);
      }
    },
    { 
      icon: <FaCog />, 
      title: "Settings", 
      path: "#", 
      color: "#6b7280",
      onClick: (e) => {
        e.preventDefault();
        setShowSettings(!showSettings);
        setShowNotifications(false);
      }
    },
  ];

  const recentActivities = [
    { time: "10:30 AM", activity: "Dr. Smith completed surgery", type: "surgery" },
    { time: "09:15 AM", activity: "New patient registered", type: "registration" },
    { time: "Yesterday", activity: "Monthly inventory check completed", type: "inventory" },
    { time: "2 days ago", activity: "System maintenance performed", type: "maintenance" },
  ];

  const StatCard = ({ icon, title, value, trend, trendValue, color }) => (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="stat-header">
        <div className="stat-icon" style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}>
          <div className="icon-wrapper" style={{ color: color }}>{icon}</div>
        </div>
        <div className="stat-trend">
          {trend === 'up' ? <FaArrowUp className="trend-up" /> : <FaArrowDown className="trend-down" />}
          <span>{trendValue}</span>
        </div>
      </div>
      <div className="stat-content">
        <h3>{value.toLocaleString()}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  const ActivityItem = ({ time, activity, type }) => {
    const getTypeColor = (type) => {
      switch(type) {
        case 'surgery': return '#ef4444';
        case 'registration': return '#10b981';
        case 'inventory': return '#3b82f6';
        case 'maintenance': return '#f59e0b';
        default: return '#6b7280';
      }
    };
    return (
      <div className="activity-item">
        <div className="activity-time">{time}</div>
        <div className="activity-dot" style={{ backgroundColor: getTypeColor(type) }} />
        <div className="activity-text">{activity}</div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="greeting">
              {timeOfDay}, <span className="greeting-name">{adminName}</span>
            </h1>
            <p className="subtitle">Welcome back to GuruTeg Bahadur Hospital Management</p>
          </div>
          <div className="date-display">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="user-profile">
          <div className="profile-avatar"><FaUserCircle /></div>
          <div className="profile-info">
            <strong>{adminName}</strong>
            <span>ADMIN</span>
          </div>
        </div>
      </div>

      {/* NOTIFICATIONS PANEL */}
      {showNotifications && (
        <div className="notifications-container" ref={notificationsRef}>
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="dashboard-content">
        {/* LEFT COLUMN */}
        <div className="content-left">
          {/* STATS GRID */}
          <div className="stats-grid">
            <StatCard icon={<FaUsers />} title="Total Patients" value={stats.totalPatients} trend="up" trendValue="+12%" color="#3b82f6" />
            <StatCard icon={<FaCalendarCheck />} title="Today's Appointments" value={stats.todayAppointments} trend="up" trendValue="+5%" color="#10b981" />
            <StatCard icon={<FaUserMd />} title="Available Doctors" value={stats.availableDoctors} trend="up" trendValue="+2" color="#8b5cf6" />
            <StatCard icon={<FaBed />} title="Occupied Beds" value={stats.occupiedBeds} trend="down" trendValue="-3%" color="#ef4444" />
          </div>

          {/* QUICK ACTIONS */}
          <div className="section-card">
            <div className="section-header">
              <h2><FaStethoscope /> Quick Actions</h2>
              <Link to="/all-actions" className="view-all">View All →</Link>
            </div>
            <div className="actions-grid">
              {quickActions.map((item, i) => (
                <Link 
                  key={i} 
                  to={item.path} 
                  className="action-tile"
                  style={{ '--tile-color': item.color }}
                  onClick={item.onClick || null}
                >
                  <div className="tile-icon" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{item.icon}</div>
                  <span className="tile-title">{item.title}</span>
                  {item.badge && <span className="notification-badge">{item.badge}</span>}
                </Link>
              ))}
            </div>

            {showSettings && (
              <div className="settings-dropdown" ref={settingsRef}>
                <div className="dropdown-header"><FaCog /> System Settings</div>
                <Link to="/addstaff" className="dropdown-item"><FaUserCircle /> AddStaff</Link>
                <Link to="/addgallary" className="dropdown-item"><FaHospital /> Add_Gallary</Link>
                <Link to="/adddoctor" className="dropdown-item"><FaUserMd /> Add_Doctors</Link>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="content-right">
          <div className="section-card">
            <div className="section-header"><h2>Recent Activities</h2></div>
            <div className="activities-list">
              {recentActivities.map((activity, i) => <ActivityItem key={i} {...activity} />)}
            </div>
          </div>

          <div className="section-card status-card">
            <h2>Hospital Status</h2>
            <div className="status-indicators">
              <div className="status-item active"><div className="status-dot"></div><span>Emergency Room</span><span className="status-value">Operational</span></div>
              <div className="status-item"><div className="status-dot"></div><span>ICU</span><span className="status-value">3 Beds Available</span></div>
              <div className="status-item active"><div className="status-dot"></div><span>Pharmacy</span><span className="status-value">Open</span></div>
              <div className="status-item"><div className="status-dot"></div><span>Lab Services</span><span className="status-value">Maintenance</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;