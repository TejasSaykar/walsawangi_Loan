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


  useEffect(() => {
    if (loanId) {
      const filterData = loan?.loans?.filter((loan) => loan.loanId === loanId);
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
        console.log("Loan Data : ", loans.loans);
        setLoan(loans);
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

  const updateLoan = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/loan/update/${filteredData._id}`,{
        ...filteredData,
        updatedDate: filteredData.date,
        status: true
      });
      if(data){
        console.log("Updated Data : ", data.loan);
        message.success("Loan Updated !");
        fetchLoans();
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Layout>
      <div className="container max-w-screen px-4 mx-auto sm:px-8">
        <div className="py-8">
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
            {filteredData && (
              <div className="w-fit flex gap-2 items-center">
                <input
                  type="date"
                  className="px-4 py-1 focus:outline-none ring-1 ring-gray-400 rounded-md bg-white focus:ring-blue-400"
                  onChange={(e) =>
                    setFilteredData({ ...filteredData, date: e.target.value })
                  }
                />
              </div>
            )}
            {filteredData ? (
              <button
                onClick={updateLoan}
                className="bg-teal-700 px-5 py-2 rounded-md text-white font-semibold"
              >
                Update Loan
              </button>
            ) : (
              <Link
                to={"/create-loan"}
                className="bg-teal-700 px-5 py-2 rounded-md text-white font-semibold"
              >
                Create Loan
              </Link>
            )}
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
                  {filteredData ? (
                    <>
                      <tr key={filteredData._id} className={`${filteredData.status === true ? "bg-sky-400" :"bg-white"}`}>
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
                            {filteredData.branch}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">
                              {filteredData.gurdianName}
                            </span>
                          </span>
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

                        <td className="px-5 py-5 text-sm  border-b border-gray-200">
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
                  ) : (
                    loan?.loans?.map((loan) => (
                      <>
                        <tr key={loan._id} className={`${loan.status === true ? 'bg-sky-400' : 'bg-white'} font-medium`}>
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
                              {loan.branch}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm border-b border-gray-200">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                              ></span>
                              <span className="relative">
                                {loan.gurdianName}
                              </span>
                            </span>
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

                          <td className="px-5 py-5 text-sm border-b border-gray-200">
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

export default Loan;
