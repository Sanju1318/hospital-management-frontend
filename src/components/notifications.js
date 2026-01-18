import "./Notifications.css";

const notifications = [
  {
    id: 1,
    type: "appointment",
    title: "Appointment Reminder",
    message: "Dr. Sharma – Today at 5:00 PM",
    time: "10 min ago"
  },
  {
    id: 2,
    type: "medicine",
    title: "Medicine Refill Alert",
    message: "Paracetamol – Low stock",
    time: "1 hour ago"
  },
  {
    id: 3,
    type: "report",
    title: "New Report Available",
    message: "Blood Test – Download",
    time: "Yesterday"
  }
];

export default function Notifications() {
  return (
    <div className="page">
      <h2>🔔 Notifications</h2>

      <div className="notification-list">
        {notifications.map((n) => (
          <div key={n.id} className={`notify-card ${n.type}`}>
            <div>
              <h4>{n.title}</h4>
              <p>{n.message}</p>
            </div>
            <span>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
