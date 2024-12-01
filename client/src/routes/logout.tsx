import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionDispatchContext } from "../contexts";
import { API_URL } from "../constants";

function Logout() {
  const navigate = useNavigate();
  const sessionDispatch = useContext(SessionDispatchContext);

  useEffect(() => {
    fetch(`${API_URL}/account/logout`, {
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
