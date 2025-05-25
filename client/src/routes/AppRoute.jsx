import Analytics from "../components/Analytics";
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
              index: true, // 👈 this means /dashboard shows this
              element: <DashboardHome />,
            },
            {
              path: "user-links",
              element: <Links />, // your page with short links
            },
            {
              path: "analytics/:shortPath",
              element: <Analytics />,
            },
          ],
        },
      ],
    },
  ];
  const router = createBrowserRouter(route);
  return <RouterProvider router={router} />;
}
