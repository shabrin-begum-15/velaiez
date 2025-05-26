import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Consultancy from "./pages/Consultancy";
import Adminlogin from "./pages/Adminlogin";
import Career from "./pages/Career";
import Admin from "./pages/Admin";
import AboutUs from './pages/AboutUs';
import Accounting from "./consultancy/Accounting";
import Placement from "./consultancy/Placement";
import Staffing from "./consultancy/Staffing";
import Search from "./consultancy/Search";
import Legal from "./consultancy/Legal";
import Financial from './consultancy/Financial';
import Apply from './career/apply';
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

import "./App.css";

// ProtectedRoute component: checks if admin is logged in
function ProtectedRoute({ children }) {
  // Check login status from localStorage or any auth logic you use
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Redirect to /Login if not logged in
    return <Navigate to="/Login" replace />;
  }
  return children;
}

function App() {
  // Lift jobs state here
  const [jobs, setJobs] = useState(() => {
    const storedJobs = localStorage.getItem('jobs');
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/consultancy" element={<Consultancy />} />
            <Route path="/about" element={<AboutUs />} />
            {/* Protect admin route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin jobs={jobs} setJobs={setJobs} />
                </ProtectedRoute>
              }
            />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/placement" element={<Placement />} />
            <Route path="/staffing" element={<Staffing />} />
            <Route path="/search" element={<Search />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/Login" element={<Adminlogin />} />
            <Route path="/career" element={<Career jobs={jobs} />} />
            <Route path="/apply" element={<Apply />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
