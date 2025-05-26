import React, { useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom'; // ✅ Added
import About from "../assets/image2.png";
import healthcare from "../assets/heathcare.jpg";
import construction from "../assets/construction.jpg";
import marketing from "../assets/marketing.jpg";
import it from "../assets/it.jpg";

const Home = () => {
  
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const industries = [
    { image: healthcare, title: 'Healthcare and Medical' },
    { image: construction, title: 'Engineering and Construction' },
    { image: marketing, title: 'Marketing and Advertising' },
    { image: it, title: 'Information Technology (IT)' }
  ];

  return (
    <>
      {/* Home Section */}
      <div className="home-container">
        <div className="overlay">
          <h2 className="welcome-text">WELCOME TO VELAIEZ CONSULTANTS LLP</h2>
          <h1 className="main-heading">
            "We are dedicated to guiding you towards rewarding career opportunities and helping you achieve lasting success."
          </h1>
          {/* ✅ Fixed Navigation Button */}
          <Link to="/contact">
            <button className="contact-button">CONTACT US</button>
          </Link>
        </div>
      </div>

      {/* About Us Section */}
      <section className="about-us-container">
        <div className="about-us-content">
          <div className="about-us-image">
            <img src={About} alt="About Velaiez Consultants" />
          </div>
          <div className="about-us-text">
            <h2 className="section-title about-title">About Us</h2>
            <p className="about-description">
              Velaiez Consultants LLP is a trusted recruitment and consultancy firm committed to connecting businesses with the best talent in the industry. With years of expertise, we ensure personalized and effective recruitment solutions that drive success for both clients and candidates.
            </p>
<Link to="/about">
  <button className="learn-more-btn">LEARN MORE</button>
</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-container">
        <div className="text-content">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="description">
            At Velaiez Consultants LLP, we recognize that finding the right talent is crucial for the growth and success of your business. Our Recruitment Consultancy Services are dedicated to helping you source, select, and onboard top-tier professionals who will propel your organization forward.
          </p>
        </div>
        <div className="buttons-grid">
          <button className="gradient-btn"><Link to="/placement">
                <h4>Permanent Placement</h4>
              </Link>
              </button>
          <button className="gradient-btn"><Link to="/staffing">
                <h4>Temporary Staffing</h4>
              </Link>
              </button>
          <button className="gradient-btn"> <Link to="/search">
                <h4>Executive Search</h4>
              </Link>
              </button>
          <button className="gradient-btn"><Link to="/legal">
                <h4>Legal Consultancy</h4>
              </Link>
              </button>
          <button className="gradient-btn"><Link to="/accounting">
                <h4>Accounting & Tax Consultation</h4>
              </Link>
              </button>
          <button className="gradient-btn"><Link to="/financial">
                <h4>Financial Consultant</h4>
              </Link></button>
        </div>
      </section>
    </>
  );
};

export default Home;
