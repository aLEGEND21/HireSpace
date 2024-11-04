import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionDispatchContext } from "../contexts";

function Logout() {
  const navigate = useNavigate();
  const sessionDispatch = useContext(SessionDispatchContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/account/logout`, {
      credentials: "include",
      mode: "cors",
    }).then(() => {
      sessionDispatch!({ type: "logout" });
      navigate("/");
    });
  });

  return <div>Logging out...</div>;
}

export default Logout;
