"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../resources/firebase.js";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please check your details.");
    }
  };

  return (
    <main className="register-page">
      <div className="register-card">

        <div className="register-header">
          <div className="logo">CR</div>

          <h1>Create Account</h1>

          <p>
            Join Campus Resource Hub and access your
            college resources in one place.
          </p>
        </div>

        <form onSubmit={handleRegister} className="register-form">

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your college email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>

        </form>

        <div className="login-section">
          <span>Already have an account?</span>

          <a href="/login">Login here</a>
        </div>

        <div className="footer-text">
          Campus Resource Hub • Student Portal
        </div>

      </div>
    </main>
  );
}