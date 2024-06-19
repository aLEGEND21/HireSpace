import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts";

function Submission() {
  const navigate = useNavigate();
  const session = useContext(SessionContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");

  // Prevent logged out users from accessing this page
  useEffect(() => {
    if (session.username === null) {
      navigate("/login");
    }
  }, [session]);

  function handleSubmit() {
    fetch("http://localhost:3000/internship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        companyName,
        tags: tags.split(","),
        location,
        startDate,
        endDate,
        hoursPerWeek,
        hourlyRate,
        applicationUrl,
      }),
      credentials: "include",
      mode: "cors",
    }).then((res) => {
      if (res.status === 200) {
        alert("Internship submitted successfully!");
      }
    });
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold">Submit an Internship</h1>
      <form className="mt-5">
        <span className="">Title</span>
        <input
          type="text"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <span className="mt-5">Description</span>
        <textarea
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <span className="mt-5">Company Name</span>
        <input
          type="text"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
        <span className="mt-5">Tags</span>
        <input
          type="text"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setTags(e.target.value);
          }}
        />
        <span className="mt-5">Location</span>
        <input
          type="text"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <span className="mt-5">Start Date</span>
        <input
          type="date"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        <span className="mt-5">End Date</span>
        <input
          type="date"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
        <span className="mt-5">Hours Per Week</span>
        <input
          type="number"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setHoursPerWeek(e.target.value);
          }}
        />
        <span className="mt-5">Hourly Rate</span>
        <input
          type="number"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setHourlyRate(e.target.value);
          }}
        />
        <span className="mt-5">Application URL</span>
        <input
          type="text"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setApplicationUrl(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="block w-full bg-blue-500 text-white rounded-md mt-5 p-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Submission;
