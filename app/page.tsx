import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <main className="home-page">

      {/* Header */}

      <header className="home-header">

        <div className="brand">
          <div className="brand-logo">CR</div>

          <div>
            <h1>Campus Resource Hub</h1>
            <p>Student Academic Portal</p>
          </div>
        </div>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/login">Login</Link>

          <Link
            href="/register"
            className="register-nav"
          >
            Register
          </Link>
        </nav>

      </header>


      {/* Hero */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-label">
            STUDENT RESOURCE PLATFORM
          </span>

          <h2>
            Everything you need
            <br />
            for your studies.
          </h2>

          <p>
            Find notes, previous year question papers,
            study materials and other useful academic
            resources in one simple place.
          </p>

          <div className="hero-buttons">

            <Link
              href="/resources"
              className="primary-button"
            >
              Explore Resources
            </Link>

            <Link
              href="/register"
              className="secondary-button"
            >
              Create Account
            </Link>

          </div>

        </div>

        <div className="hero-card">

          <div className="hero-card-top">
            <span>QUICK ACCESS</span>
            <span>● Online</span>
          </div>

          <h3>Study smarter with organized resources.</h3>

          <div className="mini-resource">
            <span>📄</span>
            <div>
              <strong>Question Papers</strong>
              <small>Previous examinations</small>
            </div>
          </div>

          <div className="mini-resource">
            <span>📚</span>
            <div>
              <strong>Notes</strong>
              <small>Subject study materials</small>
            </div>
          </div>

          <div className="mini-resource">
            <span>🎓</span>
            <div>
              <strong>Study Resources</strong>
              <small>Useful academic content</small>
            </div>
          </div>

        </div>

      </section>


      {/* Resource Categories */}

      <section className="categories-section">

        <div className="section-heading">
          <span>RESOURCE LIBRARY</span>

          <h2>What can you find?</h2>

          <p>
            Access useful academic materials based on
            your branch and semester.
          </p>
        </div>

        <div className="category-grid">

          <div className="category-card">

            <div className="category-icon">
              📄
            </div>

            <h3>Previous Year Papers</h3>

            <p>
              Practice with previous examination papers
              and understand the question pattern.
            </p>

            <Link href="/resources">
              View Papers →
            </Link>

          </div>


          <div className="category-card">

            <div className="category-icon">
              📚
            </div>

            <h3>Notes</h3>

            <p>
              Find useful subject notes and study
              material for your semester.
            </p>

            <Link href="/resources">
              Browse Notes →
            </Link>

          </div>


          <div className="category-card">

            <div className="category-icon">
              🎓
            </div>

            <h3>Study Materials</h3>

            <p>
              Explore additional resources to support
              your academic preparation.
            </p>

            <Link href="/resources">
              Explore Materials →
            </Link>

          </div>

        </div>

      </section>


      {/* How it works */}

      <section className="how-section">

        <div className="section-heading">

          <span>SIMPLE PROCESS</span>

          <h2>How Campus Resource Hub works</h2>

        </div>

        <div className="steps">

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>Create an account</h3>

            <p>
              Register using your email and create
              your student account.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>Select your details</h3>

            <p>
              Choose your branch, year and semester
              to find relevant resources.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>Start learning</h3>

            <p>
              Browse useful materials and prepare
              for your examinations.
            </p>

          </div>

        </div>

      </section>


      {/* Footer */}

      <footer className="home-footer">

        <div>
          <strong>Campus Resource Hub</strong>
          <p>
            A simple academic resource platform for students.
          </p>
        </div>

        <div className="footer-links">

          <Link href="/">Home</Link>

          <Link href="/resources">
            Resources
          </Link>

          <Link href="/login">
            Login
          </Link>

        </div>

      </footer>

    </main>
  );
}