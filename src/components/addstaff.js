import React, { useState } from "react";
import "./addstaff.css";

const Addstaff = () => {
  const [sname, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 JWT token (ADMIN)
  const token = localStorage.getItem("token");

  const addStaff = async () => {
    if (!sname || !qualification || !image) {
      alert("❌ All fields are required");
      return;
    }

    const staffObj = {
      sname: sname,
      qualification: qualification,
    };

    const formData = new FormData();
    formData.append("staff", JSON.stringify(staffObj)); // backend expects JSON string
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/staff`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // ADMIN JWT
            // ❌ Content-Type mat set karo
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Unauthorized or server error");
      }

      const result = await response.json();
      alert("✅ Staff added successfully");
      console.log(result);

      // reset form
      setName("");
      setQualification("");
      setImage(null);
      document.querySelector('input[type="file"]').value = "";

    } catch (error) {
      console.error(error);
      alert("❌ Only ADMIN can add staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hospital-form-wrapper" style={{ marginTop: "110px" }}>
      <div className="hospital-staff-form">
        <h3 className="form-title">Admin – Add Staff</h3>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={sname}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>

        <div className="form-group">
          <label>Qualification:</label>
          <input
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            placeholder="MBBS / Nurse / MD"
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          className="submit-btn"
          onClick={addStaff}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Staff (ADMIN)"}
        </button>
      </div>
    </div>
  );
};

export default Addstaff;
