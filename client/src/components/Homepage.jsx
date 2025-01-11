import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to the JEE/NEET Test Platform</h1>
          <p>
            Revolutionize your preparation with a cutting-edge test interface,
            detailed performance analysis, and seamless management tools.
          </p>
          <a href="#features" className="cta-button">Explore Features</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Our Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>Realistic Test Interface</h3>
              <p>Experience a test interface designed to mimic the real exam environment.</p>
            </div>
            <div className="feature-item">
              <h3>Detailed Performance Analysis</h3>
              <p>
                Get insights into your strengths and weaknesses with detailed graphs and charts.
              </p>
            </div>
            <div className="feature-item">
              <h3>Upcoming Test Calendar</h3>
              <p>Stay updated with test schedules and syllabus reminders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
