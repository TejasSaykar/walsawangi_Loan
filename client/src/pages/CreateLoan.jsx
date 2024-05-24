import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const CreateLoan = () => {
  const [inputs, setInputs] = useState({});
  console.log("Inputs : ", inputs);

  const [customerNames, setCustomerNames] = useState([]);
  const [collection, setCollection] = useState([]);
  const [collections, setCollections] = useState({});

  const navigate = useNavigate();

  let terms = [];
  if (collections.totalTerms) {
    collections?.totalTerms?.forEach((element) => {
      terms.push(element);
    });
  }

  const fetchCustomerNames = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/customer/customer-names`
      );
      if (data) {
        // console.log("Names : ", data.customerNames);
        setCustomerNames(data.customerNames);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const collectionByType = async () => {
    try {
      const { data: loanNames } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/collection/loan-names`
      );
      if (loanNames) {
        // console.log("Collection Names : ", loanNames);
        setCollection(loanNames);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerNames();
  }, []);

  useEffect(() => {
    collectionByType();
  }, []);

  // const fetchCustomerByName = async (e) => {
  //   const customerName = e.target.value;
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_BASE_URL}/api/customer/find-by-name`,
  //       {
  //         params: { name: customerName },
  //       }
  //     );
  //     if (data) {
  //       // console.log("Single Customer : ", data);
  //       setInputs(data.customer[0]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchCollectionByName = async (e) => {
    let name = e.target.value;
    // setInputs([...inputs, { productName: name }]);
    try {
      const { data: collection } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/collection/collection-by-name`,
        {
          params: { name },
        }
      );
      if (collection) {
        console.log("Collection : ", collection);
        setCollections(collection.collection[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hadleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/loan/create`,
        {
          ...inputs,
          branch: inputs.branchName,
          productName: collections.loanName,
          processingFees: collections.processingFees,
          fileCharges: collections.fileCharges,
          legalAmount: collections.legalAmount,
          GST: collections.GST,
          insuranceAmount: collections.insuranceAmount,
        }
      );
      if (data) {
        // console.log("Loan : ", data.newLoan);
        message.success("Loan Created!");
        navigate("/loan");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="w-full">
        <div className="text-center text-xl font-bold py-3">
          <h2>Create Loan</h2>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-full flex flex-col gap-4 border-r-[2px] p-4">
            <div className="text-lg text-center font-semibold bg-teal-500 text-white">
              <h2>Search Details</h2>
            </div>
            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label htmlFor="" className="w-1/3 text-sm font-semibold">
                  Applicant Name
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, customerName: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                >
                  <option value="" disabled selected={"--select--"}>
                    --select--
                  </option>
                  {customerNames?.map((c) => (
                    <option value={c.customerName}>{c.customerName}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 items-center gap-6">
              <div className="w-full flex items-center">
                <label htmlFor="" className="w-full text-sm font-semibold">
                  Loan ID
                </label>
                <input
                  required
                  type="text"
                  // value={inputs.loanId}
                  onChange={(e) =>
                    setInputs({ ...inputs, loanId: e.target.value })
                  }
                  className="w-full ml-5 py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-500">*</span>
                  Form No
                </label>
                <input
                  required
                  type="text"
                  // value={inputs.formNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, formNo: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  Member ID
                </label>
                <input
                  required
                  type="text"
                  // value={inputs.memberId}
                  onChange={(e) =>
                    setInputs({ ...inputs, memberId: e.target.value })
                  }
                  className="w-full ml-5 focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  Date
                </label>
                <input
                  required
                  type="date"
                  // value={
                  //   inputs.dateOfJoining
                  //     ? moment(inputs.dateOfJoining).format("YYYY-MM-DD")
                  //     : ""
                  // }
                  onChange={(e) =>
                    setInputs({ ...inputs, dateOfJoining: e.target.value })
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
                  <span className="text-red-500 pr-[3px]">*</span>
                  Branch
                </label>
                <input
                  required
                  type="text"
                  // value={inputs.branchName}
                  onChange={(e) =>
                    setInputs({ ...inputs, branchName: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-2">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm pl-[8px] font-semibold relative"
                >
                  Previous Loan
                </label>
                <input
                  required
                  type="text"
                  value={inputs.previousLoan}
                  onChange={(e) =>
                    setInputs({ ...inputs, previousLoan: e.target.value })
                  }
                  className="w-full ml-2 focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
              <div className="w-full">
                <h2 className="text-sm font-semibold text-gray-600">
                  (Loan amount that already taken)
                </h2>
              </div>
            </div>

            <div className="text-lg text-center font-semibold bg-teal-500 text-white my-3">
              <h2>Personal Details</h2>
            </div>

            <div className="w-full grid md:grid-cols-2">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm pl-[8px] font-semibold relative"
                >
                  Holder's DOB
                </label>
                <input
                  required
                  type="date"
                  // value={inputs.dateOfBirth}
                  onChange={(e) =>
                    setInputs({ ...inputs, dateOfBirth: e.target.value })
                  }
                  className="w-full ml-1   focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
              <div className="w-full flex items-center pl-2">
                <label
                  htmlFor=""
                  className="w-1/4 text-sm pl-[8px] font-semibold relative"
                >
                  Age
                </label>
                <input
                  required
                  type="text"
                  value={inputs.age}
                  onChange={(e) =>
                    setInputs({ ...inputs, age: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm pl-[8px] font-semibold relative"
                >
                  Gurdian Name
                </label>
                <input
                  type="text"
                  // value={inputs.gurdianName}
                  onChange={(e) =>
                    setInputs({ ...inputs, gurdianName: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm pl-[8px] font-semibold relative"
                >
                  Address
                </label>
                <textarea
                  required
                  type="text"
                  value={inputs.address}
                  onChange={(e) =>
                    setInputs({ ...inputs, address: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm pl-2 font-semibold relative"
                >
                  Pin Code
                </label>
                <input
                  type="text"
                  value={inputs.pinCode}
                  onChange={(e) =>
                    setInputs({ ...inputs, pinCode: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-full pl-2 text-sm font-semibold relative"
                >
                  Phone No
                </label>
                <input
                  required
                  type="text"
                  value={inputs.phoneNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, phoneNo: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
              <div className="w-full flex items-center pl-4">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  Gender
                </label>
                <select
                  value={inputs.gender}
                  onChange={(e) =>
                    setInputs({ ...inputs, gender: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                >
                  <option
                    value=""
                    defaultValue={"--select--"}
                    selected
                    disabled
                  >
                    --select--
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="text-lg text-center font-semibold bg-teal-500 text-white my-3">
              <h2>Scheme Details</h2>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  Product Name
                </label>
                <select
                  onChange={fetchCollectionByName}
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                >
                  <option value="" selected disabled>
                    --select--
                  </option>
                  {collection?.loanNames?.map((cl) => (
                    <option id={cl._id} value={cl.loanName}>
                      {cl.loanName}
                    </option>
                  ))}
                </select>
                {/* <select
                  onChange={(e) =>
                    setInputs({ ...inputs, ROIStep: e.target.value })
                  }
                  
                >
                  <option value="" defaultValue={'--select--'} disabled>--select--</option>
                  <option value="1.0">1.0</option>
                  <option value="1.1">1.1</option>
                  <option value="1.2">1.2</option>
                  <option value="1.3">1.3</option>
                  <option value="1.4">1.4</option>
                </select> */}
              </div>
            </div>

            <div className="grid md:grid-cols-12 items-center gap-6">
              <div className="w-full mx-auto col-span-6 flex items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  <span className="text-red-600 pr-[3px]">*</span>
                  Loan Term
                </label>
                <select
                  // value={collections.loanTerm}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      loanTerm: e.target.value,
                      term: e.target.value,
                    })
                  }
                  className="w-full ml-3 flex justify-end focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                >
                  <option value="" selected>
                    --select--
                  </option>
                  {terms?.map((term) => (
                    <option>{term}</option>
                  ))}
                </select>
              </div>
              <div className="w-full mx-auto col-span-3 flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  Term
                </label>
                <input
                  required
                  type="text"
                  value={inputs.term}
                  // onChange={(e) =>
                  //   setInputs({ ...inputs, term: e.target.value })
                  // }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
              <div className="w-full flex col-span-3 gap-3 items-center">
                <label htmlFor="" className="text-sm font-semibold relative">
                  Mode
                </label>
                <input
                  required
                  type="text"
                  value={inputs.mode}
                  onChange={(e) =>
                    setInputs({ ...inputs, mode: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 items-center gap-6">
              <div className="w-full mx-auto col-span-6 flex items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  <span className="text-red-600 pr-[3px]">*</span>
                  Loan Amount
                </label>
                <input
                  required
                  type="text"
                  value={inputs.loanAmount}
                  onChange={(e) =>
                    setInputs({ ...inputs, loanAmount: e.target.value })
                  }
                  className="w-full ml-3 flex justify-end focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full mx-auto col-span-3 flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  ROI
                </label>
                <input
                  required
                  type="text"
                  value={inputs.ROI}
                  onChange={(e) =>
                    setInputs({ ...inputs, ROI: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
              <div className="w-full flex col-span-3 gap-3 items-center">
                <label htmlFor="" className="text-sm font-semibold relative">
                  <span className="text-red-600 pr-[3px]">*</span>
                  EMI
                </label>
                <input
                  required
                  type="text"
                  value={inputs.EMI}
                  onChange={(e) =>
                    setInputs({ ...inputs, EMI: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  Interest Type
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, interestType: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                >
                  <option defaultValue={"--select--"} selected disabled>
                    --select--
                  </option>
                  <option value="Simple">Simple</option>
                  <option value="Compound">Compound</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>
            </div>
            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-600 pr-[3px]">*</span>
                  Collector Code
                </label>
                <input
                  required
                  type="text"
                  value={inputs.collectorCode}
                  onChange={(e) =>
                    setInputs({ ...inputs, collectorCode: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-600 pr-[3px]">*</span>
                  Purpose
                </label>
                <input
                  required
                  type="text"
                  value={inputs.purpose}
                  onChange={(e) =>
                    setInputs({ ...inputs, purpose: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>
          </div>

          {/* ***************** Right **************** */}
          <div className="w-full flex flex-col gap-4 pt-1 px-4">
            <div className="text-lg text-center font-semibold bg-teal-500 text-white my-3">
              <h2>Deductions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Processing Fee.
                </label>
                <input
                  required
                  type="text"
                  value={collections.processingFees}
                  onChange={(e) =>
                    setInputs({ ...inputs, processingFee: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  File Charges
                </label>
                <input
                  required
                  type="text"
                  value={collections.fileCharges}
                  onChange={(e) =>
                    setInputs({ ...inputs, fileCharges: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Legal Amt.
                </label>
                <input
                  required
                  type="text"
                  value={collections.legalAmount}
                  onChange={(e) =>
                    setInputs({ ...inputs, legalAmount: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  GST
                </label>
                <input
                  required
                  type="text"
                  value={collections.GST}
                  onChange={(e) =>
                    setInputs({ ...inputs, GST: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Insurance Amt.
                </label>
                <input
                  required
                  type="text"
                  value={collections.insuranceAmount}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      insuranceAmount: collections.insuranceAmount,
                    })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Disburse Amt.
                </label>
                <input
                  required
                  type="text"
                  value={inputs.disburseAmount}
                  onChange={(e) =>
                    setInputs({ ...inputs, disburseAmount: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="text-lg text-center font-semibold bg-teal-500 text-white my-3">
              <h2>Scheme Details</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Payment By
                </label>
                <input
                  required
                  type="text"
                  value={inputs.paymentBy}
                  onChange={(e) =>
                    setInputs({ ...inputs, paymentBy: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Cheque No.
                </label>
                <input
                  required
                  type="text"
                  value={inputs.chequeNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, chequeNo: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Cheque Date
                </label>
                <input
                  required
                  type="date"
                  value={inputs.chequeDate}
                  onChange={(e) =>
                    setInputs({ ...inputs, chequeDate: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
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
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="w-full flex gap-3 items-center">
              <label
                htmlFor=""
                className="w-[31%] text-sm font-semibold relative"
              >
                Bank Name
              </label>
              <input
                required
                type="text"
                value={inputs.bankName}
                onChange={(e) =>
                  setInputs({ ...inputs, bankName: e.target.value })
                }
                className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  From A/C
                </label>
                <input
                  required
                  type="text"
                  value={inputs.fromAC}
                  onChange={(e) =>
                    setInputs({ ...inputs, fromAC: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <input
                  required
                  placeholder="Amount"
                  type="text"
                  value={inputs.amount}
                  onChange={(e) =>
                    setInputs({ ...inputs, amount: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>

            {/* <div className="w-full flex items-center gap-3">
              <label
                htmlFor=""
                className="w-1/3 text-sm font-semibold relative"
              >
                File Charges
              </label>
              <input
                type="text"
                value={inputs.fileCharges}
                onChange={(e) =>
                  setInputs({ ...inputs, fileCharges: e.target.value })
                }
                className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
              />
            </div> */}

            {/* <div className="w-full flex gap-3 items-center">
              <label
                htmlFor=""
                className="w-1/3 text-sm font-semibold relative"
              >
                Grace Period
              </label>
              <input
                type="text"
                value={inputs.gracePeriod}
                onChange={(e) =>
                  setInputs({ ...inputs, gracePeriod: e.target.value })
                }
                className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
              />
            </div> */}

            {/* <div className="w-full flex gap-3 items-center">
              <label htmlFor="" className="w-1/3 text-sm font-semibold">
                Fine Interest
              </label>
              <input
                required
                type="number"
                value={inputs.fineInterest}
                onChange={(e) =>
                  setInputs({ ...inputs, fineInterest: e.target.value })
                }
                className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
              />
            </div> */}

            {/* <div className="w-full flex items-center gap-6">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  EMI Type
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, EMIType: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                >
                  <option value="">--select--</option>
                  <option value="FixedEmi">Fixed EMI</option>
                  <option value="NoneEmi">Non EMI</option>
                </select>
              </div>
            </div> */}

            {/* <div className="w-full flex items-center">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  Interest Rate Calculation Option
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, interestOption: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                >
                  <option selected>--select--</option>
                  <option value="Simple">Simple</option>
                  <option value="Compound">Compound</option>
                  <option value="Reducing">Reducing</option>
                </select>
              </div>
            </div> */}

            {/* <div className="w-full flex items-center">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  Select Collection Type
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, loanCollectionType: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                >
                  <option selected>--select--</option>
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Group Loan">Group Loan</option>
                </select>
              </div>
            </div> */}

            {/* <div className="w-full flex items-center gap-6">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  Type Of Security
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, typeOfSecurity: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                >
                  <option value="">--select--</option>
                  <option value="guarantee">Guarantee</option>
                  <option value="Collateral">Collateral</option>
                </select>
              </div>
            </div> */}

            <div className="w-full flex justify-center items-center mt-6">
              <button
                type="submit"
                onClick={hadleSubmit}
                className="px-6 py-2 bg-teal-700 font-semibold text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateLoan;
