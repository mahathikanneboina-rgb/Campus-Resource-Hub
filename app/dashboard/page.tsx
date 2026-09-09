"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../resources/firebase.js";
import "./dashboard.css";

export default function Dashboard() {
  const [checkingUser, setCheckingUser] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "Student User");
      } else {
        setUserEmail(localStorage.getItem("user_email") || "Student User");
      }
      setCheckingUser(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Logout failed. Please try again.");
    }
  };

  if (checkingUser) {
    return (
      <main className="dashboard-loading">
        <div>
          <h2>Loading...</h2>
          <p>Checking your account.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">

      <header className="dashboard-header">
        <div>
          <h1>Campus Resource Hub</h1>
          <p>Student Dashboard</p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="dashboard-welcome">
        <span>STUDENT PORTAL</span>

        <h2>Welcome back! 👋</h2>

        <p>
          You are logged in as{" "}
          <strong>{userEmail}</strong>.
        </p>

        <p>
          Find your study materials, question papers and
          useful academic resources in one place.
        </p>
      </section>

      <section className="dashboard-cards">

        <Link href="/resources" className="dashboard-card">
          <div className="card-icon blue-icon">
            📚
          </div>

          <h3>Study Resources</h3>

          <p>
            Browse notes, study materials and useful resources.
          </p>

          <span>Explore Resources →</span>
        </Link>

        <Link href="/resources" className="dashboard-card">
          <div className="card-icon purple-icon">
            📄
          </div>

          <h3>Question Papers</h3>

          <p>
            Find previous year examination question papers.
          </p>

          <span>View Papers →</span>
        </Link>

        <Link href="/resources" className="dashboard-card">
          <div className="card-icon orange-icon">
            🎓
          </div>

          <h3>Study Materials</h3>

          <p>
            Access academic materials for your subjects.
          </p>

          <span>View Materials →</span>
        </Link>

      </section>

      <section className="quick-section">

        <h2>Quick Access</h2>

        <div className="quick-links">

          <Link href="/resources">
            📚 All Resources
          </Link>

          <Link href="/resources">
            📄 Previous Papers
          </Link>

          <Link href="/resources">
            📝 Notes
          </Link>

          <Link href="/">
            🏠 Home
          </Link>

        </div>

      </section>

      <footer className="dashboard-footer">
        <strong>Campus Resource Hub</strong>

        <span>
          Student Academic Portal
        </span>
      </footer>

    </main>
  );
}