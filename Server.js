import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import xml2js from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
const xmlFilePath = path.join(__dirname, 'Admin.xml');

// Helper to convert jobs array to XML
const convertToXML = (jobs) => {
  const builder = new xml2js.Builder();
  return builder.buildObject({ jobs: { job: jobs } });
};

// ✅ GET all jobs from Admin.xml
app.get('/api/jobs', (req, res) => {
  if (!fs.existsSync(xmlFilePath)) {
    // If file doesn't exist, return empty list
    return res.json([]);
  }

  fs.readFile(xmlFilePath, (err, data) => {
    if (err) return res.status(500).send('Error reading XML file');

    xml2js.parseString(data, (err, result) => {
      if (err || !result || !result.jobs) {
        return res.json([]);
      }

      const jobs = result.jobs.job || [];
      res.json(jobs);
    });
  });
});

// ✅ POST - Add a new job
app.post('/api/jobs', (req, res) => {
  const newJob = req.body;

  fs.readFile(xmlFilePath, (err, data) => {
    let jobs = [];

    const parseAndWrite = (jobsList) => {
      // Extract existing IDs as numbers, ignore non-numeric or missing IDs
      const ids = jobsList.map(job => Number(job.id)).filter(id => !isNaN(id));
      const maxId = ids.length > 0 ? Math.max(...ids) : 0;
      const generatedId = (maxId + 1).toString();

      // Add the new job with generated ID
      jobsList.push({
        id: generatedId,
        title: newJob.title || '',
        skill: newJob.skill || '',
        qualification: newJob.qualification || '',
        description: newJob.description || '',
        status: newJob.status || 'Open',
        
      });

      // Convert updated jobs list to XML
      const xml = convertToXML(jobsList);

      fs.writeFile(xmlFilePath, xml, (err) => {
        if (err) return res.status(500).send('Error writing XML');
        res.status(200).json({ id: generatedId, ...newJob });
      });
    };

    if (err && err.code === 'ENOENT') {
      // File doesn't exist yet, start fresh
      return parseAndWrite([]);
    }

    if (data) {
      xml2js.parseString(data, (err, result) => {
        if (err) return res.status(500).send('Error parsing XML');

        // Make sure to get jobs array, or empty array if none
        jobs = result?.jobs?.job || [];
        parseAndWrite(jobs);
      });
    } else {
      parseAndWrite([]);
    }
  });
});


// ✅ DELETE job by ID
app.delete('/api/jobs/:id', (req, res) => {
  const jobId = req.params.id;

  fs.readFile(xmlFilePath, (err, data) => {
    if (err) return res.status(500).send('Error reading XML file');

    xml2js.parseString(data, (err, result) => {
      if (err) return res.status(500).send('Error parsing XML');

      let jobs = result?.jobs?.job || [];
      const updatedJobs = jobs.filter(job => job.id[0] !== jobId);

      const xml = convertToXML(updatedJobs);
      fs.writeFile(xmlFilePath, xml, (err) => {
        if (err) return res.status(500).send('Error writing XML');
        res.status(200).json({ message: 'Job deleted' });
      });
    });
  });
});

// ✅ PUT - Edit job by ID
app.put('/api/jobs/:id', (req, res) => {
  const jobId = req.params.id;
  const updatedJob = req.body;

  fs.readFile(xmlFilePath, (err, data) => {
    if (err) return res.status(500).send('Error reading XML file');

    xml2js.parseString(data, (err, result) => {
      if (err) return res.status(500).send('Error parsing XML');

      let jobs = result?.jobs?.job || [];
      const newJobs = jobs.map(job => {
        if (job.id[0] === jobId) {
          return {
            id: [jobId],
            title: [updatedJob.title],
            skill: [updatedJob.skill],
            qualification: [updatedJob.qualification],
            description: [updatedJob.description],
            status: [updatedJob.status],
          };
        }
        return job;
      });

      const xml = convertToXML(newJobs);
      fs.writeFile(xmlFilePath, xml, (err) => {
        if (err) return res.status(500).send('Error writing XML');
        res.status(200).json({ message: 'Job updated' });
      });
    });
  });
});


// ✅ Job Application (with resume)
app.post('/send-application', upload.single('resume'), async (req, res) => {
  const { firstName, lastName, mobile, email, message, jobTitle } = req.body;
  const resume = req.file;

  if (!resume) return res.status(400).json({ message: 'Resume not uploaded' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shabrinbegum15102001@gmail.com',
      pass: 'mfzf vjev oefa pweo',
    },
  });

  const mailOptions = {
    from: email,
    to: 'shabrinbegum15102001@gmail.com',
    subject: `Job Application: ${jobTitle}`,
    text: `
New Job Application:

Name: ${firstName} ${lastName}
Email: ${email}
Mobile: ${mobile}
Message: ${message}
    `,
    attachments: [
      {
        filename: resume.originalname,
        path: resume.path,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    fs.unlinkSync(resume.path);
    res.status(200).json({ message: 'Application sent with resume.' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send application' });
  }
});

// ✅ Contact form (no file)
app.post('/send-contact', async (req, res) => {
  const { name, email, phone, enquiry } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shabrinbegum15102001@gmail.com',
      pass: 'mfzf vjev oefa pweo',
    },
  });

  const mailOptions = {
    from: email,
    to: 'shabrinbegum15102001@gmail.com',
    subject: 'New Contact Enquiry',
    text: `
New Contact Enquiry:

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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));