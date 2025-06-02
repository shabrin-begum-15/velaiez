import React from 'react';
import './Search.css';
import executiveImg from '../assets/executive.jpeg';       // Right-side image
import executiveBg from '../assets/executive-bg.jpeg';     // Background image

const Search = () => {
  return (
    <div className="executive-page">
      <div
        className="executive-hero"
        style={{ backgroundImage: `url(${executiveBg})` }}
      >
        <div className="executive-overlay">
          <h1>Executive Search</h1>
        </div>
      </div>

      <div className="executive-content">
        <div className="text-section">
          <p className="service-label">OUR SERVICES</p>
          <h2>Executive Search</h2>
          <div className="executive-description">
            <h3>Finding top-tier executives requires expertise and precision. We conduct tailored searches to secure leaders who bring innovation and strategic direction to your company.</h3>
            <ul>
              <li><strong>C-Level Hiring:</strong> Strategic C-suite placements tailored to your business needs. We source high-caliber executives who strengthen leadership and fuel organizational success.</li>
              <li><strong>Confidential Search:</strong> Secure top executive talent with our confidential search approach, ensuring discretion, exclusivity, and tailored leadership solutions.</li>
              <li><strong>Leadership Mapping:</strong> Leadership mapping provides a comprehensive view of executive talent, helping organizations align their hiring decisions with future business needs.</li>
              <li><strong>Industry Expertise:</strong>Our Consultant ensures you gain executives with the knowledge, skills, and strategic vision needed to excel in competitive markets.</li>
            </ul>
          </div>
        </div>

        <div className="Executive-image-section">
          <img src={executiveImg} alt="Executive Search Services" loading="eager" />
        </div>
      </div>
    </div>
  );
};

export default Search;
