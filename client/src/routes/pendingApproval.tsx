import { useEffect, useState } from "react";

function PendingApproval() {
  const [internships, setInternships] = useState<any[]>([]);

  // Fetch the internships from the backend
  useEffect(() => {
    fetch("http://localhost:3000/internships", {
      credentials: "include",
      mode: "cors",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setInternships(
            data.filter((internship: any) => internship.approved === false)
          );
        });
      }
    });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Internships Pending Approval</h1>
      {internships.map((internship) => (
        <div key={internship._id} className="border rounded p-4 my-4">
          <a href={`/internship/approve/${internship._id}`}>
            <h2 className="text-xl font-bold">{internship.title}</h2>
            <p>{internship.description}</p>
            <div className="my-2">
              {internship.tags.map((tag: any) => (
                <span
                  key={tag}
                  className="bg-blue-200 text-gray-800 rounded px-2 py-1 text-sm mr-2"
                >
                  #{tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              ))}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default PendingApproval;
