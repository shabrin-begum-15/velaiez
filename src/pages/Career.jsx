import React, { useEffect } from 'react';
import './Career.css';
import { Link, useLocation } from 'react-router-dom';
import careerBg from '../assets/career.jpg';

const Career = ({ jobs }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="career-section">
      {/* Hero Section */}
      <div
        className="career-hero"
        style={{ backgroundImage: `url(${careerBg})` }}
      >
        <div className="career-overlay">
          <h1>Career</h1>
          <p className="p1">Join our team and shape your future with us.</p>
        </div>
      </div>

      {/* Job Listings or Fallback */}
      {jobs.length === 0 ? (
        <p className="no-jobs">No jobs available at the moment.</p>
      ) : (
        <div className="career-list">
          <div className="velai">
            <p>Career - Velaiez Consultants LLP</p>
            <h1>Opportunities with Velaiez</h1>
            <h2>Job Posting</h2>
          </div>

          {jobs.map((job) => (
            <div key={job.id} className="career-card">
              <p><strong>Job Title:</strong> {job.title}</p>
              <p><strong>Skill Required:</strong> {job.skill}</p>
              <p className="qualification"><strong>Qualification:</strong> {job.qualification || 'Not specified'}</p>
              <p className="description"><strong>Description:</strong> {job.description}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <Link to="/apply" state={{ job }} className="apply-btn">Apply Now</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Career;
