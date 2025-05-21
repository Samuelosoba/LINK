import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router";
export default function AppRoute() {
  const route = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(route);
  return <RouterProvider router={router} />;
}
