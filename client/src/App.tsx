import { useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionContext, SessionDispatchContext } from "./contexts";
import { sessionReducer } from "./reducers";
import { SessionStore } from "./store";
import Root from "./routes/root";
import Register from "./routes/register";
import Login from "./routes/login";
import Logout from "./routes/logout";
import Submission from "./routes/submission";
import Approval from "./routes/approval";
import View from "./routes/view";
import Search from "./routes/search";
import PendingApproval from "./routes/pendingApproval";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/internship/submit",
      element: <Submission />,
    },
    {
      path: "/internship/approve/:id",
      element: <Approval />,
    },
    {
      path: "/internship/view/:id",
      element: <View />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/internships/pending",
      element: <PendingApproval />,
    },
  ]);

  const queryClient = new QueryClient();

  const [session, sessionDispatch] = useReducer(sessionReducer, {
    loggedIn: SessionStore.loggedIn,
    username: SessionStore.username,
    id: SessionStore.id,
    roles: SessionStore.roles,
  });

  return (
    <SessionDispatchContext.Provider value={sessionDispatch}>
      <SessionContext.Provider value={session}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SessionContext.Provider>
    </SessionDispatchContext.Provider>
  );
}

export default App;
