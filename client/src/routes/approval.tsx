import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../contexts";
import Navbar from "../components/Navbar";

function Approval() {
  const navigate = useNavigate();
  const session = useContext(SessionContext);
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<any>(null);
  const [creator, setCreator] = useState<any>(null);

  // Format all dates in the internship data
  const startDate = new Date(internship?.startDate);
  const endDate = new Date(internship?.endDate);
  const submittedDate = new Date(internship?.createdAt);
  const fmtOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const startDateString = startDate.toLocaleDateString(undefined, fmtOptions);
  const endDateString = endDate.toLocaleDateString(undefined, fmtOptions);
  const submittedDateString = submittedDate.toLocaleDateString(
    undefined,
    fmtOptions
  );

  // Ensure only moderators can access this page
  useEffect(() => {
    if (!session.roles.includes("moderator")) {
      navigate("/");
    }
  }, [session]);

  useEffect(() => {
    fetch(`http://localhost:3000/internship/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch internship data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setInternship(data);
      });
  }, [id]);

  useEffect(() => {
    if (internship?.creator) {
      fetch(`http://localhost:3000/profile/${internship.creator}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch internship creator");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setCreator(data);
        });
    }
  }, [internship?.creator]);

  const handleApproval = () => {
    fetch(`http://localhost:3000/internship/${id}/approve`, {
      method: "PATCH",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to approve internship ${id}`);
        } else {
          navigate("/internships/pending");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRejection = () => {
    fetch(`http://localhost:3000/internship/${id}/reject`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to reject internship ${id}`);
        } else {
          navigate("/internships/pending");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-10">
        <h1 className="text-3xl text-center font-semibold">
          {internship?.title}
        </h1>
        <p className="text-center text-lg my-1">
          Submitted by <u className="font-semibold">{creator?.username}</u> on{" "}
          <u className="font-semibold">{submittedDateString}</u>
        </p>
        <p className="text-center text-lg text-gray-600 my-1">
          {internship?.companyName}
        </p>
        <p className="text-center text-lg text-gray-600 my-1">
          {internship?.location} • {startDateString} - {endDateString}
        </p>
        <p className="text-center text-lg text-gray-600 my-1">
          ${internship?.hourlyRate} / hour • {internship?.hoursPerWeek} hours /
          week
        </p>
        <div className="my-4 mx-auto grid grid-cols-2 gap-4 content-center w-96">
          <button
            className="bg-black text-white rounded-lg py-3 font-semibold"
            onClick={handleApproval}
          >
            Approve
          </button>
          <button
            className="border border-black rounded-lg py-3 font-semibold"
            onClick={handleRejection}
          >
            Reject
          </button>
        </div>
        <h3 className="text-2xl font-semibold text-center mt-10">
          Internship Description
        </h3>
        <p className="text-justify text-lg mt-2">
          {/* Safely render newlines in the description */}
          {internship?.description
            .split("\n")
            .map((line: string, i: number) => (
              <Fragment key={i}>
                {line}
                <br />
              </Fragment>
            ))}
        </p>
        <a
          href={internship?.applicationUrl}
          target="_blank"
          className="flex justify-center"
        >
          <button className="bg-black text-white rounded-lg py-3 font-semibold mt-5 w-48">
            Apply
          </button>
        </a>
      </div>
    </div>
  );
}

export default Approval;
