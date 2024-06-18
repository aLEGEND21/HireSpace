import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ApprovalSummary from "../components/ApprovalSummary";

function PendingApproval() {
  const [internships, setInternships] = useState<any[]>([]);
  const [users, setUsers] = useState<{ [key: string]: any }>({});

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

  // Fetch the users from the backend
  useEffect(() => {
    internships.forEach((internship) => {
      fetch(`http://localhost:3000/profile/${internship.creator}`, {
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setUsers((prev) => ({ ...prev, [internship.creator]: data }));
          });
        }
      });
    });
  }, [internships]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-semibold text-center">
          Internships Pending Approval
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Showing {internships.length} internships
        </p>
        <div className="my-5">
          {internships.map((internship) => (
            <ApprovalSummary
              key={internship._id}
              internship={internship}
              creator={users[internship.creator]}
            />
          ))}
          {internships.length === 0 && (
            <p className="text-xl text-center text-gray-600 mt-5">
              No internships pending approval
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingApproval;
