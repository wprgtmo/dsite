import PropTypes from "prop-types";
import Header from "../components/Header/Header";
import Footer from "../components/Footers/Footer";
import TorneySideBar from "../components/Sidebar/TourneyBar";

export default function TourneyLayout({ children }) {
  return (
    <>
      <Header />

      <TorneySideBar />

      <main id="main" className="main">
       {children}
      </main>

      <Footer/>
    </>
  );
}

TourneyLayout.proptypes = {
  children: PropTypes.node,
};