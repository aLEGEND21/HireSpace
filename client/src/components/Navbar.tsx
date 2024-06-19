import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts";

interface NavbarProps {
  searchBox?: JSX.Element;
}

function Navbar({ searchBox }: NavbarProps) {
  const session = useContext(SessionContext);

  console.log(session);

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
                <Link to="/logout">
                  <button className="bg-black text-white rounded-lg px-5 py-2">
                    Logout
                  </button>
                </Link>
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
