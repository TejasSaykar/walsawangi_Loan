import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Layout from "../components/Layout";

const Loan = () => {
  const [loan, setLoan] = useState([]);
  const [filteredData, setFilteredData] = useState(undefined);
  const [loanId, setLoanId] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log("Filtered data : ", filteredData);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = loan.slice(firstIndex, lastIndex);
  const npage = Math.ceil(loan.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);
  const preDisabled = currentPage === 1;
  const nextDisabled = currentPage === npage;

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (loanId) {
      const filterData = loan?.filter((loan) => loan.loanId === loanId);
      setFilteredData(filterData[0]);
      console.log(filterData);
    } else {
      setFilteredData(undefined);
    }
  }, [loanId, loan]);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const { data: loans } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/loan/get-loans`
      );
      if (loans) {
        // console.log("Loan Data : ", loans.loans);
        setLoan(loans.loans);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleDelete = async (id) => {
    const conf = confirm("Are you sure to delete ?");
    if (!conf) {
      return;
    }
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/loan/delete/${id}`
      );
      if (data.success == true) {
        fetchLoans();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/loan/status/${id}`,
        {
          isApprove: true,
          approveDate: new Date().toLocaleDateString(),
        }
      );
      if (data) {
        console.log("Status updated : ", data.loan);
        message.success("Loan Approved !");
        fetchLoans();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container max-w-screen px-4 mx-auto sm:px-8">
        <div>
          <h2 className="py-3 text-center font-semibold text-2xl text-stone-700">
            Single Loans
          </h2>
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold text-blue-700">
                Search Loan Details by Loan Id
              </h2>
              <input
                type="text"
                onChange={(e) => setLoanId(e.target.value)}
                className="px-2 py-1 focus:outline-none ring-1 rounded-md ring-gray-300 focus:ring-blue-400"
              />
            </div>
            <Link
              to={"/create-loan"}
              className="bg-teal-700 px-5 py-2 rounded-md text-white font-semibold"
            >
              Create Loan
            </Link>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-stone-700 text-stone-100">
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left border-b border-gray-200"
                    >
                      Loan Id
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left border-b border-gray-200"
                    >
                      Loan Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left border-b border-gray-200"
                    >
                      Applicant Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left border-b border-gray-200"
                    >
                      Bank Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left border-b border-gray-200"
                    >
                      Mode
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left border-b border-gray-200"
                    >
                      Term
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left border-b border-gray-200"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left border-b border-gray-200"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData ? (
                    <>
                      <tr key={filteredData._id} className={`"bg-white"`}>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {filteredData?.loanId}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="#" className="relative block"></a>
                            </div>
                            <div className="">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {filteredData.productName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {filteredData?.applicantName}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {filteredData.bankName}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {filteredData.mode}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">
                              {filteredData.loanTerm}
                            </span>
                          </span>
                        </td>

                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          {filteredData.isApprove !== true && (
                            <button
                              onClick={() => handleApprove(filteredData._id)}
                              className="bg-teal-600 w-fit px-2 py-1 rounded-md text-white"
                            >
                              Approve
                            </button>
                          )}
                          {filteredData.isApprove === true && (
                            <p className="text-gray-900 bg-green-200 w-fit px-2 py-1 rounded-xl text-xs font-bold whitespace-no-wrap">
                              {filteredData.status === true
                                ? "Closed"
                                : "Active"}
                            </p>
                          )}
                        </td>

                        <td className="px-5 py-5 text-sm  border-b border-gray-200">
                          <span className="relative px-3 flex gap-4 items-center py-1 font-semibold leading-tight">
                            <Link onClick={() => handleDelete(loan._id)}>
                              <span
                                className="text-xl cursor-pointer text-red-600"
                                title="Delete"
                              >
                                <RiDeleteBin5Fill />
                              </span>
                            </Link>
                          </span>
                        </td>
                      </tr>
                    </>
                  ) : (
                    records?.map((loan) => (
                      <>
                        <tr key={loan._id} className={`bg-white font-medium`}>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan?.loanId}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <a href="#" className="relative block"></a>
                              </div>
                              <div className="">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {loan.productName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan?.applicantName}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.bankName}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.mode}.
                            </p>
                          </td>
                          {/* <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                              ></span>
                              <span className="relative">
                                {loan.gurdianName}
                              </span>
                            </span>
                          </td> */}
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                              ></span>
                              <span className="relative">{loan.term}</span>
                            </span>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            {!loan.isApprove && (
                              <button
                                onClick={() => handleApprove(loan._id)}
                                className="bg-teal-600 w-fit px-2 py-1 rounded-md text-white"
                              >
                                Approve
                              </button>
                            )}
                            {loan.isApprove && (
                              <p className="text-gray-900 bg-green-200 w-fit px-2 py-1 rounded-xl text-xs font-bold whitespace-no-wrap">
                                {loan.status === false ? "Active" : "Closed"}
                              </p>
                            )}
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <span className="relative px-3 flex gap-4 items-center py-1 font-semibold leading-tight">
                              <Link onClick={() => handleDelete(loan._id)}>
                                <span
                                  className="text-xl cursor-pointer text-red-600"
                                  title="Delete"
                                >
                                  <RiDeleteBin5Fill />
                                </span>
                              </Link>
                            </span>
                          </td>
                        </tr>
                      </>
                    ))
                  )}

                  {loading && (
                    <div className="text-center font-semibold p-3 text-teal-700">
                      <h2>Loading...</h2>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
            {!filteredData && (
              <div className="w-full flex items-center gap-3 justify-center">
                <button
                  onClick={prePage}
                  disabled={preDisabled}
                  className={`${
                    preDisabled && "bg-teal-300 cursor-not-allowed"
                  } px-5 py-2 bg-teal-600 text-white rounded-md`}
                >
                  Prev
                </button>
                <span className="ring-1 ring-teal-300 px-3 py-1">
                  {currentPage} of {npage}
                </span>
                <button
                  onClick={nextPage}
                  disabled={nextDisabled}
                  className={`${
                    nextDisabled && "bg-teal-300 cursor-not-allowed"
                  } px-5 py-2 bg-teal-600 text-white rounded-md`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Loan;
