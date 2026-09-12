"use client";

import { useEffect } from "react";
import Link from "next/link";
import { normaliseError } from "./components/error-monitor";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    const captured = normaliseError(error, "Next.js route boundary");
    try {
      const key = "campus-resource-hub:error-log";
      const previous = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([captured, ...previous].slice(0, 10)));
    } catch {
      // Reporting must not mask the recovery screen.
    }
  }, [error]);

  return (
    <main className="error-page">
      <div className="error-card">
        <div className="error-code">CR</div>
        <h1>Something went wrong</h1>
        <p>The problem was recorded. Your saved account and resources are safe.</p>
        <div className="error-actions">
          <button type="button" onClick={() => reset()}>Try again</button>
          <Link href="/">Return home</Link>
        </div>
      </div>
    </main>
  );
}
