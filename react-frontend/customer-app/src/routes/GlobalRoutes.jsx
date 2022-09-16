import React, { useState, useEffect } from "react";
import { Route, Routes, useParams, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Catelog from "../pages/Catelog";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Search from "../pages/Search";

const GlobalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category/:product" element={<Product />} />
      <Route path="/:category" element={<Catelog />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<Search/>} />
    </Routes>
  );
};

export default GlobalRoutes;
