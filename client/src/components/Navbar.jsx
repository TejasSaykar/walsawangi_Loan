import { message } from "antd";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
  };

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
                      location.pathname === "/" && "text-red-400"
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

          <Link
            to={"/bank-withdraw"}
            onMouseEnter={() => setShow1(true)}
            onMouseLeave={() => setShow1(false)}
            onClick={() => setShow1(false)}
            className={`${
              location.pathname.split("/")[1] == "bank-withdraw" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md relative cursor-pointer`}
          >
            Bank
            {show1 && (
              <div
                onMouseEnter={() => setShow1(true)}
                onMouseLeave={() => setShow1(false)}
                onClick={() => setShow1(false)}
                className="absolute w-[150px] py-2 "
              >
                <div className="shadow-lg rounded border border-gray-300 flex flex-col p-4 gap-1 text-teal-800 bg-white">
                  <Link
                    to={"/bank-withdraw"}
                    className={`font-medium text-sm ${
                      location.pathname.split("/")[1] === "bank-withdraw" &&
                      "text-red-400"
                    }`}
                  >
                    Bank Withdrawal
                  </Link>
                  <Link
                    to={"/bank-deposit"}
                    className={`${
                      location.pathname.split("/")[1] === "bank-deposit" &&
                      "text-red-400"
                    } font-medium text-sm`}
                  >
                    Bank Deposit
                  </Link>
                </div>
              </div>
            )}
          </Link>

          <Link
            to={"/journal"}
            onMouseEnter={() => setShow2(true)}
            onMouseLeave={() => setShow2(false)}
            onClick={() => setShow2(false)}
            className={`${
              location.pathname.split("/")[1] == "journal" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md relative cursor-pointer`}
          >
            Vouchers
            {show2 && (
              <div
                onMouseEnter={() => setShow2(true)}
                onMouseLeave={() => setShow2(false)}
                onClick={() => setShow2(false)}
                className="absolute w-[150px] py-2 z-20"
              >
                <div className="shadow-lg rounded border border-gray-300 flex flex-col p-4 gap-1 text-teal-800 bg-white">
                  <Link
                    to={"/journal"}
                    className={`font-medium text-sm ${
                      location.pathname.split("/")[1] === "journal" &&
                      "text-red-400"
                    }`}
                  >
                    Journal Voucher
                  </Link>
                  <Link
                    to={"/receipt"}
                    className={`${
                      location.pathname.split("/")[1] === "receipt" &&
                      "text-red-400"
                    } font-medium text-sm`}
                  >
                    Receipt Voucher
                  </Link>
                  <Link
                    to={"/payment"}
                    className={`${
                      location.pathname.split("/")[1] === "payment" &&
                      "text-red-400"
                    } font-medium text-sm`}
                  >
                    Payment Voucher
                  </Link>
                </div>
              </div>
            )}
          </Link>

          <div className="w-2/3 mx-auto flex justify-end">
            <Link
              to={"/login"}
              className="w-fit bg-sky-600 px-4 py-2 rounded-md font-semibold"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
