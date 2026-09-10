"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../resources/firebase";
import "./resources.css";

type Resource = {
  id: string;
  title: string;
  type: string;
  branch: string;
  year: string;
  semester: string;
  link: string;
};

const DEFAULT_RESOURCES: Resource[] = [
  {
    id: "sample-1",
    title: "Database Management Systems (DBMS) Notes",
    type: "Notes",
    branch: "CSE",
    year: "2nd Year",
    semester: "4th Semester",
    link: "https://example.com/dbms-notes",
  },
  {
    id: "sample-2",
    title: "Data Structures & Algorithms Question Paper",
    type: "Question Paper",
    branch: "CSE",
    year: "2nd Year",
    semester: "3rd Semester",
    link: "https://example.com/dsa-paper",
  },
  {
    id: "sample-3",
    title: "Digital Electronics Study Material",
    type: "Study Material",
    branch: "ECE",
    year: "2nd Year",
    semester: "3rd Semester",
    link: "https://example.com/de-material",
  },
  {
    id: "sample-4",
    title: "Operating Systems Lecture Notes",
    type: "Notes",
    branch: "CSE",
    year: "3rd Year",
    semester: "5th Semester",
    link: "https://example.com/os-notes",
  },
];

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        if (!isFirebaseConfigured()) {
          setResources(DEFAULT_RESOURCES);
          setLoading(false);
          return;
        }

        console.log("Connecting to Firestore collection 'resources'...");

        const fetchPromise = getDocs(collection(db, "resources"));
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "Firestore operation timed out (10s)."
                )
              ),
            10000
          )
        );

        const snapshot = await Promise.race([fetchPromise, timeoutPromise]);

        const firestoreResources: Resource[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            type: data.type || "",
            branch: data.branch || "",
            year: data.year || "",
            semester: data.semester || "",
            link: data.link || "",
          };
        });

        if (firestoreResources.length > 0) {
          setResources(firestoreResources);
        } else {
          setResources(DEFAULT_RESOURCES);
        }
      } catch (error) {
        console.warn("Using sample resources fallback:", error);
        setResources(DEFAULT_RESOURCES);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const filteredResources = resources.filter(
    (resource) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        resource.title
          .toLowerCase()
          .includes(searchText) ||
        resource.type
          .toLowerCase()
          .includes(searchText) ||
        resource.branch
          .toLowerCase()
          .includes(searchText);

      const matchesBranch =
        branch === "" ||
        resource.branch.toLowerCase() ===
          branch.toLowerCase();

      const matchesYear =
        year === "" ||
        resource.year.toLowerCase() ===
          year.toLowerCase();

      const matchesSemester =
        semester === "" ||
        resource.semester.toLowerCase() ===
          semester.toLowerCase();

      return (
        matchesSearch &&
        matchesBranch &&
        matchesYear &&
        matchesSemester
      );
    }
  );

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

          <p>
            Academic resources for students
          </p>
        </div>

        <nav className="resources-nav">
          <Link href="/">
            Home
          </Link>

          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/admin">
            Admin
          </Link>
        </nav>
      </header>

      {/* Introduction */}
      <section className="resources-intro">
        <span>RESOURCE LIBRARY</span>

        <h2>
          Find Your Resources
        </h2>

        <p>
          Search and filter useful academic
          materials according to your branch,
          year and semester.
        </p>
      </section>

      {/* Filters */}
      <section className="filter-section">

        <div className="filter-box search-box">
          <label htmlFor="search">
            Search
          </label>

          <input
            id="search"
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="filter-box">
          <label htmlFor="branch">
            Branch
          </label>

          <select
            id="branch"
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
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

        <div className="filter-box">
          <label htmlFor="year">
            Year
          </label>

          <select
            id="year"
            value={year}
            onChange={(e) =>
              setYear(e.target.value)
            }
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

        <div className="filter-box">
          <label htmlFor="semester">
            Semester
          </label>

          <select
            id="semester"
            value={semester}
            onChange={(e) =>
              setSemester(e.target.value)
            }
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

            <option value="3rd Semester">
              3rd Semester
            </option>

            <option value="4th Semester">
              4th Semester
            </option>

            <option value="5th Semester">
              5th Semester
            </option>

            <option value="6th Semester">
              6th Semester
            </option>

            <option value="7th Semester">
              7th Semester
            </option>

            <option value="8th Semester">
              8th Semester
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

      {/* Resources */}
      <section className="resource-list">

        <div className="resource-heading">
          <div>
            <h2>
              Available Resources
            </h2>

            <p>
              {filteredResources.length} resource
              {filteredResources.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="no-resources">

            <div className="no-resource-icon">
              ⏳
            </div>

            <h3>
              Loading resources...
            </h3>

            <p>
              Please wait while resources
              are loaded from Firebase.
            </p>

          </div>
        )}

        {/* Firebase Error */}
        {!loading && errorMessage && (
          <div className="no-resources">

            <div className="no-resource-icon">
              ⚠️
            </div>

            <h3>
              Firebase Error
            </h3>

            <p>
              {errorMessage}
            </p>

          </div>
        )}

        {/* No resources */}
        {!loading &&
          !errorMessage &&
          filteredResources.length === 0 && (
            <div className="no-resources">

              <div className="no-resource-icon">
                🔍
              </div>

              <h3>
                No resources found
              </h3>

              <p>
                No resources are currently
                available.
              </p>

              <button
                onClick={clearFilters}
                className="reset-button"
              >
                Reset Search
              </button>

            </div>
          )}

        {/* Resource cards */}
        {!loading &&
          !errorMessage &&
          filteredResources.length > 0 && (
            <div className="resource-grid">

              {filteredResources.map(
                (resource) => (

                  <div
                    className="resource-card"
                    key={resource.id}
                  >

                    <div className="resource-icon">
                      {resource.type === "Notes"
                        ? "📚"
                        : resource.type ===
                          "Question Paper"
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

                    {resource.id.startsWith("sample-") && resource.link ? (
                      <a
                        className="view-button"
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resource ↗
                      </a>
                    ) : (
                      <Link
                        className="view-button"
                        href={`/resources/${resource.id}`}
                      >
                        View Resource
                      </Link>
                    )}

                    {resource.link && !resource.id.startsWith("sample-") && (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="direct-link"
                      >
                        Open Resource ↗
                      </a>
                    )}

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