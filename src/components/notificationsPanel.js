import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaUserMd,
  FaBell,
  FaTrash,
  FaCheckDouble,
  FaUserCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaUserFriends,
  FaSearch
} from "react-icons/fa";
import "./NotificationsPanel.css";

const NotificationsPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [hospitalContacts, setHospitalContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // ===================== API CALLS =====================
  useEffect(() => {
    if (token) {
      loadAppointments();
      loadContacts();
    }
  }, [token]);

  // -------- Load Appointments as Notifications --------
  const loadAppointments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/apnt`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data = await response.json();

      const mappedNotifications = data.map(apnt => ({
        id: apnt.id,
        type: "appointment",
        title: "New Appointment Scheduled",
        message: `${apnt.name} booked appointment at ${apnt.appointmentTime}`,
        time: apnt.adddate,
        unread: true,
        icon: <FaCalendarAlt />,
        color: "#3b82f6"
      }));

      setNotifications(mappedNotifications);
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
  };

  // -------- Load Contacts --------
  const loadContacts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/contact`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch contacts");

      const data = await response.json();

      const mappedContacts = data.map(c => ({
        id: c.cid,
        name: c.cname,
        role: c.csubject,
        phone: c.cphone || "N/A",
        email: c.cemail,
        status: "available"
      }));

      setHospitalContacts(mappedContacts);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  // ===================== FUNCTIONS =====================
  const markAsRead = (id) =>
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));

  const markAllAsRead = () =>
    setNotifications(notifications.map(n => ({ ...n, unread: false })));

  const deleteNotification = (id) =>
    setNotifications(notifications.filter(n => n.id !== id));

  const clearAll = () => setNotifications([]);

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return n.unread;
    return n.type === activeFilter;
  });

  const filteredContacts = hospitalContacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===================== COMPONENTS =====================
  const NotificationItem = ({ notification }) => (
    <div className={`notification-item ${notification.unread ? "unread" : ""}`}>
      <div
        className="notification-icon"
        style={{ backgroundColor: `${notification.color}20`, color: notification.color }}
      >
        {notification.icon}
      </div>

      <div className="notification-content">
        <div className="notification-header">
          <h4>{notification.title}</h4>
          <span className="notification-time">{notification.time}</span>
        </div>

        <p className="notification-message">{notification.message}</p>

        <div className="notification-actions">
          {notification.unread && (
            <button className="action-btn mark-read" onClick={() => markAsRead(notification.id)}>
              <FaCheckCircle /> Mark Read
            </button>
          )}
          <button className="action-btn delete" onClick={() => deleteNotification(notification.id)}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {notification.unread && <div className="unread-indicator"></div>}
    </div>
  );

  const ContactItem = ({ contact }) => (
    <div className="contact-item">
      <div className="contact-avatar">
        <FaUserCircle />
        <div className={`contact-status ${contact.status}`}></div>
      </div>

      <div className="contact-info">
        <h4>{contact.name}</h4>
        <p className="contact-role">{contact.role}</p>

        <div className="contact-details">
          <div className="contact-phone">
            <FaPhoneAlt /> {contact.phone}
          </div>
          <div className="contact-email">
            <FaEnvelope /> {contact.email}
          </div>
        </div>
      </div>

      <div className="contact-actions">
        <button className="action-btn call"><FaPhoneAlt /></button>
        <button className="action-btn message"><FaWhatsapp /></button>
      </div>
    </div>
  );

  // ===================== JSX =====================
  return (
    <div className="notifications-panel">
      <div className="panel-header">
        <div className="panel-title">
          <FaBell className="panel-icon" />
          <h3>Notifications & Contacts</h3>
          {notifications.filter(n => n.unread).length > 0 && (
            <span className="unread-count">{notifications.filter(n => n.unread).length}</span>
          )}
        </div>
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
      </div>

      <div className="panel-tabs">
        <button className={`tab ${!showContacts ? "active" : ""}`} onClick={() => setShowContacts(false)}>
          <FaBell /> Notifications
        </button>
        <button className={`tab ${showContacts ? "active" : ""}`} onClick={() => setShowContacts(true)}>
          <FaUserFriends /> Contacts
        </button>
      </div>

      {!showContacts ? (
        <>
          <div className="notification-filters">
            <button className={`filter-btn ${activeFilter === "all" ? "active" : ""}`} onClick={() => setActiveFilter("all")}>
              All ({notifications.length})
            </button>
            <button className={`filter-btn ${activeFilter === "unread" ? "active" : ""}`} onClick={() => setActiveFilter("unread")}>
              Unread ({notifications.filter(n => n.unread).length})
            </button>
          </div>

          <div className="notification-actions-bar">
            <button className="action-btn primary" onClick={markAllAsRead}><FaCheckDouble /> Mark All as Read</button>
            <button className="action-btn danger" onClick={clearAll}><FaTrash /> Clear All</button>
          </div>

          <div className="notifications-list">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(n => <NotificationItem key={n.id} notification={n} />)
            ) : (
              <div className="empty-state">
                <FaBell className="empty-icon" />
                <h4>No notifications</h4>
                <p>You're all caught up!</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="contacts-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn"><FaSearch /></button>
            </div>
          </div>

          <div className="contacts-list">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(c => <ContactItem key={c.id} contact={c} />)
            ) : (
              <div className="empty-state">
                <FaUserFriends className="empty-icon" />
                <h4>No contacts found</h4>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationsPanel;
