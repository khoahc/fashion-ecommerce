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
        <Header />
        <div className="container">
          <div className="main">
            <GlobalRoutes />
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Layout;
