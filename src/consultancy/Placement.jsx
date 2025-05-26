import React from 'react';
import './Placement.css';
import placementImg from '../assets/placement.png';       // Right-side image
import placementBg from '../assets/placement1.png';     // Background image

const Placement = () => {
  return (
    <div className="placement-page">
      <div
        className="placement-hero"
        style={{ backgroundImage: `url(${placementBg})` }}
      >
        <div className="placement-overlay">
          <h1>Permanent Placement </h1>
        </div>
      </div>

      <div className="placement-content">
        <div className="text-section">
          <p className="service-label">OUR SERVICES</p>
          <h2>Permanent Placement</h2>
          <div className="placement-description">
            <h3>We connect skilled professionals with long-term career opportunities:</h3>
            <ul>
              <li><strong>Talent Acquisition:</strong> Sourcing candidates through multi-channel recruitment</li>
              <li><strong>Candidate Screening:</strong> Rigorous evaluation and shortlisting process</li>
              <li><strong>Job Matching:</strong> Aligning candidate skills with organizational requirements</li>
              <li><strong>Onboarding Support:</strong> Smooth transition and documentation support</li>
            </ul>
          </div>
        </div>

        <div className="Permanent-image-section">
          <img src={placementImg} alt="Permanent Placement Services" />
        </div>
      </div>
    </div>
  );
};

export default Placement;
