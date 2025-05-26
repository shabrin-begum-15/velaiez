import React from "react";
import { Link } from "react-router-dom";
import {FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="foot">@2025 Velaiez Consulatants LLP . All rights reserved</p>
      <p className="foot">
        For any enquiry:&nbsp;
        <Link to="/contact" className="footer-link">
          Contact Us
        </Link>
      </p>

      {/* Follow Us Section */}
      <div className="follow-us">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="icon facebook" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon instagram" />
          </a>
          <a href="https://wa.me/918939710888" target="_blank" rel="noopener noreferrer">
           <FaWhatsapp className="icon whatsapp" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="icon twitter" />
            </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="icon linkedin" />
            </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="icon youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;