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
    id: job.id?.[0] || job.id || '',
    title: job.title?.[0] || '',
    skill: job.skill?.[0] || '',
    qualification: job.qualification?.[0] || '',
    description: job.description?.[0] || '',
    status: job.status?.[0] || 'Open',
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/jobs`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map(normalizeJob);
        setJobs(normalized);
      })
      .catch((err) => console.error('Failed to load jobs', err));
  }, [setJobs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const addJob = async () => {
    if (!newJob.title || !newJob.skill || !newJob.description) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) throw new Error('Failed to add job');

      const savedJob = await res.json();
      setJobs([...jobs, savedJob]);
      setNewJob(initialJobState);
    } catch (err) {
      alert('Error adding job: ' + err.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete job');
      setJobs(jobs.filter((job) => job.id !== id));
      if (editJobId === id) setEditJobId(null);
    } catch (err) {
      alert('Error deleting job: ' + err.message);
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
    try {
      const res = await fetch(`${API_BASE}/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editJobData),
      });

      if (!res.ok) throw new Error('Failed to update job');

      const updatedJobs = jobs.map((job) => (job.id === id ? editJobData : job));
      setJobs(updatedJobs);
      setEditJobId(null);
    } catch (err) {
      alert('Error updating job: ' + err.message);
    }
  };

  const cancelEdit = () => setEditJobId(null);

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
        <input name="title" placeholder="Job Title" value={newJob.title} onChange={handleInputChange} />
        <input name="skill" placeholder="Skill Required" value={newJob.skill} onChange={handleInputChange} />
        <input name="qualification" placeholder="Qualification" value={newJob.qualification} onChange={handleInputChange} />
        <textarea name="description" placeholder="Description" value={newJob.description} onChange={handleInputChange} />
        <input name="status" value="Open" readOnly />
        <button onClick={addJob}>Add Job</button>
      </div>

      <div className="job-list">
        <h2>Jobs List</h2>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredJobs.length === 0 && <p>No jobs found.</p>}

        {filteredJobs.map((job) => (
          <div key={job.id} className="job-item">
            {editJobId === job.id ? (
              <>
                <input name="title" value={editJobData.title} onChange={handleEditChange} />
                <input name="skill" value={editJobData.skill} onChange={handleEditChange} />
                <input name="qualification" value={editJobData.qualification} onChange={handleEditChange} />
                <textarea name="description" value={editJobData.description} onChange={handleEditChange} />
                <select name="status" value={editJobData.status} onChange={handleEditChange}>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
                <button onClick={() => saveEdit(job.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3>Title: {job.title}</h3>
                <p>Skill: {job.skill}</p>
                <p>Qualification: {job.qualification}</p>
                <p>Description: {job.description}</p>
                <p>Status: {job.status}</p>
                <button onClick={() => startEdit(job)}>Edit</button>
                <button onClick={() => deleteJob(job.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
