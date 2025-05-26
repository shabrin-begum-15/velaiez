import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Apply.css";
import applyBg from "../assets/career.jpg"; // Background image
import careerSideImage from "../assets/career1.png";

const Apply = () => {
  const location = useLocation();
const job = location.state?.job;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
    resume: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("jobTitle", job?.title || "Not Specified");
    formDataToSend.append("resume", formData.resume);

    try {
      const response = await fetch("http://localhost:5000/send-application", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          mobile: "",
          email: "",
          message: "",
          resume: null,
        });
        document.getElementById("apply-form").reset();
      } else {
        alert("Failed to send application. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="apply-container">
      <div className="apply-hero" style={{ backgroundImage: `url(${applyBg})` }}>
        <div className="apply-overlay">
          <h1>Apply Now for {job?.title}</h1>
        </div>
      </div>

      <div className="apply-form-section">
<div className="left-image" style={{ backgroundImage: `url(${careerSideImage})` }} />
        <div className="form-container">
          <h4>LET'S TALK CAREERS</h4>
          <h2>Job Opportunities</h2>

          <form onSubmit={handleSubmit} id="apply-form" className="form">
            <div className="input-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-row">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <label htmlFor="resume-upload" className="upload-label">
              Upload Resume
            </label>
            <input
              id="resume-upload"
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
            />

            <textarea
              name="message"
              placeholder="Give a short note about yourself"
              rows={4}
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit">Submit Application</button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="success-modal">
          <div className="success-modal-content">
            <h2>Application Submitted!</h2>
            <p>
              Your application for <strong>{job?.title}</strong> has been successfully submitted.
            </p>
            <button onClick={() => setShowSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apply;
