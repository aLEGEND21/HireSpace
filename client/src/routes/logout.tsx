import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/account/logout", {
      credentials: "include",
      mode: "cors",
    }).then(() => {
      navigate("/login");
    });
  });

  return <div>Logging out...</div>;
}

export default Logout;
