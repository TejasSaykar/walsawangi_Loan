import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { message } from "antd";
import axios from "axios";

const RequisitionReport = () => {
  const [loan, setLoan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupLoans, setGroupLoans] = useState([]);
  const [tab, setTab] = useState("loan");

  const fetchLoans = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/loan/requisition`
      );
      if (data) {
        // console.log("Requisition Loan : ", data.requisitionLoans);
        setLoan(data.requisitionLoans);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const fetchGroupLoans = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/loan/group-requisition`
      );
      if (data) {
        setGroupLoans(data.requisitionLoans);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchLoans();
    fetchGroupLoans();
  }, []);

  return (
    <Layout>
      <div className="container max-w-screen px-4 mx-auto sm:px-8">
        <div className="">
          <div>
            <h2 className="text-2xl font-semibold pt-3 text-center text-stone-800">
              {tab === 'loan' ? "Single Loan" : "Group Loan"} Requisition Report
            </h2>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div>
              {tab === "loan" && (
                <button
                  onClick={() => setTab("group")}
                  className="bg-teal-700 rounded-md mb-5 px-3 py-2 text-white"
                >
                  Group Loan Requisitions
                </button>
              )}
              {tab === "group" && (
                <button
                  onClick={() => setTab("loan")}
                  className="bg-teal-700 rounded-md mb-5 px-3 py-2 text-white"
                >
                  Single Loan Requisitions
                </button>
              )}
            </div>
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-stone-700 text-stone-100">
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      Loan ID
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      Reg. Date
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      {tab === 'loan' ? "Member" : "Group"} ID
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      {tab === 'loan' ? "Applicant Name" : "Group Head"}
                    </th>
                    {tab === 'loan' && <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      Loan
                    </th>}
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      Term
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      ROI
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      EMI
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-xs text-left border-b border-gray-200"
                    >
                      Mode
                    </th>
                  </tr>
                </thead>

                {tab === "loan" && (
                  <tbody>
                    {loan?.map((loan) => (
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
                                  {loan.dateOfJoining}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.memberId}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.applicantName}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-stone-900">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-full opacity-50"
                              ></span>
                              <span className="relative">{loan.purpose}</span>
                            </span>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-stone-900">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-green-300 font-bold rounded-full opacity-50"
                              ></span>
                              <span className="relative">
                                {loan.loanAmount}
                              </span>
                            </span>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.term}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.ROI}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.EMI}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.mode}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    {loading && (
                      <div className="text-center font-semibold p-3 text-teal-700">
                        <h2>Loading...</h2>
                      </div>
                    )}

                    {loan.length === 0 && (
                      <h2
                        className="text-center w-full py-3 text-base font-semibold
                    "
                      >
                        No Single Loan Requisitions are available
                      </h2>
                    )}
                  </tbody>
                )}

                {tab === "group" && (
                  <tbody>
                    {groupLoans?.map((loan) => (
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
                                  {loan.dateOfJoining}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.groupId}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.groupHead}
                            </p>
                          </td>

                        

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-stone-900">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-green-300 font-bold rounded-full opacity-50"
                              ></span>
                              <span className="relative">
                                {loan.loanAmount}
                              </span>
                            </span>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.term}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.ROI}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.EMI}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {loan.mode}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    {loading && (
                      <div className="text-center font-semibold p-3 text-teal-700">
                        <h2>Loading...</h2>
                      </div>
                    )}

                    {groupLoans.length === 0 && (
                      <h2
                        className="text-center w-full py-3 text-base font-semibold
                    "
                      >
                        No Group Loan Requisitions are available
                      </h2>
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequisitionReport;
