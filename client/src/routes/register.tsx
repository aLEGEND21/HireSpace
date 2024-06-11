import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");

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
        role,
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
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold">Register</h1>
      <form className="mt-5">
        <span className="">Username</span>
        <input
          type="text"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <span className="mt-5">Email</span>
        <input
          type="email"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <span className="mt-5">Password</span>
        <input
          type="password"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <span className="mt-5">Confirm Password</span>
        <input
          type="password"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <span className="mt-5">Account Type</span>
        <select
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value="student">Student</option>
          <option value="employer">Employer</option>
        </select>
        <input
          type="submit"
          className="block w-full bg-blue-500 text-white rounded-md mt-5 p-2"
          value="Register"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </form>
    </div>
  );
}

export default Register;
