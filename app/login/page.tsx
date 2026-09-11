"use client";

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../resources/firebase";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    if (!isFirebaseConfigured() || !auth) {
      setErrorMessage("Firebase is not configured. Please check your environment variables.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      localStorage.setItem("user_email", cleanEmail);
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Firebase login error:", error);
      let message = "Failed to log in. Please check your credentials.";
      if (
        error?.code === "auth/invalid-credential" ||
        error?.code === "auth/user-not-found" ||
        error?.code === "auth/wrong-password"
      ) {
        message = "Invalid email or password.";
      } else if (error?.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Please try again later.";
      } else if (error?.code === "auth/invalid-email") {
        message = "Invalid email address format.";
      } else if (error?.code) {
        message = `Firebase error [${error.code}]: ${error.message || "Login failed"}`;
      } else if (error?.message) {
        message = error.message;
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
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

        {errorMessage && (
          <div className="auth-error" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
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