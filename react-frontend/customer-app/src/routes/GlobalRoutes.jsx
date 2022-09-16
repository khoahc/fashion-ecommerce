import React from "react";
import { Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import Catelog from '../pages/Catelog'
import Product from '../pages/Product'
import Cart from '../pages/Cart'

const GlobalRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/catelog/:slug' element={<Product/>}/>
      <Route path='/catelog'  element={<Catelog/>} />
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
  )
};

export default GlobalRoutes;
