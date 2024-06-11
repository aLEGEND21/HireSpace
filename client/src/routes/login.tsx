import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="mt-5">
        <span className="">Username</span>
        <input
          type="text"
          className="block w-full border border-gray-300 rounded-md mt-1"
          onChange={(e) => {
            setUsername(e.target.value);
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
        <input
          type="submit"
          className="block w-full bg-blue-500 text-white rounded-md mt-5 p-2"
          value="Log In"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </form>
    </div>
  );
}

export default Login;
