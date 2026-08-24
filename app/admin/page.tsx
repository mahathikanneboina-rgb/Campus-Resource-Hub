"use client";

import { useState } from "react";
import Link from "next/link";
import "./admin.css";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Notes");
  const [branch, setBranch] = useState("CSE");
  const [year, setYear] = useState("1st Year");
  const [semester, setSemester] = useState("1st Semester");
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !link.trim()) {
      alert("Please enter the resource title and link.");
      return;
    }

    alert("Resource added successfully!");

    setTitle("");
    setLink("");
  };

  return (
    <main className="admin-page">

      <header className="admin-header">
        <div>
          <h1>Campus Resource Hub</h1>
          <p>Admin Dashboard</p>
        </div>

        <Link href="/resources">
          View Resources
        </Link>
      </header>

      <section className="admin-container">

        <div className="admin-intro">
          <span>ADMIN PANEL</span>

          <h2>Add New Resource</h2>

          <p>
            Add study materials, notes and question papers
            for students.
          </p>
        </div>

        <form
          className="resource-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group full-width">
            <label htmlFor="title">
              Resource Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Example: DBMS Unit 1 Notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="type">
              Resource Type
            </label>

            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Notes">Notes</option>
              <option value="Question Paper">
                Question Paper
              </option>
              <option value="Study Material">
                Study Material
              </option>
              <option value="Assignment">
                Assignment
              </option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="branch">
              Branch
            </label>

            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="year">
              Year
            </label>

            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="semester">
              Semester
            </label>

            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="1st Semester">
                1st Semester
              </option>

              <option value="2nd Semester">
                2nd Semester
              </option>
            </select>
          </div>


          <div className="form-group full-width">
            <label htmlFor="link">
              Resource Link
            </label>

            <input
              id="link"
              type="url"
              placeholder="https://example.com/resource"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>


          <div className="form-actions">
            <button type="submit">
              Add Resource
            </button>

            <Link href="/resources">
              Cancel
            </Link>
          </div>

        </form>

      </section>

    </main>
  );
}