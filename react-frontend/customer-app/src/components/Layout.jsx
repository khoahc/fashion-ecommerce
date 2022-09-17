import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GlobalRoutes from "../routes/GlobalRoutes";

const Layout = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <GlobalRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Layout;
