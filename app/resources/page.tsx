"use client";

import { useState } from "react";
import "./resources.css";

const resources = [
  {
    title: "DBMS Previous Year Question Paper",
    type: "Question Paper",
    branch: "CSE",
    year: "3rd Year",
    semester: "1st Semester",
  },
  {
    title: "Operating Systems Notes",
    type: "Notes",
    branch: "CSE",
    year: "3rd Year",
    semester: "1st Semester",
  },
  {
    title: "Data Structures Study Material",
    type: "Study Material",
    branch: "CSE",
    year: "2nd Year",
    semester: "2nd Semester",
  },
  {
    title: "Computer Networks Notes",
    type: "Notes",
    branch: "CSE",
    year: "3rd Year",
    semester: "2nd Semester",
  },
  {
    title: "Digital Electronics Question Paper",
    type: "Question Paper",
    branch: "ECE",
    year: "2nd Year",
    semester: "1st Semester",
  },
  {
    title: "Engineering Mathematics Notes",
    type: "Notes",
    branch: "ECE",
    year: "1st Year",
    semester: "1st Semester",
  },
];

export default function Resources() {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const filteredResources = resources.filter((resource) => {
    return (
      (branch === "" || resource.branch === branch) &&
      (year === "" || resource.year === year) &&
      (semester === "" || resource.semester === semester)
    );
  });

  const clearFilters = () => {
    setBranch("");
    setYear("");
    setSemester("");
  };

  return (
    <main className="resources-page">

      <header className="resources-header">
        <div>
          <h1>Campus Resource Hub</h1>
          <p>Academic resources for students</p>
        </div>

        <a href="/">Home</a>
      </header>

      <section className="resources-intro">
        <span>RESOURCE LIBRARY</span>

        <h2>Find Your Resources</h2>

        <p>
          Select your branch, year and semester to find
          relevant study materials.
        </p>
      </section>

      <section className="filter-section">

        <div className="filter-box">

          <label>Branch</label>

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>

        </div>

        <div className="filter-box">

          <label>Year</label>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

        </div>

        <div className="filter-box">

          <label>Semester</label>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">All Semesters</option>
            <option value="1st Semester">
              1st Semester
            </option>
            <option value="2nd Semester">
              2nd Semester
            </option>
          </select>

        </div>

        <button
          className="clear-button"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </section>

      <section className="resource-list">

        <div className="resource-heading">
          <h2>Available Resources</h2>

          <span>
            {filteredResources.length} resource
            {filteredResources.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filteredResources.length === 0 ? (

          <div className="no-resources">
            <div>📚</div>

            <h3>No resources found</h3>

            <p>
              Try changing your branch, year or semester.
            </p>
          </div>

        ) : (

          <div className="resource-grid">

            {filteredResources.map((resource, index) => (

              <div
                className="resource-card"
                key={index}
              >

                <div className="resource-icon">
                  {resource.type === "Notes"
                    ? "📚"
                    : resource.type === "Question Paper"
                    ? "📄"
                    : "🎓"}
                </div>

                <span className="resource-type">
                  {resource.type}
                </span>

                <h3>{resource.title}</h3>

                <div className="resource-details">
                  <span>{resource.branch}</span>
                  <span>{resource.year}</span>
                  <span>{resource.semester}</span>
                </div>

                <button className="view-button">
                  View Resource
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}