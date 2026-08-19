"use client";

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from"../resources/firebase.js";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert("Login failed. Check your email and password.");
    }
  };

  return (
    <main className="login-page">

      <div className="login-card">

        <div className="login-logo">
          CR
        </div>

        <h1>Student Login</h1>

        <p className="login-subtitle">
          Login to access your campus resources
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link href="/register">
            Register here
          </Link>
        </p>

        <Link href="/" className="home-link">
          ← Back to Home
        </Link>

      </div>

    </main>
  );
}