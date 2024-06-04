import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Layout from "../components/Layout";

const GroupLoan = () => {
  const [groupLoan, setGroupLoan] = useState([]);
  const [filteredData, setFilteredData] = useState(undefined);
  const [loanId, setLoanId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loanId) {
      const filterData = groupLoan?.filter((loan) => loan.loanId === loanId);
      setFilteredData(filterData[0]);
    } else {
      setFilteredData(undefined);
    }
  }, [loanId, groupLoan]);

  const fetchGroupLoans = async () => {
    try {
      setLoading(true);
      const { data: groupLoans } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/loan/get-group-loans`
      );
      if (groupLoans) {
        setGroupLoan(groupLoans.groupLoans);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroupLoans();
  }, []);

  const handleDelete = async (id, loanId) => {
    const conf = confirm("Are you sure to delete ?");
    if (!conf) {
      return;
    }
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/loan/delete-group-loan/${id}`,
        {
          params: { loanId },
        }
      );
      if (data.success == true) {
        message.success("Loan deleted !");
        fetchGroupLoans();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/loan/group-status/${id}`,
        {
          isApprove: true,
          approveDate: new Date().toLocaleDateString(),
        }
      );
      if (data) {
        // console.log("Status updated : ", data.loan);
        message.success("Loan Approved !");
        fetchGroupLoans();
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
            Group Loans
          </h2>
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold text-blue-700">
                Search Group Loan Details by Loan Id
              </h2>
              <input
                type="text"
                onChange={(e) => setLoanId(e.target.value)}
                className="px-2 py-1 focus:outline-none ring-1 rounded-md ring-gray-300 focus:ring-blue-400"
              />
            </div>
            <Link
              to={"/create-group-loan"}
              className="bg-teal-700 px-5 py-2 rounded-md text-white font-semibold"
            >
              Create Group Loan
            </Link>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Loan Id
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Loan Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Bank Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Group Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Term
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData ? (
                    <>
                      <tr
                        key={filteredData._id}
                        className={`${
                          filteredData.status === true
                            ? "bg-sky-400"
                            : "bg-white"
                        }`}
                      >
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
                            {filteredData.bankName}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {filteredData.groupName}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">
                              {filteredData.term}
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
                            <Link
                              onClick={() =>
                                handleDelete(loan._id, loan.loanId)
                              }
                            >
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
                    groupLoan?.map((loan) => (
                      <>
                        <tr
                          key={loan._id}
                          className={`${
                            loan.status === true ? "bg-sky-400" : "bg-white"
                          } font-medium`}
                        >
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
                              {loan.bankName}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.groupName}
                            </p>
                          </td>
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
                            {loan.isApprove !== true && (
                              <button
                                onClick={() => handleApprove(loan._id)}
                                className="bg-teal-600 w-fit px-2 py-1 rounded-md text-white"
                              >
                                Approve
                              </button>
                            )}
                            {loan.isApprove === true && (
                              <p className="text-gray-900 bg-green-200 w-fit px-2 py-1 rounded-xl text-xs font-bold whitespace-no-wrap">
                                {loan.status === true ? "Closed" : "Active"}
                              </p>
                            )}
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <span className="relative px-3 flex gap-4 items-center py-1 font-semibold leading-tight">
                              <Link
                                onClick={() =>
                                  handleDelete(loan._id, loan.loanId)
                                }
                              >
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GroupLoan;
