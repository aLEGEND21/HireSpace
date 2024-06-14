import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetch("http://localhost:3000/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/");
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
        <h1 className="text-5xl font-bold text-center mt-20">Login</h1>
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
          <input
            type="submit"
            className="block w-full bg-black text-white rounded-md p-3"
            value="Log In"
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
        </form>
        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
