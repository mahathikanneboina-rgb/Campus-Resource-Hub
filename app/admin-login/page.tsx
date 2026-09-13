"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-location-assign-relative-destination */

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ADMIN_EMAIL, auth, isAdminEmail } from "../resources/firebase";
import "../login/login.css";

export default function AdminLogin() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    if (!auth) {
      setErrorMessage("The authentication service is temporarily unavailable.");
      return;
    }

    try {
      setLoading(true);
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (!isAdminEmail(credential.user.email)) {
        await signOut(auth);
        setErrorMessage("This account is not authorized for the admin dashboard.");
        return;
      }
      window.location.href = "/admin";
    } catch (error: any) {
      setErrorMessage(error?.code === "auth/invalid-credential" ? "Invalid admin email or password." : error?.message || "Admin login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-logo">CR</div>
        <h1>Admin Login</h1>
        <p className="login-subtitle">Restricted access for the campus administrator</p>
        {errorMessage && <div className="auth-error" role="alert">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <label htmlFor="admin-email">Admin Email</label>
          <input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? "Checking..." : "Admin Login"}</button>
        </form>
        <p className="register-text"><Link href="/login">User login</Link></p>
        <Link href="/" className="home-link">← Back to Home</Link>
      </div>
    </main>
  );
}
