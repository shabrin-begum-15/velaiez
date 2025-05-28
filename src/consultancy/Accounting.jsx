import React from 'react';
import './Accounting.css';
import accountingImg from '../assets/accounting.jpg';
import accountingBg from '../assets/accounting1.jpg';

const Accounting = () => {
  return (
    <div className="accounting-page">
      <div
        className="accounting-hero"
        style={{ backgroundImage: `url(${accountingBg})` }}
      >
        <div className="accounting-overlay">
          <h1>Accounting & Tax Consultation</h1>
        </div>
      </div>

      <div className="accounting-content">
        <div className="text-section">
          <p className="service-label">OUR SERVICES</p>
          <h2>Accounting & Tax Consultation</h2>
          <div className="accounting-description">
            <h3>Our accounting and financial services include:</h3>
            <ul>
              <li><strong>Accounting & Financials:</strong> Bookkeeping and financial statement preparation</li>
              <li><strong>Financial Forecasting:</strong> Projections based on past performance</li>
              <li><strong>Invoicing Support:</strong> Invoice preparation & upload via QuickBooks/Salesforce</li>
              <li><strong>Tally Accounting:</strong> Journal entries and financial reporting in Tally</li>
            </ul>
          </div>
        </div>

        <div className="accounting-image-section">
          <img src={accountingImg} alt="Accounting and Tax Consultation" loading="eager" />
        </div>
      </div>
    </div>
  );
};

export default Accounting;
