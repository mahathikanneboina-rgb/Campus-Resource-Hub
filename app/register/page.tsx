"use client";

import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../resources/firebase.js";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      alert("Please enter your full name.");
      return;
    }

    if (!cleanEmail || !cleanEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      alert("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Firebase error:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please login.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        alert("Password must contain at least 6 characters.");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <main className="register-page">

      <div className="register-card">

        <div className="register-logo">
          CR
        </div>

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Create your student account to access campus resources
        </p>

        <form onSubmit={handleRegister}>

          <label htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link href="/login">
            Login here
          </Link>
        </p>

        <Link href="/" className="home-link">
          ← Back to Home
        </Link>

      </div>

    </main>
  );
}