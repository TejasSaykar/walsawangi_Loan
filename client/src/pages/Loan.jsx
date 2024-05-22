import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Layout from "../components/Layout";

const Loan = () => {
  const [loan, setLoan] = useState([]);

  const fetchLoans = async () => {
    try {
      const { data: loans } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/loan/get-loans`
      );
      if (loans) {
        console.log("Loan Data : ", loans);
        setLoan(loans);
      }
    } catch (error) {
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

  return (
    <Layout>
      <div className="container max-w-screen px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="flex justify-end">
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
                  <tr>
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
                      Branch
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Guardian
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Term
                    </th>
                    {/* <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Max Term
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Mode
                    </th> */}
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loan?.loans?.map((loan) => (
                    <>
                      <tr key={loan._id} className="">
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {loan.bankName}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {loan.branch}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">{loan.gurdianName}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">{loan.term}</span>
                          </span>
                        </td>
                        {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">{loan.maxTerm}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">
                              {loan.collectionMode}
                            </span>
                          </span>
                        </td> */}

                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative px-3 flex gap-4 items-center py-1 font-semibold leading-tight">
                            {/* <Link to={`/update-loan/${loan._id}`}>
                              <span
                                className="text-xl cursor-pointer text-green-700"
                                title="Edit"
                              >
                                <FaEdit />
                              </span>
                            </Link> */}
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Loan;
