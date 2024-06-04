import { message } from "antd";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
  };

  return (
    <nav className="w-full bg-teal-800 text-white">
      <div className="w-full flex items-center gap-4 px-5 py-1">
        <div className="w-full flex items-center font-[400] gap-4">
          <div>
            <h2 className="font-semibold">LOGO</h2>
          </div>
          <Link
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={() => setShow(!show)}
            className={`${
              location.pathname.split("/")[1] == "bank-details" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] === "group" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] === "loan-collection" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md relative`}
          >
            Master
            {show && (
              <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={() => setShow(false)}
                className="absolute w-[150px] py-2 z-20"
              >
                <div className="shadow-lg rounded border border-gray-300 flex flex-col p-4 gap-3 text-teal-800 bg-white">
                  <Link
                    to={"/bank-details"}
                    className={`font-medium text-sm ${
                      location.pathname.split("/")[1] === "bank-details" &&
                      "text-red-400"
                    } `}
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
            onMouseEnter={() => setShow3(true)}
            onMouseLeave={() => setShow3(false)}
            onClick={() => setShow3(!show3)}
            className={`${
              location.pathname.split("/")[1] == "loan" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] == "group-loan" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] == "create-loan" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] == "create-group-loan" &&
              "bg-blue-800/40 border border-blue-600"
            }
             ${
               location.pathname.split("/")[1] == "single-repay" &&
               "bg-blue-800/40 border border-blue-600"
             } ${
              location.pathname.split("/")[1] == "group-repay" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md relative`}
          >
            Loan Section
            {show3 && (
              <div
                onMouseEnter={() => setShow3(true)}
                onMouseLeave={() => setShow3(false)}
                onClick={() => setShow3(false)}
                className="absolute w-[200px] py-2 z-20"
              >
                <div className="shadow-lg rounded border border-gray-300 flex flex-col p-4 gap-3 text-teal-800 bg-white">
                  <Link
                    to={"/loan"}
                    className={`font-medium text-sm ${
                      location.pathname.split("/")[1] === "loan" &&
                      "text-red-400"
                    }`}
                  >
                    Create Single Loan
                  </Link>
                  <Link
                    to={"/group-loan"}
                    className={`font-medium text-sm ${
                      location.pathname.split("/")[1] === "group-loan" &&
                      "text-red-400"
                    }`}
                  >
                    Create Group Loan
                  </Link>
                  <Link
                    to={"/single-repay"}
                    className={`font-medium text-sm ${
                      location.pathname.split("/")[1] === "single-repay" &&
                      "text-red-400"
                    }`}
                  >
                    Loan Re-Payment(Single)
                  </Link>
                  <Link
                    to={"/group-repay"}
                    className={`${
                      location.pathname.split("/")[1] === "group-repay" &&
                      "text-red-400"
                    } font-medium text-sm`}
                  >
                    Loan Re-Payment(Group)
                  </Link>
                </div>
              </div>
            )}
          </Link>

          <Link
            onMouseEnter={() => setShow1(true)}
            onMouseLeave={() => setShow1(false)}
            onClick={() => setShow1(!show1)}
            className={`${
              location.pathname.split("/")[1] == "bank-withdraw" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] == "bank-deposit" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md relative cursor-pointer`}
          >
            Bank
            {show1 && (
              <div
                onMouseEnter={() => setShow1(true)}
                onMouseLeave={() => setShow1(false)}
                onClick={() => setShow1(false)}
                className="absolute w-[150px] py-2 z-20"
              >
                <div className="shadow-lg rounded border border-gray-300 flex flex-col p-4 gap-3 text-teal-800 bg-white">
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
            onMouseEnter={() => setShow2(true)}
            onMouseLeave={() => setShow2(false)}
            onClick={() => setShow2(!show2)}
            className={`${
              location.pathname.split("/")[1] == "journal" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] == "receipt" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] == "payment" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md relative cursor-pointer`}
          >
            Vouchers
            {show2 && (
              <div
                onMouseEnter={() => setShow2(true)}
                onMouseLeave={() => setShow2(false)}
                // onClick={() => setShow2(false)}
                className="absolute w-[150px] py-2 z-20"
              >
                <div className="shadow-lg rounded border border-gray-300 flex flex-col p-4 gap-3 text-teal-800 bg-white">
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

          <h2
            onMouseEnter={() => setShow4(true)}
            onMouseLeave={() => setShow4(false)}
            onClick={() => setShow4(!show4)}
            className={`${
              location.pathname.split("/")[1] == "loan-requisition" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] == "loan-approval" &&
              "bg-blue-800/40 border border-blue-600"
            } ${
              location.pathname.split("/")[1] == "loan-due" &&
              "bg-blue-800/40 border border-blue-600"
            } px-2 rounded-md relative cursor-pointer`}
          >
            Reports
            {show4 && (
              <div
                onMouseEnter={() => setShow4(true)}
                onMouseLeave={() => setShow4(false)}
                // onClick={() => setShow4(!show4)}
                className="absolute w-[200px] py-2 z-20"
              >
                <div className="shadow-lg rounded border border-gray-300 flex flex-col p-4 gap-3 text-teal-800 bg-white">
                  <Link
                    to={"/loan-requisition"}
                    className={`font-medium text-sm ${
                      location.pathname.split("/")[1] === "loan-requisition" &&
                      "text-red-400"
                    }`}
                  >
                    Loan Requisition Report
                  </Link>
                  <Link
                    to={"/loan-approval"}
                    className={`${
                      location.pathname.split("/")[1] === "loan-approval" &&
                      "text-red-400"
                    } font-medium text-sm`}
                  >
                    Loan Approval Report
                  </Link>
                  <Link
                    to={"/loan-due"}
                    className={`${
                      location.pathname.split("/")[1] === "loan-due" &&
                      "text-red-400"
                    } font-medium text-sm`}
                  >
                    EMI Due Report
                  </Link>
                </div>
              </div>
            )}
          </h2>

          <div className="w-1/2 mx-auto flex flex-grow float-end justify-end ">
            <Link
              to={"/login"}
              className="w-fit float-end bg-sky-600 px-4 py-2 rounded-md font-semibold"
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
