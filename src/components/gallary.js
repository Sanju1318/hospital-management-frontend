import React, { useEffect, useState } from "react";
import "./gallary.css";

const Gallary = () => {
  const [show, setShow] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Base URL from ENV
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    view();
  }, []);

  const view = async () => {
    try {
      const res = await fetch(`${BASE_URL}/gallary`);
      const result = await res.json();

      if (Array.isArray(result)) {
        setShow(result);
      } else {
        setShow([]);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setShow([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (img, idx) => {
    setSelectedImage({ ...img, index: idx });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;

    const currentIndex = selectedImage.index;
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % show.length
        : (currentIndex - 1 + show.length) % show.length;

    setSelectedImage({ ...show[newIndex], index: newIndex });
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading gallery...</h2>;
  }

  return (
    <>
      <section className="gallery-section">
        <div className="gallery-header">
          <h2 className="gallery-main-title">Our Medical Facility Gallery</h2>
          <p className="gallery-subtitle">
            Explore our state-of-the-art medical facilities
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="gallery-grid">
          {show.map((img, idx) => (
            <div
              className="gallery-item"
              key={idx}
              onClick={() => openModal(img, idx)}
            >
              <div className="image-container">
                <img
                  src={`${BASE_URL}/gallary/image/${img.rname}`}
                  alt={img.gallaryName}
                  loading="lazy"
                />
              </div>

              <div className="gallery-caption">
                <h3 className="caption-title">{img.gallaryName}</h3>
                <p className="caption-desc">Medical Facility</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Image Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>

            <button
              className="modal-nav modal-prev"
              onClick={() => navigateImage("prev")}
            >
              ‹
            </button>

            <img
              src={`${BASE_URL}/gallary/image/${selectedImage.rname}`}
              alt={selectedImage.gallaryName}
              className="modal-image"
            />

            <button
              className="modal-nav modal-next"
              onClick={() => navigateImage("next")}
            >
              ›
            </button>

            <div className="modal-caption">
              <h3>{selectedImage.gallaryName}</h3>
              <p>
                {selectedImage.index + 1} / {show.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallary;
