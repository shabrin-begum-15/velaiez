import React from 'react';
import './Staffing.css';
import tempImg from '../assets/temp-staffing.jpeg';     // First image
import tempImg2 from '../assets/temp-staffing2.jpg';    // Second image
import tempBg from '../assets/temp-bg.png';             // Background image

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
        {/* Intro */}
        <div className="temp-intro">
          <h2>Temporary Staffing</h2>
          <h3>
            Short-term demands require agile solutions. Our temporary staffing services ensure you get the right talent at the right time to support your ongoing projects.
          </h3>
        </div>

        {/* First Zigzag Section (image left, text right) */}
        <div className="temp-split-section">
          <div className="image-side">
            <img src={tempImg} alt="Contract Staffing" loading="eager" />
          </div>
          <div className="text-side">
            <ul>
              <li><strong>Contract Staffing:</strong> Optimize your workforce with contract staffing. Our consultants connect you with talented professionals who bring expertise and agility to temporary or specialized roles.</li>
              <li><strong>Payroll Management:</strong> Streamline your payroll operations with our expert solutions. From salary calculations to statutory deductions, we ensure precision and reliability.</li>
            </ul>
          </div>
        </div>

        {/* Second Zigzag Section (text left, image right) */}
        <div className="temp-split-section reverse">
          <div className="image-side">
            <img src={tempImg2} alt="Flexible Deployment" loading="eager" />
          </div>
          <div className="text-side">
            <ul>
              <li><strong>Workforce Flexibility:</strong> Optimize productivity with dynamic workforce strategies. We ensure you have the right talent in place, exactly when you need them.</li>
              <li><strong>Quick Deployment:</strong> Speed up hiring with our quick deployment services. We connect you with skilled professionals ready to contribute from day one.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staffing;
