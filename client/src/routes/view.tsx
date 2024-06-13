import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function View() {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<any>(null);
  const [creator, setCreator] = useState<any>(null);

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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">View Internship</h1>
      <h3 className="text-lg mt-5">{internship?.title}</h3>
      <h4 className="text-md mt-5">Tags: {internship?.tags.toString()}</h4>
      <p className="mt-5">
        {internship?.startDate} - {internship?.endDate}
      </p>
      <p className="mt-5">{internship?.description}</p>
      <p className="mt-5">Location: {internship?.location}</p>
      <p className="mt-5">Company: {internship?.companyName}</p>
      <p className="mt-5">
        {internship?.hoursPerWeek} hours per week @ ${internship?.hourlyRate}
        /hour
      </p>
      <p className="mt-5">
        Application URL:{" "}
        <a href={internship?.applicationUrl} className="text-blue-500">
          {internship?.applicationUrl}
        </a>
      </p>
      <p className="mt-5">Posted by: {creator?.username}</p>
    </div>
  );
}

export default View;
