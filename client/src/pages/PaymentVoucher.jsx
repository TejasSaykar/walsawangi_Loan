import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { message } from "antd";

const PaymentVoucher = () => {
  const [inputs, setInputs] = useState({});
  const [payment, setPayment] = useState([]);
  const [rowId, setRowId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/payment/payments`
    );
    if (data) {
      setPayment(data.payments);
      //   console.log(data.receipts);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const getSinglePayment = async (id) => {
    setRowId(id);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/payment/payment/${id}`
      );
      if (data) {
        setInputs(data.payment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setInputs({
      branch: "",
      voucherNo: "",
      voucherDate: "",
      bankAC: "",
      ledgerAC: "",
      amount: "",
      remark: "",
    });
    setRowId("");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/payment/create`,
        {
          ...inputs,
        }
      );
      if (data) {
        message.success("Payment Created !");
        fetchPayments();
        handleReset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/payment/update/${rowId}`,
        {
          ...inputs,
        }
      );
      if (data) {
        message.success("Payment Updated !");
        fetchPayments();
        handleReset();
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
        `${import.meta.env.VITE_BASE_URL}/api/payment/delete/${rowId}`
      );
      if (data) {
        message.success("Payment Deleted !");
        fetchPayments();
        handleReset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-full h-screen">
        <div className="w-full grid grid-cols-12 py-4">
          <div className="w-full col-span-4">
            <div className="w-full flex flex-col gap-4 border-r-[2px] p-4">
              <div className="text-lg text-center font-semibold bg-teal-500 text-white">
                <h2>Payment Voucher</h2>
              </div>
              <form className="flex flex-col gap-6">
                <div className="w-full flex items-center gap-6">
                  <div className="w-full flex items-center">
                    <label htmlFor="" className="w-1/3 text-sm font-semibold">
                      Branch
                    </label>
                    <input
                      type="text"
                      value={inputs.branch}
                      onChange={(e) =>
                        setInputs({ ...inputs, branch: e.target.value })
                      }
                      className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 items-center gap-6">
                  <div className="w-full flex items-center">
                    <label htmlFor="" className="w-1/3 text-sm font-semibold">
                      Voucher No.
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.voucherNo}
                      onChange={(e) =>
                        setInputs({ ...inputs, voucherNo: e.target.value })
                      }
                      className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                    />
                  </div>
                  <div className="w-full flex items-center">
                    <label
                      htmlFor=""
                      className="w-1/3 text-sm font-semibold relative"
                    >
                      Voucher Date
                    </label>
                    <input
                      required
                      type="date"
                      value={inputs.voucherDate}
                      onChange={(e) =>
                        setInputs({ ...inputs, voucherDate: e.target.value })
                      }
                      className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col items-center gap-6">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor=""
                      className="w-1/3 text-sm font-semibold relative"
                    >
                      Bank A/C
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.bankAC}
                      onChange={(e) =>
                        setInputs({ ...inputs, bankAC: e.target.value })
                      }
                      className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                  <div className="w-full flex items-center">
                    <label
                      htmlFor=""
                      className="w-1/3 text-sm font-semibold relative"
                    >
                      Ledger A/C
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.ledgerAC}
                      onChange={(e) =>
                        setInputs({ ...inputs, ledgerAC: e.target.value })
                      }
                      className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center gap-6">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor=""
                      className="w-1/3 text-sm font-semibold relative"
                    >
                      Amount
                    </label>
                    <input
                      required
                      type="number"
                      value={inputs.amount}
                      onChange={(e) =>
                        setInputs({ ...inputs, amount: e.target.value })
                      }
                      className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center gap-6">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor=""
                      className="w-1/3 text-sm font-semibold relative"
                    >
                      Remarks
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.remark}
                      onChange={(e) =>
                        setInputs({ ...inputs, remark: e.target.value })
                      }
                      className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4 lg:flex-row space-y-4 lg:space-y-0">
                  <div className="flex items-center gap-7">
                    {!rowId && (
                      <button
                        onClick={handleCreate}
                        className="bg-teal-600 px-4 py-2 text-white rounded-sm font-bold"
                      >
                        Save
                      </button>
                    )}
                    {rowId && (
                      <button
                        onClick={handleUpdate}
                        className="bg-teal-600 px-4 py-2 text-white rounded-sm font-bold"
                      >
                        Update
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0">
                    <button
                      onClick={handleDelete}
                      className="bg-red-600 px-4 py-2 text-white rounded-sm font-bold"
                    >
                      Delete
                    </button>
                    <button
                      type="reset"
                      onClick={handleReset}
                      className="bg-red-600 px-4 py-2 text-white rounded-sm font-bold"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full col-span-8">
            <div className="container max-w-screen px-4 mx-auto sm:px-8 overflow-y-auto">
              <div className="py-8">
                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                  <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            VrNo
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            BName
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            TDate
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Ledger
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>

                      <tbody className="w-full">
                        {loading ? (
                          <div className="translate-x-[20vw] mx-auto text-center flex items-center justify-center">
                            <h2 className="text-center py-2 text-teal-600 animate-bounce text-lg font-semibold">
                              Loading...
                            </h2>
                          </div>
                        ) : (
                          payment?.map((bank) => (
                            <>
                              <tr
                                title="Edit"
                                key={bank._id}
                                onClick={() => getSinglePayment(bank._id)}
                                className={`${
                                  bank._id == rowId ? "bg-cyan-400" : "bg-white"
                                } cursor-pointer`}
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
                                        {bank.voucherNo}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {bank.branch}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {bank.voucherDate}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                    ></span>
                                    <span className="relative">
                                      {bank.ledgerAC}
                                    </span>
                                  </span>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                    ></span>
                                    <span className="relative">
                                      {bank.amount}
                                    </span>
                                  </span>
                                </td>

                                {/* <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                <span className="relative px-3 flex gap-4 items-center py-1 font-semibold leading-tight">
                                  <Link to={`/update-bank/${bank._id}`}>
                                    <span
                                      className="text-xl cursor-pointer text-green-700"
                                      title="Edit"
                                    >
                                      <FaEdit />
                                    </span>
                                  </Link>
                                  <Link onClick={() => handleDelete(loan._id)}>
                                    <span
                                      className="text-xl cursor-pointer text-red-600"
                                      title="Delete"
                                    >
                                      <RiDeleteBin5Fill />
                                    </span>
                                  </Link>
                                </span>
                              </td> */}
                              </tr>
                            </>
                          ))
                        )}
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
      </div>
    </Layout>
  );
};

export default PaymentVoucher;
