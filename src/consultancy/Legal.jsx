import React from 'react';
import './Legal.css';
import legalImg from '../assets/legal.jpeg'; // Right-side image
import legalBg from '../assets/legal-bg.jpg'; // Background image

const Legal = () => {
  return (
    <div className="legal-page">
      <div
        className="legal-hero"
        style={{ backgroundImage: `url(${legalBg})` }}
      >
        <div className="legal-overlay">
          <h1>Legal Consultancy</h1>
        </div>
      </div>

      <div className="legal-content">
        <div className="text-section">
          <h2>Legal Support</h2>
          <div className="legal-description">
            <ul>
              <li><strong></strong> The legal team  is responsible for ensuring compliance with all applicable laws, managing regulatory requirements, overseeing business registrations and licenses, drafting and reviewing contracts, agreements, and notices, handling employee-related legal matters, resolving disputes, mitigating risks, and safeguarding the company's interests through structured legal documentation and governance policies.</li>
            </ul>
          </div>
        </div>

        <div className="legal-image-section">
          <img src={legalImg} alt="Legal Consultancy" loading="eager" />
        </div>
      </div>
    </div>
  );
};

export default Legal;
