import React, { useState } from "react";
import "./addstaff.css";

const AddLeader = () => {
  const [lname, setName] = useState("");
  const [lqualification, setQualification] = useState("");
  const [lphoto, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Admin token
  const token = localStorage.getItem("token");

  const addLeader = async () => {
    if (!lname || !lqualification || !lphoto) {
      alert("❌ All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("image", lphoto);        // backend key
    formData.append("lname", lname);
    formData.append("lqualification", lqualification);

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/doctor`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}` // ADMIN JWT
            // ❌ Content-Type mat set karo
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Unauthorized or server error");
      }

      const result = await response.text();
      alert("✅ Leader added successfully");
      console.log(result);

      // reset form
      setName("");
      setQualification("");
      setImage(null);
      document.querySelector('input[type="file"]').value = "";

    } catch (error) {
      console.error(error);
      alert("❌ Only ADMIN can add leader");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hospital-form-wrapper" style={{ marginTop: "110px" }}>
      <div className="hospital-staff-form">
        <h3 className="form-title">Add Doctor (ADMIN)</h3>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={lname}
            placeholder="Enter Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Qualification:</label>
          <input
            type="text"
            value={lqualification}
            placeholder="MBBS / MD / Director"
            onChange={(e) => setQualification(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Photo Upload:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          className="submit-btn"
          onClick={addLeader}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Leader"}
        </button>
      </div>
    </div>
  );
};

export default AddLeader;
