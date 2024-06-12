import { useState, useEffect } from "react";

function Root() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3000/profile/@me", {
      credentials: "include",
      mode: "cors",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setUser(data);
        });
      }
    });
  }, []);

  return (
    <h1 className="text-3xl font-bold underline">
      Hello {user?.username || "Unauthorized"}!
    </h1>
  );
}

export default Root;
