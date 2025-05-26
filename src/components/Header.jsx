import React from "react";
import Navbar from "./Navbar";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      {/* Optional: You can add a top announcement bar here */}
      <div className="announcement-bar">
        <p>Welcome to Velaiez Consultants! Your trusted partner in consultancy services.</p>
      </div>

      {/* Navbar is included inside header */}
      <Navbar />
    </header>
  );
};

export default Header;
