// server.js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import xml2js from 'xml2js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
const xmlFilePath = path.join(__dirname, 'Admin.xml');

// Serve frontend files
app.use(express.static(path.join(__dirname, 'dist')));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Convert job array to XML
const convertToXML = (jobs) => {
  const builder = new xml2js.Builder();
  return builder.buildObject({ jobs: { job: jobs } });
};

// GET all jobs
app.get('/api/jobs', (req, res) => {
  if (!fs.existsSync(xmlFilePath)) return res.json([]);
  fs.readFile(xmlFilePath, (err, data) => {
    if (err) return res.status(500).send('Error reading XML');
    xml2js.parseString(data, (err, result) => {
      if (err || !result || !result.jobs) return res.json([]);
      res.json(result.jobs.job || []);
    });
  });
});

// POST new job
app.post('/api/jobs', (req, res) => {
  const newJob = req.body;
  fs.readFile(xmlFilePath, (err, data) => {
    let jobs = [];
    const parseAndWrite = (jobsList) => {
      const ids = jobsList.map(job => Number(job.id)).filter(id => !isNaN(id));
      const maxId = ids.length > 0 ? Math.max(...ids) : 0;
      const generatedId = (maxId + 1).toString();

      jobsList.push({
        id: generatedId,
        title: newJob.title || '',
        skill: newJob.skill || '',
        qualification: newJob.qualification || '',
        description: newJob.description || '',
        status: newJob.status || 'Open',
      });

      const xml = convertToXML(jobsList);
      fs.writeFile(xmlFilePath, xml, (err) => {
        if (err) return res.status(500).send('Error writing XML');
        res.status(200).json({ id: generatedId, ...newJob });
      });
    };

    if (err && err.code === 'ENOENT') return parseAndWrite([]);
    if (data) {
      xml2js.parseString(data, (err, result) => {
        if (err) return res.status(500).send('Error parsing XML');
        jobs = result?.jobs?.job || [];
        parseAndWrite(jobs);
      });
    } else {
      parseAndWrite([]);
    }
  });
});

// DELETE job
app.delete('/api/jobs/:id', (req, res) => {
  const jobId = req.params.id;
  fs.readFile(xmlFilePath, (err, data) => {
    if (err) return res.status(500).send('Error reading XML');
    xml2js.parseString(data, (err, result) => {
      if (err) return res.status(500).send('Error parsing XML');
      const jobs = result?.jobs?.job || [];
      const updatedJobs = jobs.filter(job => job.id[0] !== jobId);
      const xml = convertToXML(updatedJobs);
      fs.writeFile(xmlFilePath, xml, (err) => {
        if (err) return res.status(500).send('Error writing XML');
        res.status(200).json({ message: 'Job deleted' });
      });
    });
  });
});

// PUT update job
app.put('/api/jobs/:id', (req, res) => {
  const jobId = req.params.id;
  const updatedJob = req.body;
  fs.readFile(xmlFilePath, (err, data) => {
    if (err) return res.status(500).send('Error reading XML');
    xml2js.parseString(data, (err, result) => {
      if (err) return res.status(500).send('Error parsing XML');
      const jobs = result?.jobs?.job || [];
      const newJobs = jobs.map(job =>
        job.id[0] === jobId
          ? {
              id: [jobId],
              title: [updatedJob.title],
              skill: [updatedJob.skill],
              qualification: [updatedJob.qualification],
              description: [updatedJob.description],
              status: [updatedJob.status],
            }
          : job
      );
      const xml = convertToXML(newJobs);
      fs.writeFile(xmlFilePath, xml, (err) => {
        if (err) return res.status(500).send('Error writing XML');
        res.status(200).json({ message: 'Job updated' });
      });
    });
  });
});

// Job Application via Email
app.post('/send-application', upload.single('resume'), async (req, res) => {
  const { firstName, lastName, mobile, email, message, jobTitle } = req.body;
  const resume = req.file;
  if (!resume) return res.status(400).json({ message: 'Resume not uploaded' });

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: `Job Application: ${jobTitle}`,
    text: `
Name: ${firstName} ${lastName}
Email: ${email}
Mobile: ${mobile}
Message: ${message}
    `,
    attachments: [{ filename: resume.originalname, path: resume.path }],
  };

  try {
    await transporter.sendMail(mailOptions);
    fs.unlinkSync(resume.path); // Delete uploaded file
    res.status(200).json({ message: 'Application sent with resume.' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send application' });
  }
});

// Contact Form Email
app.post('/send-contact', async (req, res) => {
  const { name, email, phone, enquiry } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: 'New Contact Enquiry',
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${enquiry}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Enquiry sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send enquiry' });
  }
});

// Catch-all to serve React frontend
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
