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
            <h3>We specialize in sourcing senior and leadership talent:</h3>
            <ul>
              <li><strong>C-Level Hiring:</strong> CEOs, CFOs, CTOs and top executives</li>
              <li><strong>Confidential Search:</strong> Discreet and strategic headhunting</li>
              <li><strong>Leadership Mapping:</strong> Market intelligence on leadership roles</li>
              <li><strong>Industry Expertise:</strong> Specialized recruiters for niche sectors</li>
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
