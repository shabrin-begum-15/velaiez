import React, { useEffect } from "react";
import "./Consultancy.css";
import { Link, useLocation } from 'react-router-dom';
import consultancyBg from '../assets/consultancy.jpg';

const Consultancy = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="consultancy-page">
      {/* Hero Section */}
      <div
        className="consultancy-hero"
        style={{ backgroundImage: `url(${consultancyBg})` }}
      >
        <div className="consultancy-overlay">
          <h1>Consultancy</h1>
        </div>
      </div>

      {/* Content Section */}
      <section className="consultancy-content">
        <h3 className="consultancy-subtitle">
          WE THRIVE TO FIND THE RIGHT TALENT AT RIGHT TIME WITH RIGHT COST.
        </h3>
        <h2 className="consultancy-title">Our Services</h2>
        <p className="consultancy-description">
          At Velai Techno Solutions, we understand that finding the right talent is essential for the growth and success of your business.
          Our Recruitment Consultancy Services are designed to assist you in sourcing, selecting, and onboarding top-tier professionals who will drive your organization forward.
        </p>

        {/* Services Grid */}
        <div className="consultancy-services-grid">
          <div className="service-box"><Link to="/placement"><h4>Permanent Placement</h4></Link></div>
          <div className="service-box"><Link to="/staffing"><h4>Temporary Staffing</h4></Link></div>
          <div className="service-box"><Link to="/search"><h4>Executive Search</h4></Link></div>
          <div className="service-box"><Link to="/legal"><h4>Legal Consultancy</h4></Link></div>
          <div className="service-box"><Link to="/accounting"><h4>Accounting & Tax Consultation</h4></Link></div>
          <div className="service-box"><Link to="/financial"><h4>Financial Consultant</h4></Link></div>
        </div>
      </section>
    </div>
  );
};

export default Consultancy;
