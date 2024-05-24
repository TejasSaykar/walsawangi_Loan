import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import moment from "moment";
import { message } from "antd";

const Withdrawal = () => {
  const [inputs, setInputs] = useState({});
  const [withdrawal, setWithdrawal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFileredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentId, setCurrentId] = useState("");

  const search = (e) => {
    if (startDate && endDate) {
      const filtered = withdrawal.filter((item) => {
        const withdrawDate = new Date(item.date);
        return (
          withdrawDate >= new Date(startDate) &&
          withdrawDate <= new Date(endDate)
        );
      });
      setWithdrawal(filtered);
      console.log(filtered);
    } else {
      setFileredData([]);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const { data: withdrawals } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/withdrawal/withdrawals`
      );
      if (withdrawals) {
        console.log("Withdrawals : ", withdrawals.withdrawals);
        setWithdrawal(withdrawals.withdrawals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/withdrawal/withdraw`,
        {
          ...inputs,
        }
      );
      if (data) {
        // console.log("Withdrawal : ", data);
        setInputs({
          branch: "",
          accountNo: "",
          date: "",
          amount: "",
          chequeNo: "",
          bankName: "",
          remark: "",
        });
        fetchWithdrawals();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWithdrawals = () => {
    fetchWithdrawals();
    setStartDate("");
    setEndDate("");
  };

  const fetchSingleWithdrawal = async (id) => {
    setCurrentId(id);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/withdrawal/withdrawal/${id}`
      );
      if (data) {
        console.log("Single withdrawal : ", data.withdrawal);
        setInputs(data.withdrawal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/withdrawal/update/${currentId}`,
        {
          ...inputs,
        }
      );
      if (data) {
        message.success("Withdrawal Updated");
        fetchWithdrawals();
        setInputs({
          branch: "",
          accountNo: "",
          date: "",
          amount: "",
          chequeNo: "",
          bankName: "",
          remark: "",
        });
        setCurrentId('')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const conf = confirm("Do you want to delete this item ?");
    if (!conf) {
      return;
    }
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/withdrawal/delete/${currentId}`
      );
      if (data) {
        message.success("Withdrawal Deleted");
        fetchWithdrawals();
        setInputs({
          branch: "",
          accountNo: "",
          date: "",
          amount: "",
          chequeNo: "",
          bankName: "",
          remark: "",
        });
        setCurrentId('')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="text-center py-4 text-xl font-semibold">
          <h2>Bank Transaction - Withdrawal</h2>
        </div>
        <div className="w-full grid md:grid-cols-12 gap-4">
          <div className="w-full col-span-9 grid grid-cols-3 gap-8">
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex gap-2">
                <label className="text-sm font-semibold">Branch</label>
                <input
                  type="text"
                  value={inputs.branch}
                  onChange={(e) =>
                    setInputs({ ...inputs, branch: e.target.value })
                  }
                  className="px-2 focus:outline-none ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                />
              </div>
              <div className="w-full flex gap-2 items-center">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">A/C No</label>
                  <input
                    type="number"
                    value={inputs.accountNo}
                    onChange={(e) =>
                      setInputs({ ...inputs, accountNo: e.target.value })
                    }
                    className="px-2 w-2/3 focus:outline-none ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                  />
                </div>
                <input
                  type="number"
                  className="px-2 w-1/2 focus:outline-none ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                />
              </div>
              <div className="w-full flex gap-2">
                <div className="w-full flex gap-2">
                  <label className="text-sm font-semibold">Date</label>
                  <input
                    type="date"
                    value={inputs.date}
                    onChange={(e) =>
                      setInputs({ ...inputs, date: e.target.value })
                    }
                    className="focus:outline-none w-2/3 px-[2px] ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                  />
                </div>
                <div className="w-full flex gap-2 items-center">
                  <label className="text-sm font-semibold">Amount</label>
                  <input
                    type="number"
                    value={inputs.amount}
                    onChange={(e) =>
                      setInputs({ ...inputs, amount: e.target.value })
                    }
                    className="px-2 w-full focus:outline-none ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 items-center">
                <label className="text-sm font-semibold">Cheque No.</label>
                <input
                  type="text"
                  value={inputs.chequeNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, chequeNo: e.target.value })
                  }
                  className="px-2 w-2/3 focus:outline-none ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-sm font-semibold">Bank Name</label>
                <input
                  type="text"
                  value={inputs.bankName}
                  onChange={(e) =>
                    setInputs({ ...inputs, bankName: e.target.value })
                  }
                  className="px-2 w-2/3 focus:outline-none ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-sm font-semibold">Remark</label>
                <input
                  type="text"
                  value={inputs.remark}
                  onChange={(e) =>
                    setInputs({ ...inputs, remark: e.target.value })
                  }
                  className="px-2 w-2/3 focus:outline-none ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                {currentId ? (
                  <button
                    type="submit"
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-teal-700 text-white font-semibold rounded-md"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-teal-700 text-white font-semibold rounded-md"
                  >
                    Save
                  </button>
                )}
              </div>
              <div className="">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <label className="font-bold text-teal-800">Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-2 w-2/3 focus:outline-none ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                  />
                </div>
                <div className="flex gap-4">
                  <label className="font-bold text-teal-800">To</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-2 w-2/3 focus:outline-none ring-1 ring-gray-400 rounded-md focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={search}
                  className="ring-1 text-[14px] bg-white py-3 font-semibold ring-teal-300 p-2 rounded-md"
                >
                  Search Transaction
                </button>
                <button
                  onClick={getAllWithdrawals}
                  className="bg-teal-600 py-2 text-white font-semibold rounded-md"
                >
                  All
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full col-span-8">
          <div className="container max-w-screen px-4 mx-auto sm:px-8 overflow-y-auto">
            <div className="py-8">
              <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Account No
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
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Cheque No
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Remark
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="w-full">
                      {withdrawal
                        ? withdrawal?.map((item) => (
                            <>
                              <tr
                                title="Edit"
                                key={item._id}
                                onClick={() => getSingleGroup(item._id)}
                                className={`bg-white cursor-pointer`}
                              >
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                      <a
                                        href="#"
                                        className="relative block"
                                      ></a>
                                    </div>
                                    <div className="">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {item.accountNo}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item.bankName}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item.branch}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                    ></span>
                                    <span className="relative">
                                      {moment(item.date).format("DD-MM-YYYY")}
                                    </span>
                                  </span>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item.chequeNo}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                    ></span>
                                    <span className="relative">
                                      {item.remark}
                                    </span>
                                  </span>
                                </td>

                                <td className="px-5 py-5 text-lg flex items-center border-b border-gray-200">
                                  <button
                                    title="Edit"
                                    className="text-teal-600 text-xl"
                                    onClick={() =>
                                      fetchSingleWithdrawal(item._id)
                                    }
                                  >
                                    <FaEdit />
                                  </button>
                                  {/* <button
                                    title="Delete"
                                    className="text-red-500 text-xl"
                                  >
                                    <RiDeleteBin5Fill />
                                  </button> */}
                                </td>
                              </tr>
                            </>
                          ))
                        : filteredData.map((filter) => (
                            <>
                              <tr
                                title="Edit"
                                key={filter._id}
                                onClick={() => getSingleGroup(filter._id)}
                                className={`bg-white cursor-pointer`}
                              >
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                      <a
                                        href="#"
                                        className="relative block"
                                      ></a>
                                    </div>
                                    <div className="">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {filter.accountNo}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {filter.bankName}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {filter.branch}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                    ></span>
                                    <span className="relative">
                                      {moment(filter.date).format("DD-MM-YYYY")}
                                    </span>
                                  </span>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {filter.chequeNo}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                    ></span>
                                    <span className="relative">
                                      {filter.remark}
                                    </span>
                                  </span>
                                </td>

                                <td className="px-5 py-5 text-lg flex items-center border-b border-gray-200">
                                  <button
                                    title="Edit"
                                    className="text-teal-600 text-xl"
                                    onClick={() =>
                                      fetchSingleWithdrawal(item._id)
                                    }
                                  >
                                    <FaEdit />
                                  </button>
                                  {/* <button
                                    title="Delete"
                                    className="text-red-500 text-xl"
                                  >
                                    <RiDeleteBin5Fill />
                                  </button> */}
                                </td>
                              </tr>
                            </>
                          ))}
                    </tbody>
                    {loading && (
                      <div className="translate-x-[20vw] mx-auto text-center flex items-center justify-center">
                        <h2 className="text-center py-2 text-teal-600 animate-bounce text-lg font-semibold">
                          Loading...
                        </h2>
                      </div>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Withdrawal;
