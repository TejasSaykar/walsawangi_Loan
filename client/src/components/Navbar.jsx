import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [show, setShow] = useState(false);

  return (
    <nav className="w-full bg-teal-800 text-white">
      <div className="w-full flex items-center gap-4 px-5 py-1">
        <div>
          <h2 className="font-semibold">LOGO</h2>
        </div>
        <div className="w-full flex items-center font-[400] gap-4">
          <Link
            to={"/"}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={() => setShow(false)}
            className={`${
              location.pathname == "/" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md relative`}
          >
            Master
            {show && (
              <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={() => setShow(false)}
                className="absolute w-[150px] py-2 "
              >
                <div className="shadow-lg rounded border border-gray-300 flex flex-col p-4 gap-1 text-teal-800 bg-white">
                  <Link
                    to={"/bank-details"}
                    className={`font-medium text-sm ${
                      location.pathname.split("/")[1] === "bank-details" &&
                      "text-red-400"
                    }`}
                  >
                    Bank Master
                  </Link>
                  <Link
                    to={"/group"}
                    className={`${
                      location.pathname.split("/")[1] === "group" &&
                      "text-red-400"
                    } font-medium text-sm`}
                  >
                    Group Master
                  </Link>
                  <Link
                    to={"/loan-collection"}
                    className={`${
                      location.pathname.split("/")[1] === "loan-collection" &&
                      "text-red-400"
                    } font-medium text-sm`}
                  >
                    Loan Collection
                  </Link>
                </div>
              </div>
            )}
          </Link>
          <Link
            to={"/customer"}
            className={`${
              location.pathname.split("/")[1] == "customer" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md`}
          >
            Customer
          </Link>
          <Link
            to={"/loan"}
            className={`${
              location.pathname.split("/")[1] == "loan" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md`}
          >
            Loan Section
          </Link>
          {/* <Link>Collector</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
