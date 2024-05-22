import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="px-5 bg-orange-100/20">{children}</main>
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
};

export default Layout;
