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
            <h3>Managing finances and taxes efficiently is the foundation of a successful business. Our Accounting & Tax Consultancy services provide expert guidance, helping you navigate complex regulations while optimizing financial strategies. Whether you need seamless bookkeeping, tax planning, or compliance support, we ensure accuracy and efficiency at every step</h3>
            <ul>
              <li><strong>Accounting & Financials - to be replace with - End-to-End Financial Assistance:</strong> Managing finances effectively is critical for business success. Our accounting and financial solutions ensure accuracy, compliance, and strategic planning, helping businesses streamline operations and maximize profitability</li>
              <li><strong>Financial Forecasting - to be replace with - Growth-Oriented Financial Forecasting:</strong> Gain a competitive edge with precise financial forecasting. We analyze trends, market dynamics, and historical data to provide insightful projections, helping businesses make informed financial decisions</li>
              <li><strong>Invoicing Support - to be replace with - Seamless Invoice Management:</strong> Ensure smooth transactions with professional invoicing support. From invoice creation to payment tracking, our services help businesses streamline billing operations, reduce errors, and improve cash flow.</li>
              <li><strong>Tally Accounting - to be replace with - Efficient Tally-Based Financial Management:</strong> Leverage the power of Tally for accurate and efficient accounting. Our Tally accounting solutions help businesses maintain financial records, generate reports, and ensure seamless tax compliance.</li>
            </ul>
          </div>
        </div>

        <div className="accounting-image-section">
          <img src={accountingImg} alt="Accounting and Tax Consultation" loading="eager" />
        </div>
      </div>s
    </div>
  );
};

export default Accounting;
