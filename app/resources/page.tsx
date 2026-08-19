"use client";

import Link from "next/link";
import "./resources.css";

export default function Resources() {
  return (
    <main className="resources-page">

      <header className="resources-header">
        <div>
          <h1>Campus Resource Hub</h1>
          <p>Study materials for college students</p>
        </div>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/login">Login</Link>
          <Link href="/register" className="register-button">
            Register
          </Link>
        </nav>
      </header>

      <section className="resources-intro">
        <span>STUDY MATERIALS</span>

        <h2>Find Your Resources</h2>

        <p>
          Select the resources you need for your branch, year and semester.
        </p>
      </section>

      <section className="resource-filters">

        <div>
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

        <div>
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

        <div>
          <label>Semester</label>

          <select defaultValue="">
            <option value="" disabled>
              Select Semester
            </option>
            <option>1st Semester</option>
            <option>2nd Semester</option>
          </select>
        </div>

        <button>Search</button>

      </section>

      <section className="resource-list">

        <div className="resource-item">
          <div className="resource-image blue-box">
            📄
          </div>

          <div className="resource-info">
            <span className="resource-type">QUESTION PAPER</span>

            <h3>DBMS Previous Year Question Paper</h3>

            <p>
              Previous examination paper for Computer Science students.
            </p>

            <div className="resource-details">
              <span>CSE</span>
              <span>3rd Year</span>
              <span>1st Semester</span>
            </div>
          </div>

          <button className="view-button">
            View
          </button>
        </div>


        <div className="resource-item">
          <div className="resource-image purple-box">
            📚
          </div>

          <div className="resource-info">
            <span className="resource-type">NOTES</span>

            <h3>Operating Systems Notes</h3>

            <p>
              Important topics and notes for Operating Systems preparation.
            </p>

            <div className="resource-details">
              <span>CSE</span>
              <span>3rd Year</span>
              <span>1st Semester</span>
            </div>
          </div>

          <button className="view-button">
            View
          </button>
        </div>


        <div className="resource-item">
          <div className="resource-image orange-box">
            🎓
          </div>

          <div className="resource-info">
            <span className="resource-type">STUDY RESOURCE</span>

            <h3>Data Structures Study Material</h3>

            <p>
              Helpful study material for understanding Data Structures.
            </p>

            <div className="resource-details">
              <span>CSE</span>
              <span>2nd Year</span>
              <span>2nd Semester</span>
            </div>
          </div>

          <button className="view-button">
            View
          </button>
        </div>

      </section>

      <footer className="resources-footer">
        <strong>Campus Resource Hub</strong>

        <span>
          Student Academic Portal
        </span>
      </footer>

    </main>
  );
}