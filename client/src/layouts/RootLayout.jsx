import React from "react";
import { Outlet } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900">
      <Nav />
      <div className="pt-20 min-h-[calc(100vh-128px)] bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center justify-center px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
