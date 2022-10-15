import PropTypes from "prop-types";

import Navbar from '../../components/Navbar';
import Aside from '../../components/Aside';
import Footer from '../../components/Footer';

function DefaultLayout({ children }) {
  return (
    <div>
      <Navbar />
      <Aside />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default DefaultLayout;
