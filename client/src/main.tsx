import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./routes/root";
import Register from "./routes/register";
import Login from "./routes/login";
import Logout from "./routes/logout";
import Submission from "./routes/submission";
import Approval from "./routes/approval";
import View from "./routes/view";
import "./index.css";

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
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
