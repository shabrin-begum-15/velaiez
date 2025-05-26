import React, { useState, useEffect } from 'react';
import './Admin.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const initialJobState = {
  title: '',
  skill: '',
  qualification: '',
  description: '',
  status: 'Open',
};

const Admin = ({ jobs, setJobs }) => {
  const [newJob, setNewJob] = useState(initialJobState);
  const [editJobId, setEditJobId] = useState(null);
  const [editJobData, setEditJobData] = useState(initialJobState);
  const [searchTerm, setSearchTerm] = useState('');

  const normalizeJob = (job) => ({
    id: job.id?.[0] || '',
    title: job.title?.[0] || '',
    skill: job.skill?.[0] || '',
    qualification: job.qualification?.[0] || '',
    description: job.description?.[0] || '',
    status: job.status?.[0] || 'Open',
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/jobs`)
      .then(res => res.json())
      .then(data => {
        const normalized = data.map(normalizeJob);
        setJobs(normalized);
      })
      .catch(err => console.error('Failed to load jobs', err));
  }, [setJobs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const addJob = async () => {
    if (!newJob.title.trim() || !newJob.skill.trim() || !newJob.description.trim()) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) throw new Error('Failed to save job to XML');

      const savedJob = await response.json();
      setJobs([...jobs, savedJob]);
      setNewJob(initialJobState);
    } catch (error) {
      alert('Error saving job: ' + error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete job from server');

      setJobs(jobs.filter((job) => job.id !== id));
      if (editJobId === id) setEditJobId(null);
    } catch (error) {
      alert('Error deleting job: ' + error.message);
    }
  };

  const startEdit = (job) => {
    setEditJobId(job.id);
    setEditJobData({ ...job });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditJobData({ ...editJobData, [name]: value });
  };

  const saveEdit = async (id) => {
    const updatedJob = { ...editJobData, id };

    try {
      const response = await fetch(`${API_BASE}/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      });

      if (!response.ok) throw new Error('Failed to update job on server');

      const updatedJobs = jobs.map((job) =>
        job.id === id ? updatedJob : job
      );

      setJobs(updatedJobs);
      setEditJobId(null);
    } catch (error) {
      alert('Error updating job: ' + error.message);
    }
  };

  const cancelEdit = () => {
    setEditJobId(null);
  };

  const filteredJobs = jobs.filter((job) =>
    (job.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.skill || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.qualification || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="job-form">
        <h2>Add New Job</h2>
        <input type="text" name="title" placeholder="Job Title" value={newJob.title} onChange={handleInputChange} />
        <input type="text" name="skill" placeholder="Skill Required" value={newJob.skill} onChange={handleInputChange} />
        <input type="text" name="qualification" placeholder="Qualification Required" value={newJob.qualification} onChange={handleInputChange} />
        <textarea name="description" placeholder="Job Description" value={newJob.description} onChange={handleInputChange} />
        <input type="text" name="status" value="Open" readOnly style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }} />
        <button onClick={addJob}>Add Job</button>
      </div>

      <div className="job-list">
        <h2>Jobs List</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {filteredJobs.length === 0 && <p>No jobs found.</p>}

        {filteredJobs.map((job) => (
          <div key={job.id} className="job-item">
            {editJobId === job.id ? (
              <>
                <input type="text" name="title" value={editJobData.title} onChange={handleEditChange} />
                <input type="text" name="skill" value={editJobData.skill} onChange={handleEditChange} />
                <input type="text" name="qualification" value={editJobData.qualification} onChange={handleEditChange} />
                <textarea name="description" value={editJobData.description} onChange={handleEditChange} />
                <select name="status" value={editJobData.status} onChange={handleEditChange}>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
                <button className="button-save" onClick={() => saveEdit(job.id)}>Save</button>
                <button className="button-cancel" onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3><strong>Title:</strong> {job.title}</h3>
                <p><strong>Skill:</strong> {job.skill}</p>
                <p><strong>Qualification:</strong> {job.qualification}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Status:</strong> {job.status}</p>
                <button className="button-edit" onClick={() => startEdit(job)}>Edit</button>
                <button className="button-delete" onClick={() => deleteJob(job.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
