import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();
  const session = useContext(SessionContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Prevent logged in users from accessing this page
  useEffect(() => {
    if (session.username !== null) {
      navigate("/");
    }
  }, [session]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate the password
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    } else if (password.length < 8) {
      console.log("Password must be at least 8 characters long");
      return;
    }

    fetch("http://localhost:3000/account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/login");
      } else {
        res.text().then((msg) => {
          console.log(msg);
        });
      }
    });
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto max-w-96">
        <h1 className="text-5xl font-bold text-center mt-10">Register</h1>
        <form className="mt-5">
          <div className="mt-5">
            <span className="font-semibold">Username</span>
            <input
              type="text"
              className="block w-full border border-gray-300 rounded-md mt-1 py-2 px-3"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mt-5">
            <span className="font-semibold">Email</span>
            <input
              type="email"
              className="block w-full border border-gray-300 rounded-md mt-1 py-2 px-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mt-3 mb-5">
            <span className="font-semibold">Password</span>
            <input
              type="password"
              className="block w-full border border-gray-300 rounded-md mt-1 py-2 px-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mt-3 mb-5">
            <span className="font-semibold">Confirm Password</span>
            <input
              type="password"
              className="block w-full border border-gray-300 rounded-md mt-1 py-2 px-3"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            className="block w-full bg-black text-white rounded-md p-3"
            value="Register"
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
        </form>
        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
