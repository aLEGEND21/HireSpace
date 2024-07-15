import { Fragment, useState, useEffect } from "react";
import Fuse from "fuse.js";
import Navbar from "../components/Navbar";
import InternshipSummary from "../components/InternshipSummary";
import SearchBox from "../components/SearchBox";

function Root() {
  const [internships, setInternships] = useState<any[]>([]);
  const [visibleInternships, setVisibleInternships] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hourlyRate, setHourlyRate] = useState([0, 100]);
  const [hoursPerWeek, setHoursPerWeek] = useState([0, 40]);
  const [selectedInternship, setSelectedInternship] = useState<any | null>(
    null
  );

  // Format the date string for when the selected internship was posted
  const fmtOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const datePosted = new Date(selectedInternship?.createdAt);
  const datePostedString = datePosted.toLocaleDateString(undefined, fmtOptions);

  useEffect(() => {
    fetch("http://localhost:3000/internships", {
      credentials: "include",
      mode: "cors",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setInternships(
            data.filter((internship: any) => internship.approved === true)
          );
        });
      }
    });
  }, []);

  useEffect(() => {
    let filteredInternships = internships;

    // Use Fuse.js to complete a fuzzy search
    if (searchQuery.length > 0) {
      const fuse = new Fuse(internships, {
        isCaseSensitive: false,
        findAllMatches: true,
        includeScore: true,
        keys: ["title", "description", "companyName", "tags", "location"],
        threshold: 0.4, // Lower the threshold to increase the strictness of the search
      });
      const results = fuse.search(searchQuery);
      filteredInternships = results.map((result) => result.item);
    }

    // Further filter the results by tags
    if (tagQuery) {
      filteredInternships = filteredInternships.filter((internship) => {
        return internship.tags
          .join(" ")
          .toLowerCase()
          .includes(tagQuery.toLowerCase());
      });
    }

    // Further filter the results by start and end date
    if (startDate) {
      filteredInternships = filteredInternships.filter((internship) => {
        return new Date(internship.startDate) >= new Date(startDate);
      });
    }
    if (endDate) {
      filteredInternships = filteredInternships.filter((internship) => {
        return new Date(internship.endDate) <= new Date(endDate);
      });
    }

    // Further filter the results by hourly rate and hours per week
    filteredInternships = filteredInternships.filter((internship) => {
      return (
        internship.hourlyRate >= hourlyRate[0] &&
        internship.hourlyRate <= hourlyRate[1] &&
        internship.hoursPerWeek >= hoursPerWeek[0] &&
        internship.hoursPerWeek <= hoursPerWeek[1]
      );
    });

    setVisibleInternships(filteredInternships);
    setSelectedInternship(filteredInternships[0] || null);
  }, [
    internships,
    searchQuery,
    tagQuery,
    startDate,
    endDate,
    hourlyRate,
    hoursPerWeek,
  ]);

  return (
    <div className="flex flex-col max-h-screen">
      <Navbar
        searchBox={
          <SearchBox
            tagQuery={tagQuery}
            startDate={startDate}
            endDate={endDate}
            hourlyRate={hourlyRate}
            hoursPerWeek={hoursPerWeek}
            setSearchQuery={setSearchQuery}
            setTagQuery={setTagQuery}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setHourlyRate={setHourlyRate}
            setHoursPerWeek={setHoursPerWeek}
          />
        }
      />
      <div className="grid grid-cols-12 flex-1 overflow-auto">
        {/* Small screen page contents */}
        <div className="lg:hidden w-lvw pt-5">
          <SearchBox
            tagQuery={tagQuery}
            startDate={startDate}
            endDate={endDate}
            hourlyRate={hourlyRate}
            hoursPerWeek={hoursPerWeek}
            setSearchQuery={setSearchQuery}
            setTagQuery={setTagQuery}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setHourlyRate={setHourlyRate}
            setHoursPerWeek={setHoursPerWeek}
          />
          <p className="text-gray-600 mt-4 mb-1 text-center">
            Found {visibleInternships.length} relevant internships
          </p>
          <div className="divide-y">
            {visibleInternships.map((internship) => (
              <InternshipSummary
                key={internship._id}
                internship={internship}
                selectedInternship={selectedInternship}
                setSelectedInternship={setSelectedInternship}
              />
            ))}
          </div>
        </div>
        {/* Large screen sidebar */}
        <div className="hidden col-span-3 border overflow-y-auto lg:block">
          <p className="text-gray-600 my-5 ps-8 xl:ps-14">
            Found {visibleInternships.length} relevant internships
          </p>
          {visibleInternships.map((internship) => (
            <InternshipSummary
              key={internship._id}
              internship={internship}
              selectedInternship={selectedInternship}
              setSelectedInternship={setSelectedInternship}
            />
          ))}
        </div>
        {/* Large screen detailed internship contents */}
        <div className="hidden col-span-9 border px-16 py-10 overflow-auto lg:block">
          <h1 className="text-4xl font-semibold">
            {selectedInternship?.title}
          </h1>
          <h3 className="text-lg font-bold underline mt-3">
            {selectedInternship?.companyName}
          </h3>
          <p className="text-lg mt-3 text-gray-600">
            {selectedInternship?.location} • Posted on {datePostedString}
          </p>
          <p className="text-lg mt-3 text-gray-600">
            ${selectedInternship?.hourlyRate} / hour •{" "}
            {selectedInternship?.hoursPerWeek} hours / week
          </p>
          <a href={selectedInternship?.applicationUrl} target="_blank">
            <button className="bg-primary text-white rounded-lg px-9 py-4 mt-4 font-semibold">
              Apply
            </button>
          </a>
          <h1 className="text-3xl font-semibold mt-10">
            Internship Description
          </h1>
          <p className="mt-3 text-lg">
            {/* Safely render newlines in the description */}
            {selectedInternship?.description
              .split("\n")
              .map((line: string, i: number) => (
                <Fragment key={i}>
                  {line}
                  <br />
                </Fragment>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Root;
