import React from 'react';
import './Search.css';
import executiveImg from '../assets/executive-bg.jpeg';     // First image
import executiveImg2 from '../assets/executive2.jpg';       // Second image
import executiveBg from '../assets/executive.jpeg';         // Background image

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
        {/* Intro Section */}
        <div className="executive-intro">
          <h2>Executive Search</h2>
          <h3>
            Finding top-tier executives requires expertise and precision. We conduct tailored searches to secure leaders who bring innovation and strategic direction to your company.
          </h3>
        </div>

        {/* First Zigzag Section (image left, text right) */}
        <div className="executive-split-section">
          <div className="image-side">
            <img src={executiveImg} alt="Executive Search Services" loading="eager" />
          </div>
          <div className="text-side">
            <ul>
              <li><strong>C-Level Hiring:</strong> Strategic C-suite placements tailored to your business needs. We source high-caliber executives who strengthen leadership and fuel organizational success.</li>
              <li><strong>Confidential Search:</strong> Secure top executive talent with our confidential search approach, ensuring discretion, exclusivity, and tailored leadership solutions.</li>
            </ul>
          </div>
        </div>

        {/* Second Zigzag Section (text left, image right) */}
        <div className="executive-split-section reverse">
          <div className="image-side">
            <img src={executiveImg2} alt="Leadership Strategy" loading="eager" />
          </div>
          <div className="text-side">
            <ul>
              <li><strong>Leadership Mapping:</strong> Leadership mapping provides a comprehensive view of executive talent, helping organizations align their hiring decisions with future business needs.</li>
              <li><strong>Industry Expertise:</strong> Our consultant ensures you gain executives with the knowledge, skills, and strategic vision needed to excel in competitive markets.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
