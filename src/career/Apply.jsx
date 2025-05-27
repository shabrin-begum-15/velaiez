import React, { useState, useEffect } from 'react';
import './Apply.css'; // Assuming you have a CSS file for styling

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const Apply = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    message: '',
    resume: null,
  });
  const [submitted, setSubmitted] = useState(false);

  // Normalize job from XML-like structure
  const normalizeJob = (job) => ({
    id: job.id?.[0] || job.id || '',
    title: job.title?.[0] || '',
    skill: job.skill?.[0] || '',
    qualification: job.qualification?.[0] || '',
    description: job.description?.[0] || '',
    status: job.status?.[0] || 'Open',
  });

  // Fetch jobs on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/jobs`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map(normalizeJob);
        setJobs(normalized.filter((job) => job.status === 'Open'));
      })
      .catch((err) => console.error('Failed to load jobs', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return alert('Please select a job');

    const payload = new FormData();
    payload.append('firstName', formData.firstName);
    payload.append('lastName', formData.lastName);
    payload.append('mobile', formData.mobile);
    payload.append('email', formData.email);
    payload.append('message', formData.message);
    payload.append('resume', formData.resume);
    payload.append('jobTitle', selectedJob.title);

    try {
      const response = await fetch(`${API_BASE}/send-application`, {
        method: 'POST',
        body: payload,
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          mobile: '',
          email: '',
          message: '',
          resume: null,
        });
        setSelectedJob(null);
      } else {
        alert('Failed to submit application.');
      }
    } catch (error) {
      console.error('Application error:', error);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className="apply-container">
      <h1>Apply for a Job</h1>

      <div className="job-selection">
        <label>Select a Job:</label>
        <select
          value={selectedJob?.id || ''}
          onChange={(e) => {
            const job = jobs.find((j) => j.id === e.target.value);
            setSelectedJob(job || null);
          }}
        >
          <option value="">-- Select Job --</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      {selectedJob && (
        <div className="job-details">
          <h2>{selectedJob.title}</h2>
          <p><strong>Skill:</strong> {selectedJob.skill}</p>
          <p><strong>Qualification:</strong> {selectedJob.qualification}</p>
          <p><strong>Description:</strong> {selectedJob.description}</p>
        </div>
      )}

      <form className="application-form" onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
        <input type="tel" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleInputChange} required />
        <textarea name="message" placeholder="Why should we hire you?" value={formData.message} onChange={handleInputChange} required />
        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
        <button type="submit">Submit Application</button>
      </form>

      {submitted && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Thank you for applying!</h2>
            <p>Your application has been sent. We'll get back to you soon.</p>
            <button onClick={() => setSubmitted(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apply;
