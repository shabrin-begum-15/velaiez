import React from 'react';
import './Staffing.css';
import tempImg from '../assets/temp-staffing.jpeg';       // Right-side image
import tempBg from '../assets/temp-bg.png';              // Background image

const Staffing = () => {
  return (
    <div className="temp-page">
      <div
        className="temp-hero"
        style={{ backgroundImage: `url(${tempBg})` }}
      >
        <div className="temp-overlay">
          <h1>Temporary Staffing</h1>
        </div>
      </div>

      <div className="temp-content">
        <div className="text-section">
          <p className="service-label">OUR SERVICES</p>
          <h2>Temporary Staffing</h2>
          <div className="temp-description">
            <h3>Flexible, cost-effective workforce solutions:</h3>
            <ul>
              <li><strong>Contract Staffing:</strong> Short-term roles based on project demands</li>
              <li><strong>Payroll Management:</strong> Compliance, taxes, and salary processing</li>
              <li><strong>Workforce Flexibility:</strong> Scale teams up or down efficiently</li>
              <li><strong>Quick Deployment:</strong> Fast turnaround for immediate needs</li>
            </ul>
          </div>
        </div>

        <div className="Temporary-image-section">
          <img src={tempImg} alt="Temporary Staffing Services" loading="eager" />
        </div>
      </div>
    </div>
  );
};

export default Staffing;
