"use client";

import { useCallback, useEffect, useState } from "react";

type CapturedError = {
  id: string;
  message: string;
  source: string;
  time: string;
  recoverable: boolean;
};

const STORAGE_KEY = "campus-resource-hub:error-log";
const MAX_ERRORS = 10;

function normaliseError(error: unknown, source: string): CapturedError {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "An unexpected application error occurred.";

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    message: message || "An unexpected application error occurred.",
    source,
    time: new Date().toISOString(),
    recoverable: /loading chunk|chunkload|dynamically imported module|network|fetch/i.test(
      message
    ),
  };
}

function saveError(error: CapturedError) {
  try {
    const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([error, ...previous].slice(0, MAX_ERRORS))
    );
  } catch {
    // Error reporting must never create another user-facing error.
  }
}

export default function ErrorMonitor() {
  const [currentError, setCurrentError] = useState<CapturedError | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const capture = useCallback((error: unknown, source: string) => {
    const captured = normaliseError(error, source);
    saveError(captured);
    setCurrentError(captured);
    setShowDetails(false);
  }, []);

  useEffect(() => {
    const onError = (event: ErrorEvent) => capture(event.error || event.message, "Browser runtime");
    const onUnhandledRejection = (event: PromiseRejectionEvent) =>
      capture(event.reason, "Unhandled promise");

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, [capture]);

  useEffect(() => {
    if (!currentError) return;
    const timer = window.setTimeout(() => setCurrentError(null), 10000);
    return () => window.clearTimeout(timer);
  }, [currentError]);

  const retry = () => {
    setCurrentError(null);
    setShowDetails(false);
    window.location.reload();
  };

  if (!currentError) return null;

  return (
    <aside className="error-monitor" role="alert" aria-live="assertive">
      <div className="error-monitor-title">We found a temporary problem</div>
      <p>
        Your data was not changed. The issue was recorded and the app will continue
        safely. You can retry this page now.
      </p>
      <div className="error-monitor-actions">
        <button type="button" onClick={retry}>Retry page</button>
        <button type="button" className="error-monitor-secondary" onClick={() => setShowDetails((value) => !value)}>
          {showDetails ? "Hide details" : "Show details"}
        </button>
        <button type="button" className="error-monitor-dismiss" onClick={() => setCurrentError(null)} aria-label="Dismiss error">
          Dismiss
        </button>
      </div>
      {showDetails && (
        <details open className="error-monitor-details">
          <summary>Technical details</summary>
          <code>{currentError.source}: {currentError.message}</code>
          <small>{currentError.time}</small>
        </details>
      )}
    </aside>
  );
}

export { STORAGE_KEY };
export type { CapturedError };
export { normaliseError };
