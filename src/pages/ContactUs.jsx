import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";
import whatsappIcon from "../assets/WhatsApp_icon.png";

// Use VITE_API_BASE for consistency
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/send-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Contact enquiry sent successfully");
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", enquiry: "" });
      } else {
        alert("Failed to send contact enquiry.");
      }
    } catch (error) {
      console.error("Error sending contact enquiry:", error);
      alert("Server error. Please try again later.");
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    navigate("/contact");
  };

  return (
    <div className="contact-container">
      {/* ✅ Contact Info */}
      <div className="contact-info-section">
        <h3>Our Contact Details</h3>
        <p>
          <strong>Address:</strong> No. 1/792, 4th Street, Deivanai Nagar, Madipakkam, Chennai-600091, Tamilnadu, India.
        </p>
        <p>
          <strong>Phone:</strong> <a href="tel:+918939710888">+91 8939710888</a>
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:admin@velaiez.com">admin@velaiez.com</a>
        </p>
        <p>
          <strong>Website:</strong> <a href="http://www.velaiez.com" target="_blank" rel="noopener noreferrer">www.velaiez.com</a>
        </p>

        {/* ✅ Google Map */}
        <div className="map-container">
          <iframe
            title="Velaiez Consultants Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15547.431957254018!2d80.202942!3d12.962778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525da3d7f6c0a7%3A0xe122a6ea4f118e2f!2sDeivanai%20Nagar%2C%20Madipakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600091!5e0!3m2!1sen!2sin!4v1715850578411!5m2!1sen!2sin"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* ✅ Contact Form */}
      <div className="contact-info">
        <h2>For any enquiries, Contact Us</h2>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <input
              className="form-name"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="enquiry"
              placeholder="Enquiry"
              value={formData.enquiry}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* ✅ Thank You Popup */}
      {submitted && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Thank you for reaching out!</h2>
            <p>Our team will review your inquiry and get back to you soon.</p>
            <button className="popup-close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ WhatsApp Button */}
      <a
        href="https://wa.me/918939710888"
        className="whatsapp-chat-button"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon" />
        <span>Chat with us on WhatsApp</span>
      </a>
    </div>
  );
};

export default ContactUs;
