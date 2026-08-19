"use client";
import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <main className="home-page">
      <header className="navbar">
        <div className="brand">
          <div className="brand-logo">CR</div>

          <div>
            <h1>Campus Resource Hub</h1>
            <p>Student Academic Portal</p>
          </div>
        </div>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/login" className="login-link">
            Login
          </Link>
          <Link href="/register" className="register-link">
            Register
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="badge">🎓 STUDENT RESOURCE PLATFORM</span>

          <h2>
            Everything you need for your
            <span> college journey.</span>
          </h2>

          <p>
            Find notes, previous year question papers and useful study
            materials for your branch, year and semester — all in one place.
          </p>

          <div className="hero-buttons">
            <Link href="/resources" className="primary-btn">
              Explore Resources →
            </Link>

            <Link href="/register" className="secondary-btn">
              Create Account
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-top">
            <span>Resource Hub</span>
            <span className="online">● Online</span>
          </div>

          <div className="big-number">24+</div>

          <p>Academic resources available</p>

          <div className="stats">
            <div>
              <strong>12</strong>
              <span>Notes</span>
            </div>

            <div>
              <strong>8</strong>
              <span>Question Papers</span>
            </div>

            <div>
              <strong>4</strong>
              <span>Study Guides</span>
            </div>
          </div>
        </div>
      </section>

      <section className="search-section">
        <div className="section-title">
          <span>SEARCH</span>
          <h2>Find Your Resources</h2>
          <p>Select your academic details to find relevant resources.</p>
        </div>

        <div className="filters">
          <div className="filter">
            <label>Branch</label>

            <select defaultValue="">
              <option value="" disabled>
                Select Branch
              </option>
              <option>CSE</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>MECH</option>
              <option>CIVIL</option>
            </select>
          </div>

          <div className="filter">
            <label>Year</label>

            <select defaultValue="">
              <option value="" disabled>
                Select Year
              </option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>

          <div className="filter">
            <label>Semester</label>

            <select defaultValue="">
              <option value="" disabled>
                Select Semester
              </option>
              <option>1st Semester</option>
              <option>2nd Semester</option>
            </select>
          </div>

          <Link href="/resources" className="search-btn">
            Find Resources
          </Link>
        </div>
      </section>

      <section className="resources-section">
        <div className="section-title">
          <span>ACADEMICS</span>
          <h2>Explore Resources</h2>
          <p>
            Everything you need to prepare, learn and stay updated.
          </p>
        </div>

        <div className="resource-grid">
          <Link href="/resources" className="resource-card">
            <div className="resource-icon blue">📄</div>

            <h3>Previous Year Papers</h3>

            <p>
              Practice with previous examination papers and understand
              important question patterns.
            </p>

            <span>Explore papers →</span>
          </Link>

          <Link href="/resources" className="resource-card">
            <div className="resource-icon purple">📚</div>

            <h3>Notes</h3>

            <p>
              Access useful subject notes and study materials for your
              semester.
            </p>

            <span>View notes →</span>
          </Link>

          <Link href="/resources" className="resource-card">
            <div className="resource-icon orange">🎓</div>

            <h3>Study Resources</h3>

            <p>
              Discover additional learning resources to support your academic
              preparation.
            </p>

            <span>Start learning →</span>
          </Link>
        </div>
      </section>

      <section className="bottom-banner">
        <div>
          <span>WELCOME TO CAMPUS RESOURCE HUB</span>

          <h2>Your academic resources, organized in one place.</h2>

          <p>
            Create an account to get started with your student resource
            portal.
          </p>
        </div>

        <Link href="/register">Get Started →</Link>
      </section>

      <footer>
        <strong>Campus Resource Hub</strong>
        <span>Student Academic Portal</span>
      </footer>
    </main>
  );
}