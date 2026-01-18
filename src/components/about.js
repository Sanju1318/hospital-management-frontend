import React, { useEffect, useState } from 'react';
import './about.css';

const About = () => {
    const [show, setShow] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        view();
    }, []);

    const view = async () => {
        try {
            const rest = await fetch(
                `${process.env.REACT_APP_API_URL}/doctor`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await rest.json();
            if (result) {
                setShow(result);
            }
        } catch (error) {
            console.error("Error fetching leadership data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="about-section">
                <div className="about-container">

                    {/* Header Section */}
                    <div className="about-header">
                        <h2 className="about-main-title">About Medicare Hospital</h2>
                        <div className="title-underline"></div>
                        <p className="about-subtitle">
                            Pioneering Healthcare Excellence Since 1995
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="about-content">
                        <div className="content-grid">

                            <div className="content-text">
                                <div className="text-block">
                                    <h3>Our Legacy of Care</h3>
                                    <p>
                                        Established in 1995, our hospital has been dedicated to providing world-class healthcare to the community.
                                    </p>
                                </div>

                                <div className="text-block">
                                    <h3>Our Mission</h3>
                                    <p>
                                        Our mission is to improve health outcomes through excellence in patient care, medical education, and research.
                                    </p>
                                </div>

                                <div className="text-block">
                                    <h3>Expert Medical Team</h3>
                                    <p>
                                        With over 300 specialists and a multidisciplinary care team.
                                    </p>
                                </div>
                            </div>

                            <div className="stats-section">
                                <div className="stat-card">
                                    <div className="stat-icon">🏥</div>
                                    <div className="stat-number">28+</div>
                                    <div className="stat-label">Years of Service</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">👨‍⚕️</div>
                                    <div className="stat-number">300+</div>
                                    <div className="stat-label">Specialists</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">💖</div>
                                    <div className="stat-number">50K+</div>
                                    <div className="stat-label">Patients Served</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">⭐</div>
                                    <div className="stat-number">99%</div>
                                    <div className="stat-label">Success Rate</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Leadership Team */}
                    <div className="team-section">
                        <div className="team-header">
                            <h3 className="team-main-title">Meet Our Leadership Team</h3>
                            <p className="team-subtitle">
                                Visionary leaders driving healthcare innovation
                            </p>
                            <div className="title-underline"></div>
                        </div>

                        {loading ? (
                            <div className="team-cards">
                                {[...Array(4)].map((_, idx) => (
                                    <div className="team-card loading" key={idx}>
                                        <div className="team-photo-skeleton"></div>
                                        <div className="team-info-skeleton">
                                            <div className="skeleton-line name"></div>
                                            <div className="skeleton-line qualification"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="team-cards">
                                {show.map((l, idx) => (
                                    <div className="team-card" key={idx}>
                                        <div className="card-inner">

                                            <div className="image-container">
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/doctor/image/${l.lphoto}`}
                                                    alt={l.lname}
                                                    className="team-photo"
                                                />
                                            </div>

                                            <div className="team-info">
                                                <h4 className="leader-name">{l.lname}</h4>
                                                <p className="leader-qualification">{l.lqualification}</p>
                                                <span className="experience-tag">15+ Years Exp</span>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default About;
