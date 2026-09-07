"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../resources.css";

type Resource = {
  id: string;
  title: string;
  type: string;
  branch: string;
  year: string;
  semester: string;
  link: string;
};

export default function ResourceDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchResource = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const docRef = doc(db, "resources", id);
        const fetchPromise = getDoc(docRef);
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error("Fetching resource details timed out (10s).")),
            10000
          )
        );

        const docSnap = await Promise.race([fetchPromise, timeoutPromise]);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setResource({
            id: docSnap.id,
            title: data.title || "",
            type: data.type || "",
            branch: data.branch || "",
            year: data.year || "",
            semester: data.semester || "",
            link: data.link || "",
          });
        } else {
          setErrorMessage("Resource not found.");
        }
      } catch (error) {
        console.error("Error fetching resource details:", error);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load resource details from Firebase."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  return (
    <main className="resources-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header className="resources-header">
        <div>
          <h1>Campus Resource Hub</h1>
          <p>Academic Resource Details</p>
        </div>

        <nav className="resources-nav">
          <Link href="/resources" className="clear-button" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            ← Back to Resources
          </Link>
        </nav>
      </header>

      {/* Main Content Container */}
      <section className="resource-list" style={{ paddingTop: "40px", flex: "1" }}>
        {loading && (
          <div className="no-resources">
            <div className="no-resource-icon">⏳</div>
            <h3>Loading resource details...</h3>
            <p>Please wait while the resource information is loaded from Firebase.</p>
          </div>
        )}

        {!loading && errorMessage && (
          <div className="no-resources">
            <div className="no-resource-icon">⚠️</div>
            <h3>{errorMessage === "Resource not found." ? "Resource Not Found" : "Error Loading Resource"}</h3>
            <p>{errorMessage}</p>
            <div style={{ marginTop: "20px" }}>
              <Link href="/resources" className="reset-button" style={{ textDecoration: "none", display: "inline-block" }}>
                ← Back to Resources
              </Link>
            </div>
          </div>
        )}

        {!loading && !errorMessage && resource && (
          <div
            className="resource-card"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              padding: "32px",
              boxShadow: "0 4px 14px rgba(80, 60, 40, 0.06)",
            }}
          >
            <div className="resource-icon" style={{ width: "55px", height: "55px", fontSize: "28px" }}>
              {resource.type === "Notes"
                ? "📚"
                : resource.type === "Question Paper"
                ? "📄"
                : "🎓"}
            </div>

            <span className="resource-type" style={{ fontSize: "12px" }}>
              {resource.type}
            </span>

            <h2 style={{ margin: "12px 0 20px", color: "#493a2a", fontSize: "24px", lineHeight: "1.4" }}>
              {resource.title}
            </h2>

            <div className="resource-details" style={{ gap: "10px", marginBottom: "28px" }}>
              <span style={{ padding: "6px 12px", fontSize: "12px" }}>
                🏷️ Branch: <strong>{resource.branch}</strong>
              </span>
              <span style={{ padding: "6px 12px", fontSize: "12px" }}>
                📅 Year: <strong>{resource.year}</strong>
              </span>
              <span style={{ padding: "6px 12px", fontSize: "12px" }}>
                📖 Semester: <strong>{resource.semester}</strong>
              </span>
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "20px" }}>
              {resource.link && (
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-button"
                  style={{
                    flex: "1",
                    minWidth: "160px",
                    textAlign: "center",
                    textDecoration: "none",
                    padding: "12px 20px",
                    fontSize: "14px",
                  }}
                >
                  Open Resource ↗
                </a>
              )}

              <Link
                href="/resources"
                className="clear-button"
                style={{
                  flex: "1",
                  minWidth: "160px",
                  textAlign: "center",
                  textDecoration: "none",
                  padding: "12px 20px",
                  fontSize: "14px",
                  display: "inline-block",
                }}
              >
                ← Back to Resources
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="resources-footer" style={{ marginTop: "auto" }}>
        <p>© 2026 Campus Resource Hub</p>
        <p>Academic resources for students</p>
      </footer>
    </main>
  );
}
