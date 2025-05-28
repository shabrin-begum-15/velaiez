import React from 'react';
import './Financial.css';
import financeImg from '../assets/financial.jpg';
import financeBg from '../assets/financial-bg.jpg';

const Financial = () => {
  return (
    <div className="financial-page">
      <div
        className="financial-hero"
        style={{ backgroundImage: `url(${financeBg})` }}
      >
        <div className="financial-overlay">
          <h1>Financial Consultancy</h1>
        </div>
      </div>

      <div className="financial-content">
        <div className="text-section">
          <p className="service-label">OUR SERVICES</p>
          <h2>Financial Strategy</h2>
          <div className="financial-description">
            <h3>Our financial experts assist with:</h3>
            <ul>
              <li><strong>Business Budgeting:</strong> Customized budgeting for startups and enterprises</li>
              <li><strong>Investment Planning:</strong> Strategic planning for capital allocation</li>
              <li><strong>Cash Flow Management:</strong> Monitoring and optimizing business liquidity</li>
              <li><strong>Risk Analysis:</strong> Assessing financial risks and mitigation strategies</li>
            </ul>
          </div>
        </div>

        <div className="financial-image-section">
          <img src={financeImg} alt="Financial Consultancy" loading="eager" />
        </div>
      </div>
    </div>
  );
};

export default Financial;
