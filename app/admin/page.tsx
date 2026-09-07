"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../resources/firebase";
import "./admin.css";

// Resource type matching Firestore schema
type Resource = {
  id: string;
  title: string;
  type: string;
  branch: string;
  year: string;
  semester: string;
  link: string;
};

export default function AdminPage(): import("react").JSX.Element {
  // Form fields (used for both add and edit)
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Notes");
  const [branch, setBranch] = useState("CSE");
  const [year, setYear] = useState("1st Year");
  const [semester, setSemester] = useState("1st Semester");
  const [link, setLink] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [loadingResources, setLoadingResources] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [editingId, setEditingId] = useState<string>("");

  // Fetch resources from Firestore
  const fetchResources = async () => {
    if (!isFirebaseConfigured()) {
      setLoadingResources(false);
      return;
    }
    try {
      const snapshot = await getDocs(collection(db, "resources"));
      const fetched: Resource[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Resource, "id">;
        return { id: doc.id, ...data };
      });
      setResources(fetched);
    } catch (e) {
      console.error("Error loading resources:", e);
    } finally {
      setLoadingResources(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Populate form for editing
  const startEdit = (resource: Resource) => {
    setEditingId(resource.id);
    setTitle(resource.title);
    setType(resource.type);
    setBranch(resource.branch);
    setYear(resource.year);
    setSemester(resource.semester);
    setLink(resource.link);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this resource?");
    if (!confirmed) return;
    if (!isFirebaseConfigured()) {
      alert("Firebase not configured properly.");
      return;
    }
    try {
      await deleteDoc(doc(db, "resources", id));
      alert("Resource deleted successfully!");
      fetchResources();
    } catch (e) {
      console.error("Error deleting resource:", e);
      alert("Failed to delete resource.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    const cleanLink = link.trim();
    if (!cleanTitle || !cleanLink) {
      alert("Please enter the resource title and link.");
      return;
    }
    if (!isFirebaseConfigured()) {
      const errMsg =
        "Firebase is configured with placeholder values in .env.local. Real Firebase Web App configuration is required to save resources.";
      console.error(errMsg);
      alert(errMsg);
      return;
    }
    try {
      setLoading(true);
      if (editingId) {
        // Update existing document
        const docRef = doc(db, "resources", editingId);
        await updateDoc(docRef, {
          title: cleanTitle,
          type,
          branch,
          year,
          semester,
          link: cleanLink,
        });
        alert("Resource updated successfully!");
      } else {
        // Add new document
        const addPromise = addDoc(collection(db, "resources"), {
          title: cleanTitle,
          type,
          branch,
          year,
          semester,
          link: cleanLink,
          createdAt: new Date(),
        });
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "Firestore operation timed out (10 seconds). Please check your internet connection or Firestore security rules."
                )
              ),
            10000
          )
        );
        await Promise.race([addPromise, timeoutPromise]);
        alert("Resource added successfully!");
      }
      // Reset form
      setTitle("");
      setType("Notes");
      setBranch("CSE");
      setYear("1st Year");
      setSemester("1st Semester");
      setLink("");
      setEditingId("");
      // Refresh list
      fetchResources();
    } catch (error) {
      console.error(editingId ? "Error updating resource:" : "Error adding resource:", error);
      const msg = error instanceof Error ? error.message : "Operation failed. Please try again.";
      alert(`Firebase Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <h1>Campus Resource Hub</h1>
          <p>Admin Dashboard</p>
        </div>
        <Link href="/resources">View Resources</Link>
      </header>

      <section className="admin-container">
        {/* Existing Resources List */}
        <div className="resource-list">
          <h2>{editingId ? "Edit Resource" : "All Resources"}</h2>
          {loadingResources ? (
            <div className="no-resources">
              <div className="no-resource-icon">⏳</div>
              <h3>Loading resources...</h3>
            </div>
          ) : (
            <div className="resource-grid">
              {resources.map((res) => (
                <div className="resource-card" key={res.id}>
                  <div className="resource-icon">
                    {res.type === "Notes"
                      ? "📚"
                      : res.type === "Question Paper"
                      ? "📄"
                      : "🎓"}
                  </div>
                  <span className="resource-type">{res.type}</span>
                  <h3>{res.title}</h3>
                  <div className="resource-details">
                    <span>{res.branch}</span>
                    <span>{res.year}</span>
                    <span>{res.semester}</span>
                  </div>
                  <button
                    className="view-button"
                    style={{ background: "#6b8ac2" }}
                    onClick={() => startEdit(res)}
                  >
                    Edit
                  </button>
                  <button
                    className="view-button"
                    style={{ background: "#c04b4b", marginLeft: "8px" }}
                    onClick={() => handleDelete(res.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add / Edit Form */}
        <form className="resource-form" onSubmit={handleSubmit}>
          <div className="form-group full-width">
            <label htmlFor="title">Resource Title</label>
            <input
              id="title"
              type="text"
              placeholder="Example: DBMS Unit 1 Notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Resource Type</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Notes">Notes</option>
              <option value="Question Paper">Question Paper</option>
              <option value="Study Material">Study Material</option>
              <option value="Assignment">Assignment</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="link">Resource Link</label>
            <input
              id="link"
              type="url"
              placeholder="https://example.com/resource"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update Resource" : "Add Resource"}
            </button>
            <Link href="/resources">Cancel</Link>
          </div>
        </form>
      </section>
    </main>
  );
}