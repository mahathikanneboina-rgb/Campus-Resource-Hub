"use client";

import Link from "next/link";
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
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const filteredResources = resources.filter((resource) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      searchText === "" ||
      resource.title.toLowerCase().includes(searchText) ||
      resource.type.toLowerCase().includes(searchText) ||
      resource.branch.toLowerCase().includes(searchText);

    const matchesBranch =
      branch === "" || resource.branch === branch;

    const matchesYear =
      year === "" || resource.year === year;

    const matchesSemester =
      semester === "" || resource.semester === semester;

    return (
      matchesSearch &&
      matchesBranch &&
      matchesYear &&
      matchesSemester
    );
  });

  const clearFilters = () => {
    setSearch("");
    setBranch("");
    setYear("");
    setSemester("");
  };

  return (
    <main className="resources-page">

      {/* Header */}

      <header className="resources-header">

        <div>
          <h1>Campus Resource Hub</h1>
          <p>Academic resources for students</p>
        </div>

        <nav className="resources-nav">
          <Link href="/">Home</Link>

          <Link href="/dashboard">
            Dashboard
          </Link>
        </nav>

      </header>


      {/* Introduction */}

      <section className="resources-intro">

        <span>RESOURCE LIBRARY</span>

        <h2>Find Your Resources</h2>

        <p>
          Search and filter useful academic materials
          according to your branch, year and semester.
        </p>

      </section>


      {/* Search and Filters */}

      <section className="filter-section">

        {/* Search */}

        <div className="filter-box search-box">

          <label htmlFor="search">
            Search
          </label>

          <input
            id="search"
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* Branch */}

        <div className="filter-box">

          <label htmlFor="branch">
            Branch
          </label>

          <select
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >

            <option value="">
              All Branches
            </option>

            <option value="CSE">
              CSE
            </option>

            <option value="ECE">
              ECE
            </option>

            <option value="EEE">
              EEE
            </option>

            <option value="MECH">
              MECH
            </option>

            <option value="CIVIL">
              CIVIL
            </option>

          </select>

        </div>


        {/* Year */}

        <div className="filter-box">

          <label htmlFor="year">
            Year
          </label>

          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >

            <option value="">
              All Years
            </option>

            <option value="1st Year">
              1st Year
            </option>

            <option value="2nd Year">
              2nd Year
            </option>

            <option value="3rd Year">
              3rd Year
            </option>

            <option value="4th Year">
              4th Year
            </option>

          </select>

        </div>


        {/* Semester */}

        <div className="filter-box">

          <label htmlFor="semester">
            Semester
          </label>

          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >

            <option value="">
              All Semesters
            </option>

            <option value="1st Semester">
              1st Semester
            </option>

            <option value="2nd Semester">
              2nd Semester
            </option>

          </select>

        </div>


        {/* Clear */}

        <button
          className="clear-button"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </section>


      {/* Resource List */}

      <section className="resource-list">

        <div className="resource-heading">

          <div>
            <h2>Available Resources</h2>

            <p>
              {filteredResources.length} resource
              {filteredResources.length !== 1
                ? "s"
                : ""} found
            </p>
          </div>

        </div>


        {/* No Results */}

        {filteredResources.length === 0 ? (

          <div className="no-resources">

            <div className="no-resource-icon">
              🔍
            </div>

            <h3>
              No resources found
            </h3>

            <p>
              Try another search or change your filters.
            </p>

            <button
              onClick={clearFilters}
              className="reset-button"
            >
              Reset Search
            </button>

          </div>

        ) : (

          /* Resource Cards */

          <div className="resource-grid">

            {filteredResources.map(
              (resource, index) => (

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


                  <h3>
                    {resource.title}
                  </h3>


                  <div className="resource-details">

                    <span>
                      {resource.branch}
                    </span>

                    <span>
                      {resource.year}
                    </span>

                    <span>
                      {resource.semester}
                    </span>

                  </div>


                  <Link
                    className="view-button"
                    href={`/resource?title=${encodeURIComponent(
                      resource.title
                    )}&type=${encodeURIComponent(
                      resource.type
                    )}&branch=${encodeURIComponent(
                      resource.branch
                    )}&year=${encodeURIComponent(
                      resource.year
                    )}&semester=${encodeURIComponent(
                      resource.semester
                    )}`}
                  >
                    View Resource
                  </Link>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* Footer */}

      <footer className="resources-footer">

        <p>
          © 2026 Campus Resource Hub
        </p>

        <p>
          Academic resources for students
        </p>

      </footer>

    </main>
  );
}