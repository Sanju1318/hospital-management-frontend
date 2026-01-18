import React, { useEffect, useState } from "react";
import {
  FaFileMedical,
  FaCalendarAlt,
  FaUserInjured,
  FaUserMd,
  FaLink,
  FaTrash,
  FaSave,
  FaDownload,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaPrint,
  FaShare,
  FaChartBar,
  FaDatabase,
  FaClipboardCheck
} from "react-icons/fa";
import "./Reports.css";

/* ✅ API BASE URL (DEPLOY READY) */
const API_BASE = process.env.REACT_APP_API_BASE_URL
  || "https://hospital-management-backend-c349.onrender.com";

const ReportsForm = () => {

  const [report, setReport] = useState({
    reportName: "Lab Test",
    reportDate: "",
    patient_Id: 0,
    leadership_Id: 0,
    pdfPath: ""
  });

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportTypeFilter, setReportTypeFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const reportTypes = [
    { value: "Lab Test", label: "Lab Test", icon: <FaClipboardCheck />, color: "#10b981" },
    { value: "Radiology", label: "Radiology", icon: <FaChartBar />, color: "#3b82f6" },
    { value: "Prescription", label: "Prescription", icon: <FaFileMedical />, color: "#8b5cf6" }
  ];

  /* 🔁 INPUT HANDLER */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: name === "patient_Id" || name === "leadership_Id"
        ? Number(value)
        : value
    });
  };

  /* 🔁 LOAD REPORTS */
  const loadReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/report`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to load reports");
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
      alert("❌ Reports load failed");
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  /* ✅ SAVE / UPDATE REPORT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId
        ? `${API_BASE}/admin/report/${editingId}`
        : `${API_BASE}/admin/report`;

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(report)
      });

      if (!res.ok) throw new Error("Save failed");

      alert(editingId ? "✅ Report Updated" : "✅ Report Saved");
      setEditingId(null);
      setReport({
        reportName: "Lab Test",
        reportDate: "",
        patient_Id: 0,
        leadership_Id: 0,
        pdfPath: ""
      });

      loadReports();
    } catch {
      alert("❌ Only ADMIN can perform this action");
    } finally {
      setLoading(false);
    }
  };

  /* ✏️ EDIT */
  const handleEdit = (r) => {
    setEditingId(r.id);
    setReport({
      reportName: r.reportName,
      reportDate: r.reportDate,
      patient_Id: r.patient_Id,
      leadership_Id: r.leadership_Id,
      pdfPath: r.pdfPath
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ❌ DELETE */
  const deleteReport = async (id) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      const res = await fetch(`${API_BASE}/admin/report/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error();
      alert("✅ Report Deleted");
      loadReports();
    } catch {
      alert("❌ Only ADMIN can delete");
    }
  };

  /* 🔍 FILTER */
  const filteredReports = reports.filter(r =>
    (r.reportName + r.patient_Id + r.leadership_Id + r.pdfPath)
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) &&
    (reportTypeFilter === "all" || r.reportName === reportTypeFilter)
  );

  const viewPDF = (url) => window.open(url, "_blank");

  return (
    <div className="reports-container" style={{ marginTop: "100px" }}>

      <h1><FaFileMedical /> Medical Reports</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <select
          value={report.reportName}
          onChange={(e) => setReport({ ...report, reportName: e.target.value })}
        >
          {reportTypes.map(r => (
            <option key={r.value}>{r.value}</option>
          ))}
        </select>

        <input type="date" name="reportDate" value={report.reportDate} onChange={handleChange} required />
        <input type="number" name="patient_Id" value={report.patient_Id} onChange={handleChange} placeholder="Patient ID" required />
        <input type="number" name="leadership_Id" value={report.leadership_Id} onChange={handleChange} placeholder="Doctor ID" required />
        <input type="text" name="pdfPath" value={report.pdfPath} onChange={handleChange} placeholder="PDF URL" required />

        <button type="submit" disabled={loading}>
          {editingId ? "Update Report" : "Save Report"}
        </button>
      </form>

      {/* SEARCH */}
      <input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* LIST */}
      {filteredReports.map(r => (
        <div key={r.id} className="report-card">
          <p><b>{r.reportName}</b></p>
          <p>Date: {r.reportDate}</p>
          <p>Patient ID: {r.patient_Id}</p>
          <p>Doctor ID: {r.leadership_Id}</p>

          <button onClick={() => viewPDF(r.pdfPath)}><FaEye /></button>
          <button onClick={() => handleEdit(r)}><FaEdit /></button>
          <button onClick={() => deleteReport(r.id)}><FaTrash /></button>
        </div>
      ))}
    </div>
  );
};

export default ReportsForm;
