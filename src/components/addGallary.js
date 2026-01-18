import React, { useState } from "react";

const AddGallary = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image || !title) {
      alert("❌ Image aur title dono required hain");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);   // backend key
    formData.append("title", title);   // backend key

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/gallary`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}` // JWT
            // ❌ Content-Type mat set karo
          },
          body: formData
        }
      );

      if (!res.ok) {
        alert("❌ Upload failed");
        return;
      }

      const data = await res.json();
      alert("✅ Image uploaded successfully");

      setUploaded(data);
      setImage(null);
      setTitle("");
      document.getElementById("imageInput").value = "";

    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, marginTop: "110px" }}>
      <h2>📤 Upload Gallery Image (Admin)</h2>

      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Room / Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploaded && (
        <div style={{ marginTop: 30 }}>
          <h3>🖼 Uploaded Preview</h3>
          <p><b>Title:</b> {uploaded.gallaryName}</p>

          <img
            src={`${process.env.REACT_APP_API_URL}/gallery/image/${uploaded.rname}`}
            alt="uploaded"
            style={{ width: 300, borderRadius: 6 }}
          />
        </div>
      )}
    </div>
  );
};

export default AddGallary;
