import React, { useEffect, useState } from 'react';
import { FaStar, FaArrowLeft, FaArrowRight, FaUser, FaQuoteLeft } from 'react-icons/fa';
import './review.css';

const Review = () => {
  const [pname, setPname] = useState('');
  const [preview, setPreview] = useState('');
  const [pstar, setPstar] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Deploy-safe BASE_URL
  const BASE_URL = process.env.REACT_APP_API_URL || '';
  console.log('Review BASE_URL:', BASE_URL);

  // ===================== FETCH REVIEWS =====================
  const fetchReviews = async (pg = 0) => {
    if (!BASE_URL) {
      console.error('BASE_URL undefined. Check .env variable.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/review/page?page=${pg}&size=2`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result && result.content) {
        setReviews(result.content);
        setTotalPages(result.totalPages);
        setPage(result.number);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // ===================== SUBMIT REVIEW =====================
  const submitReview = async () => {
    if (!pname || !preview || !pstar) {
      alert('Please fill all fields and select a rating');
      return;
    }

    if (!BASE_URL) {
      alert('Server URL not set. Cannot submit review.');
      return;
    }

    setIsSubmitting(true);

    const data = { pname, preview, pstar };

    try {
      const response = await fetch(`${BASE_URL}/user/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      alert('Review Added Successfully');
      setPname('');
      setPreview('');
      setPstar(0);
      fetchReviews(page); // refresh current page
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.message || 'Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  if (loading) {
    return <h2 style={{ textAlign: 'center' }}>Loading reviews... ⏳</h2>;
  }

  return (
    <section className="review-section">
      <div className="review-header">
        <h2 className="section-title">Patient Experiences</h2>
        <p className="section-subtitle">
          Share your journey with us and help others find the care they need
        </p>
      </div>

      <div className="review-content">
        {/* ===================== REVIEW FORM ===================== */}
        <div className="review-form-container">
          <div className="form-card">
            <h3 className="form-title">Share Your Experience</h3>

            <div className="input-group">
              <div className="input-icon"><FaUser /></div>
              <input
                type="text"
                placeholder="Your Full Name"
                value={pname}
                onChange={(e) => setPname(e.target.value)}
                className="review-input"
              />
            </div>

            <div className="rating-section">
              <label className="rating-label">Rate Your Experience</label>
              <div className="stars-container">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index} className="star-label">
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        style={{ display: 'none' }}
                        onClick={() => setPstar(ratingValue)}
                      />
                      <FaStar
                        size={28}
                        color={ratingValue <= (hover || pstar) ? '#ffc107' : '#e4e5e9'}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        cursor="pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="textarea-group">
              <textarea
                placeholder="Tell us about your experience with our hospital..."
                value={preview}
                onChange={(e) => setPreview(e.target.value)}
                className="review-textarea"
                rows="4"
              />
            </div>

            <button
              type="button"
              className="review-submit-btn"
              onClick={submitReview}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Share Your Story'}
            </button>
          </div>
        </div>

        {/* ===================== REVIEWS DISPLAY ===================== */}
        <div className="reviews-display">
          <div className="reviews-header">
            <h3 className="reviews-title">What Our Patients Say</h3>
            <div className="pagination-info">
              Page {page + 1} of {totalPages}
            </div>
          </div>

          <div className="review-cards-container">
            {reviews.map((item, idx) => (
              <div className="review-card" key={idx}>
                <div className="card-header">
                  <div className="reviewer-avatar"><FaUser /></div>
                  <div className="reviewer-info">
                    <h4 className="reviewer-name">{item.pname}</h4>
                    <div className="stars-display">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={16}
                          color={i < item.pstar ? '#ffc107' : '#e4e5e9'}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="quote-icon"><FaQuoteLeft /></div>
                </div>
                <p className="review-text">{item.preview}</p>
              </div>
            ))}
          </div>

          {reviews.length > 0 && (
            <div className="pagination-controls">
              <button
                disabled={page <= 0}
                onClick={() => setPage(page - 1)}
                className="pagination-btn prev-btn"
              >
                <FaArrowLeft size={18} /> Previous
              </button>

              <span className="page-indicator">
                {page + 1} / {totalPages}
              </span>

              <button
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}
                className="pagination-btn next-btn"
              >
                Next <FaArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Review;
