import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Service from "./service";
import Landing from "./landing";
import About from "./about";
import Contact from "./contact";
import BookAppointment from "./bookAppointment";
import Addstaff from "./addstaff";
import AddGallary from "./addGallary";
import AddLeader from "./addLeader";
import PatientForm from "./patientForm";
import Dashboard from "./dashboard";
import AdminReports from "./adminReports";
import Adminpharmacy from "./adminpharmacy";
import Notifications from "./notifications";
import HospitalAuth from "./hospitalAuth";
import DoctorSchedule from "./doctorSchedule";

const Siterouter = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Routes>
      {/* 🌐 PUBLIC ROUTES */}
      <Route path="/" element={<Landing />} />
      <Route path="/service" element={<Service />} />
      <Route path="/about" element={<About />} />
      <Route path="/doctor" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/bookappointment" element={<BookAppointment />} />
      <Route path="/hospitalauth" element={<HospitalAuth />} />

      {/* 🔐 ADMIN PROTECTED ROUTES */}
      <Route
        path="/addstaff"
        element={
          token && role === "ADMIN" ? <Addstaff /> : <Navigate to="/hospitalauth" />
        }
      />

      <Route
        path="/addgallary"
        element={
          token && role === "ADMIN" ? <AddGallary /> : <Navigate to="/hospitalauth" />
        }
      />

      <Route
        path="/adddoctor"
        element={
          token && role === "ADMIN" ? <AddLeader /> : <Navigate to="/hospitalauth" />
        }
      />

      <Route
        path="/patientForm"
        element={
          token ? <PatientForm /> : <Navigate to="/hospitalauth" />
        }
      />

      <Route
        path="/dashbord"
        element={
          token && role === "ADMIN" ? <Dashboard /> : <Navigate to="/hospitalauth" />
        }
      />

      <Route
        path="/adminPharmacy"
        element={
          token && role === "ADMIN" ? <Adminpharmacy /> : <Navigate to="/hospitalauth" />
        }
      />

      <Route
        path="/adminReports"
        element={
          token && role === "ADMIN" ? <AdminReports /> : <Navigate to="/hospitalauth" />
        }
      />

      <Route
        path="/doctorSchedule"
        element={
          token && role === "ADMIN" ? <DoctorSchedule /> : <Navigate to="/hospitalauth" />
        }
      />

      <Route
        path="/notification"
        element={
          token ? <Notifications /> : <Navigate to="/hospitalauth" />
        }
      />

      {/* ❌ WRONG URL */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Siterouter;
