import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts";

interface InternshipSummaryProps {
  internship: any;
  selectedInternship: any;
  setSelectedInternship: any;
  isBookmarked: boolean;
  handleBookmarkUpdate: any;
}

function InternshipSummary({
  internship,
  selectedInternship,
  setSelectedInternship,
  isBookmarked,
  handleBookmarkUpdate,
}: InternshipSummaryProps) {
  const session = useContext(SessionContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Format the dates
  const startDate = new Date(internship.startDate);
  const endDate = new Date(internship.endDate);
  const fmtOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const startDateString = startDate.toLocaleDateString(undefined, fmtOptions);
  const endDateString = endDate.toLocaleDateString(undefined, fmtOptions);

  // Handle the bookmark button being clicked
  const handleBookmarkClick = (event: any) => {
    event.stopPropagation(); // Prevent the div's onClick event from firing on large screens
    event.preventDefault(); // Prevent the Link from firing on small screens

    // If the user is not logged in, show the login modal
    if (!session.loggedIn) {
      return setShowLoginModal(true);
    }

    // Update the user's bookmarked internships via the API
    handleBookmarkUpdate(internship._id, isBookmarked);
  };

  return (
    <div>
      <div
        className={`hidden container ps-8 pe-4 pt-4 pb-7 border-b border-gray-200 lg:block hover:cursor-pointer hover:bg-slate-100 ${
          selectedInternship._id === internship._id ? "bg-slate-100" : ""
        }`}
        onClick={() => setSelectedInternship(internship)}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold pe-4 xl:text-lg">{internship.title}</h1>
          <button
            className="self-start p-1.5 rounded-lg hover:bg-slate-200"
            onClick={handleBookmarkClick}
          >
            {/* Bookmark icon */}
            <svg
              className={`w-6 h-6 text-primary fill-${
                isBookmarked ? "primary" : "transparent"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <title>Bookmark</title>
              <path
                d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"
                stroke="currentColor"
                strokeWidth="3"
              ></path>
            </svg>
          </button>
        </div>
        <div className="text-sm text-gray-600 xl:text-base">
          <p>{internship.companyName}</p>
          <p>{internship.location}</p>
          <p className="mt-2 xl:mt-3">
            ${internship.hourlyRate} / hr • {internship.hoursPerWeek} hr / week
          </p>
          <p>
            {startDateString} - {endDateString}
          </p>
        </div>
        <div className="mt-2 xl:mt-4">
          {internship.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-primary text-white rounded-lg px-2.5 py-1.5 text-xs me-1 whitespace-nowrap xl:text-sm xl:px-3 xl:py-2"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Small screen view - main page contents */}
      <Link to={`/internship/view/${internship._id}`} className="lg:hidden">
        <div className="pt-4 pb-8 ps-7 pe-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold me-5">{internship.title}</h1>
            <button
              className="self-start p-1.5 -me-1.5 rounded-lg hover:bg-slate-200"
              onClick={handleBookmarkClick}
            >
              {/* Bookmark icon */}
              <svg
                className={`w-6 h-6 text-primary fill-${
                  isBookmarked ? "primary" : "transparent"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <title>Bookmark</title>
                <path
                  d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"
                  stroke="currentColor"
                  strokeWidth="3"
                ></path>
              </svg>
            </button>
          </div>
          <div className="pe-1">
            <h3 className="text-lg font-bold underline"></h3>
            <p className="mt-0.5 font-semibold text-gray-600">
              {selectedInternship?.companyName} • {selectedInternship?.location}
            </p>
            <p className="mt-0.5 font-semibold text-gray-600">
              ${selectedInternship?.hourlyRate} / hour •{" "}
              {selectedInternship?.hoursPerWeek} hours / week
            </p>
            <p className="mt-0.5 line-clamp-3 text-gray-600">
              {internship.description}
            </p>
            <div className="mt-4">
              {internship.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-primary text-white rounded-lg px-3 py-2 text-sm me-1 whitespace-nowrap"
                >
                  # {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
      {/* Modal to prompt the user to login when adding bookmarks */}
      <div
        className={`${
          showLoginModal ? "" : "hidden"
        } flex fixed inset-0 z-50 justify-center w-full bg-opacity-30 bg-black`}
      >
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative bg-white rounded-lg">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-xl font-semibold text-primary">
                Create an account to save this internship
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={() => setShowLoginModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center p-4 pt-0 border-gray-200 space-x-2">
              <Link to="/register">
                <button className="text-white bg-primary border border-primary rounded-md px-4 py-2 text-sm font-semibold hover:bg-white hover:text-primary">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="text-primary bg-white border border-primary rounded-md px-4 py-2 text-sm font-semibold hover:bg-primary hover:text-white">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternshipSummary;
