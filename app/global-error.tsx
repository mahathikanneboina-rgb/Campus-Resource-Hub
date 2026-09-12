"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="error-page">
          <div className="error-card">
            <div className="error-code">CR</div>
            <h1>Campus Resource Hub needs a refresh</h1>
            <p>The issue was isolated safely. Refresh the app to continue.</p>
            <button type="button" onClick={() => reset()}>Refresh app</button>
          </div>
        </main>
      </body>
    </html>
  );
}
