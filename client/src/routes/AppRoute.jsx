import Analytics from "../components/Analytics";
import CreateAlink from "../components/createAlink";

import Dashboard from "../components/Dashboard";
import DashboardHome from "../components/DashboardHome";
import Links from "../components/Links";

import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router";
export default function AppRoute() {
  const route = [
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "dashboard",
          element: <Dashboard />,
          children: [
            {
              index: true, 
              element: <DashboardHome />,
            },
            {
              path: "user-links",
              element: <Links />, 
            },
            {
              path: "analytics/:shortPath",
              element: <Analytics />,
            },
            {
              path: "createlink",
              element: <CreateAlink/>,
            },
          ],
        },
      ],
    },
  ];
  const router = createBrowserRouter(route);
  return <RouterProvider router={router} />;
}
