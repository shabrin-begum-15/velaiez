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
          <h1>Permanent Placement</h1>
        </div>
      </div>

      <div className="placement-content">
        {/* Full-width intro */}
        <div className="placement-intro">
          <h2>Permanent Placement</h2>
          <h3>
            With our expertise in permanent placement, we ensure businesses gain employees who are not only skilled but also aligned with their mission and values.
          </h3>
        </div>

        {/* Split layout */}
        <div className="placement-main">
          <div className="text-section">
            <ul>
              <li><strong>Talent Acquisition:</strong> Building a strong workforce starts with hiring the right people. Our consultants engage with you to find permanent candidates who embody your values and contribute to your success.</li>
              <li><strong>Candidate Screening:</strong> Effective candidate screening is essential to finding the right talent. Our consultants carefully evaluate applicants to ensure they meet your requirements and align with your organization's goals.</li>
              <li><strong>Job Matching:</strong> Effective job matching goes beyond qualifications—we consider personality, work culture, and long-term growth to find the best fit for both employers and professionals.</li>
              <li><strong>Onboarding Support:</strong> Strong onboarding builds a foundation for long-term success. Our approach helps new hires acclimate efficiently, fostering productivity and collaboration from day one.</li>
            </ul>
          </div>

          <div className="placement-image-section">
            <img src={placementImg} alt="Permanent Placement Services" loading="eager" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placement;
