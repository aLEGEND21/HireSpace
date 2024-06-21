import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts";

interface NavbarProps {
  searchBox?: JSX.Element;
}

function Navbar({ searchBox }: NavbarProps) {
  const session = useContext(SessionContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap me-16">
            Internship Finder
          </span>
          {searchBox}
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link to="/" className="block py-2 px-3 rounded">
                Find Internships
              </Link>
            </li>
            <li>
              {session.loggedIn ? (
                <>
                  <button
                    className="bg-black text-white rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Actions <span className="text-xs ms-2 mt-0.5">▼</span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute divide-y text-sm bg-white divide-gray-200 rounded-lg border border-gray-200 w-44 mt-2">
                      <div className="px-4 py-2.5 truncate text-gray-600 font-semibold">
                        @{session.username}
                      </div>
                      <ul className="text-sm text-gray-600">
                        <li>
                          <Link
                            to="/internship/submit"
                            className="block px-4 py-2.5 hover:bg-slate-100"
                          >
                            Submit Internship
                          </Link>
                          {session.roles.includes("moderator") && (
                            <Link
                              to="/internships/pending"
                              className="block px-4 py-2.5 hover:bg-slate-100"
                            >
                              Pending Approval
                            </Link>
                          )}
                        </li>
                      </ul>
                      <Link
                        to="/logout"
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-slate-100"
                      >
                        Log out
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <button className="bg-black text-white rounded-lg px-5 py-2">
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
