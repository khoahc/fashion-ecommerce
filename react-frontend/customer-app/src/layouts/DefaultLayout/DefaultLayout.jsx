import PropTypes from "prop-types";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function DefaultLayout({ children }) {
  return (
    <div className="container">
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
