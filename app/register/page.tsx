"use client";

import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../resources/firebase";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      return;
    }

    if (!isFirebaseConfigured()) {
      setErrorMessage("Firebase is not configured. Please check your environment variables.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      if (cleanName && userCredential.user) {
        try {
          await updateProfile(userCredential.user, {
            displayName: cleanName,
          });
        } catch (profileError) {
          console.warn("Could not set display name:", profileError);
        }
      }

      localStorage.setItem("user_email", cleanEmail);
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Firebase registration error:", error);
      let message = "Failed to create account. Please try again.";
      if (error?.code === "auth/email-already-in-use") {
        message = "This email is already in use. Please log in instead.";
      } else if (error?.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (error?.code === "auth/invalid-email") {
        message = "Invalid email address format.";
      } else if (error?.message) {
        message = error.message;
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
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

        {errorMessage && (
          <div className="auth-error" role="alert">
            {errorMessage}
          </div>
        )}

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

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
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