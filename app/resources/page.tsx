const resources = [
  {
    title: "DBMS Previous Year Question Paper",
    type: "Question Paper",
    branch: "CSE",
    semester: "3-1",
  },
  {
    title: "Operating Systems Notes",
    type: "Notes",
    branch: "CSE",
    semester: "3-1",
  },
  {
    title: "Data Structures Question Paper",
    type: "Question Paper",
    branch: "CSE",
    semester: "3-1",
  },
];

export default function Resources() {
  return (
    <main>
      <h1>Resources</h1>

      <p>Find question papers, notes and study materials.</p>

      <div>
        {resources.map((resource, index) => (
          <div key={index}>
            <h2>{resource.title}</h2>

            <p>Type: {resource.type}</p>
            <p>Branch: {resource.branch}</p>
            <p>Semester: {resource.semester}</p>

            <button>View Resource</button>
          </div>
        ))}
      </div>
    </main>
  );
}