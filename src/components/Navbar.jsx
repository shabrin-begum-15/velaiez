import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";

import "./Navbar.css";
import logo from "../assets/velai1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(false);
  const [consultancyOpen, setConsultancyOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [consultancyClicks, setConsultancyClicks] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // More flexible check: check if path starts with /admin or /login
  const isAdminPage =
    location.pathname.startsWith("/login") || location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBar(window.scrollY > 100);
      // Close menus on scroll
      setMenuOpen(false);
      setConsultancyOpen(false);
      setIndustriesOpen(false);
      setConsultancyClicks(0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset menus whenever location changes (e.g. back navigation)
  useEffect(() => {
    setMenuOpen(false);
    setConsultancyOpen(false);
    setIndustriesOpen(false);
    setConsultancyClicks(0);
  }, [location.pathname]);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setConsultancyOpen(false);
    setIndustriesOpen(false);
    setConsultancyClicks(0);
  };

  return (
    <div className={`navbar-container ${showTopBar ? "with-topbar" : ""}`}>
      {showTopBar && (
        <div className="top-bar">
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="logo">
          <Link to="/" onClick={closeAllMenus}>
            <img src={logo} alt="Velai Logo" />
          </Link>
        </div>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          {!isAdminPage && (
            <>
              <li><Link to="/" onClick={closeAllMenus}>HOME</Link></li>
              <li><Link to="/about" onClick={closeAllMenus}>ABOUT US</Link></li>

              <li className={`dropdown ${consultancyOpen ? "open" : ""}`}>
                <div
                  className="dropdown-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    setConsultancyClicks((prev) => prev + 1);

                    if (!consultancyOpen) {
                      setConsultancyOpen(true);
                      setIndustriesOpen(false);
                    } else {
                      if (consultancyClicks >= 1) {
                        closeAllMenus();
                        navigate("/Consultancy");
                      }
                    }
                  }}
                >
                  <span>
                    CONSULTANCY <FaChevronDown className="dropdown-icon" />
                  </span>
                </div>

                {consultancyOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/placement" onClick={closeAllMenus}>Permanent Placement</Link></li>
                    <li><Link to="/staffing" onClick={closeAllMenus}>Temporary Staffing</Link></li>
                    <li><Link to="/search" onClick={closeAllMenus}>Executive Search</Link></li>
                    <li><Link to="/legal" onClick={closeAllMenus}>Legal Consultancy</Link></li>
                    <li><Link to="/accounting" onClick={closeAllMenus}>Accounting and Tax Consultation</Link></li>
                    <li><Link to="/financial" onClick={closeAllMenus}>Financial Consultant</Link></li>
                  </ul>
                )}
              </li>

              <li><Link to="/career" onClick={closeAllMenus}>CAREERS</Link></li>
              <li><Link to="/contact" onClick={closeAllMenus}>CONTACT US</Link></li>
            </>
          )}

          <li>
            <Link to="/login" onClick={closeAllMenus}>ADMIN</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
