import PropTypes from "prop-types";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <Navbar />
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
