import React from 'react'
import PropTypes from "prop-types";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NoHeaderLayout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <div>{children}</div>
      <Footer/>
    </div>
    )
}


NoHeaderLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoHeaderLayout;