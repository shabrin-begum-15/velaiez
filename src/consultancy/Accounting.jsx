import React from 'react';
import './Accounting.css';
import accountingImg from '../assets/accounting.jpg';
import accountingBg from '../assets/accounting1.jpg';
import accountingImg2 from '../assets/accounting2.jpg';

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
        <div className="accounting-intro">
          <h2>Accounting & Tax Consultation</h2>
          <h3>
            Managing finances and taxes efficiently is the foundation of a successful business.
            Our Accounting & Tax Consultancy services provide expert guidance, helping you navigate
            complex regulations while optimizing financial strategies. Whether you need seamless
            bookkeeping, tax planning, or compliance support, we ensure accuracy and efficiency at every step.
          </h3>
        </div>

        {/* First Zigzag Section (image left, text right) */}
        <div className="accounting-split-section">
          <div className="image-side">
            <img src={accountingImg} alt="Financial Assistance" loading="eager" />
          </div>
          <div className="text-side">
            <ul>
              <li>
                <strong>End-to-End Financial Assistance:</strong> Managing finances effectively is critical for business success. Our accounting and financial solutions ensure accuracy, compliance, and strategic planning, helping businesses streamline operations and maximize profitability.
              </li>
              <li>
                <strong>Growth-Oriented Financial Forecasting:</strong> Gain a competitive edge with precise financial forecasting. We analyze trends, market dynamics, and historical data to provide insightful projections, helping businesses make informed financial decisions.
              </li>
            </ul>
          </div>
        </div>

        {/* Second Zigzag Section (text left, image right) */}
        <div className="accounting-split-section reverse">
          <div className="image-side">
            <img src={accountingImg2} alt="Invoice & Tally Management" loading="eager" />
          </div>
          <div className="text-side">
            <ul>
              <li>
                <strong>Seamless Invoice Management:</strong> Ensure smooth transactions with professional invoicing support. From invoice creation to payment tracking, our services help businesses streamline billing operations, reduce errors, and improve cash flow.
              </li>
              <li>
                <strong>Efficient Tally-Based Financial Management:</strong> Leverage the power of Tally for accurate and efficient accounting. Our Tally accounting solutions help businesses maintain financial records, generate reports, and ensure seamless tax compliance.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
