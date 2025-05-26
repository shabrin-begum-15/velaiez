import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AboutUs.css';
import { FaCheckCircle } from "react-icons/fa";

import heroImage from '../assets/about.jpg';
import teamImage from '../assets/about1.jpg';
import strategyImage from '../assets/strategy-hand.jpg';
import techIconsImage from '../assets/tech-icons.jpg';

const AboutUs = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="aboutus-container">
      {/* Hero Section */}
      <div
        className="aboutus-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="aboutus-overlay">
          <h1>About Velaiez Consultants LLP</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="aboutus-main">
        <div className="aboutus-row">
          <div className="aboutus-image-card">
            <img src={teamImage} alt="Velaiez Team" />
            <div className="image-caption">
              <h3>Velaiez</h3>
              <p>Consultants LLP</p>
            </div>
          </div>
          <div className="aboutus-text-block">
            <h2>We Provide the Best Advice for Your Business</h2>
            <p>
              At Velaiez Consultants LLP, we're not just consultants; we're your partners in progress.
              Our mission is to guide businesses through the ever-evolving landscape of opportunities and innovations.
            </p>
            <p>
              With a strong focus on excellence, expertise, and ethical practices, we help you navigate industry challenges and thrive in a digital-first world.
            </p>
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="aboutus-approach-section">
          <div className="approach-left">
            <h3>Our Approach:</h3>
            <ul>
              <li><FaCheckCircle className="check-icon" /> Strategic Matchmakers: Crafting connections that align with long-term goals.</li>
              <li><FaCheckCircle className="check-icon" /> Collaborative Focus: Fostering partnerships that fuel mutual growth.</li>
              <li><FaCheckCircle className="check-icon" /> Empowerment Advocates: Nurturing careers and driving business progress.</li>
              <li><FaCheckCircle className="check-icon" /> Future-Minded: Anticipating industry trends to guide strategic placements.</li>
            </ul>
          </div>
          <div className="approach-right">
            <img src={strategyImage} alt="Strategy and innovation" />
          </div>
        </div>

        {/* Specializations Section */}
        <div className="aboutus-specializations">
          <img src={techIconsImage} alt="Tech specializations" />
          <div className="specializations-text">
            <h3>Specializations:</h3>
            <p><strong>Tech Terrain:</strong> Guiding IT professionals to innovative companies.</p>
            <p><strong>Business Frontiers:</strong> Matching visionary business leaders with top roles.</p>
            <p><strong>Global Connections:</strong> Facilitating international recruitment success stories.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
