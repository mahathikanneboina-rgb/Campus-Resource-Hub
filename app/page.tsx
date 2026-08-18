export default function Home() {
  return (
    <main>
      <header>
        <h1>Campus Resource Hub</h1>
        <p>Study resources for our college students</p>

        <button>Login</button>
        <button>Register</button>
      </header>

      <section>
        <h2>Find Your Resources</h2>

        <select>
          <option>Select Branch</option>
          <option>CSE</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>MECH</option>
          <option>CIVIL</option>
        </select>

        <select>
          <option>Select Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <select>
          <option>Select Semester</option>
          <option>1st Semester</option>
          <option>2nd Semester</option>
        </select>
      </section>

      <section>
        <h2>Resources</h2>

        <div>
          <h3>📄 Previous Year Question Papers</h3>
          <p>Find previous examination papers subject-wise.</p>
        </div>

        <div>
          <h3>📚 Notes</h3>
          <p>Access useful notes and study materials.</p>
        </div>

        <div>
          <h3>🎓 Study Resources</h3>
          <p>Find useful resources for your subjects.</p>
        </div>
      </section>
    </main>
  );
}