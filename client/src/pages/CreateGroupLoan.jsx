import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const CreateGroupLoan = () => {
  const [inputs, setInputs] = useState({});
  const [newInputs, setNewInputs] = useState({});

  const [groupNames, setGroupNames] = useState([]);
  const [collection, setCollection] = useState([]);
  const [collections, setCollections] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("New inputs : ", newInputs);

  const navigate = useNavigate();

  let terms = [];
  if (collections.totalTerms) {
    collections?.totalTerms?.forEach((element) => {
      terms.push(element);
    });
  }

  const fetchGroupNames = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/group/get-group-names`
      );
      if (data) {
        // console.log("Names : ", data.customerNames);
        setGroupNames(data.groupNames);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroupByName = async (e) => {
    setInputs({ ...inputs, customerName: e.target.value });
    let name = e.target.value;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/group/find-by-name`,
        {
          params: { name },
        }
      );
      if (data) {
        console.log("Group Data : ", data.group);
        setInputs(data.group);
        setNewInputs({
          ...newInputs,
          groupName: data.group.groupName,
          groupHead: data.group.groupHead,
          phoneNo: data.group.phoneNo,
          address: data.group.address,
        });
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
    fetchGroupNames();
  }, []);

  useEffect(() => {
    collectionByType();
  }, []);

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
    if (!newInputs.loanId) {
      return message.error("Loan id is required !");
    }
    if (!newInputs.formNo) {
      return message.error("Form number is required !");
    }
    if (!newInputs.groupId) {
      return message.error("Group id is required !");
    }
    if (!newInputs.branchName) {
      return message.error("Branch name is required !");
    }
    if (!newInputs.loanAmount) {
      return message.error("Loan amount is required !");
    }
    if (!newInputs.EMI) {
      return message.error("EMI is required !");
    }
    if (!newInputs.paymentBy) {
      return message.error("Payment by required !");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/loan/group-loan`,
        {
          ...newInputs,
          // groupName: inputs.groupName,
          // groupHead: inputs.groupHead,
          // phoneNo: inputs.phoneNo,
          // address: inputs.address,
          term: inputs.term,
          loanTerm: inputs.term,
          productName: collections.loanName,
          processingFees: collections.processingFees,
          legalAmount: collections.legalAmount,
          insuranceAmount: collections.insuranceAmount,
        }
      );
      if (data) {
        // console.log("Loan : ", data.newLoan);
        message.success("Loan Created!");
        navigate("/group-loan");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="w-full">
        <div className="text-center text-xl font-bold py-3">
          <h2>Create Group Loan</h2>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-full flex flex-col gap-4 border-r-[2px] p-4">
            <div className="text-lg text-center font-semibold bg-teal-500 text-white">
              <h2>Search Details</h2>
            </div>

            <div className="w-full grid grid-cols-2 items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  <span className="text-red-600 mr-1">*</span>
                  Loan ID
                </label>
                <input
                  required
                  type="text"
                  value={newInputs.loanId}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, loanId: e.target.value })
                  }
                  className="w-full ml-5 py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
                />
              </div>
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-[40%] text-sm font-semibold relative"
                >
                  <span className="text-red-500 mr-1">*</span>
                  Form No
                </label>
                <input
                  required
                  type="text"
                  value={newInputs.formNo}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, formNo: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
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
                  Group ID
                </label>
                <input
                  required
                  type="text"
                  value={newInputs.groupId}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, groupId: e.target.value })
                  }
                  className="w-full ml-5 focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                />
              </div>
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-600 mr-1">*</span>
                  Date
                </label>
                <input
                  required
                  type="date"
                  value={newInputs.dateOfJoining}
                  onChange={(e) =>
                    setNewInputs({
                      ...newInputs,
                      dateOfJoining: e.target.value,
                    })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-600 mr-1">*</span>
                  Group Name
                </label>
                <select
                  required
                  type="text"
                  // value={fetchGroupByName}
                  onChange={fetchGroupByName}
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                >
                  <option selected disabled>
                    --select--
                  </option>
                  {groupNames?.map((group) => (
                    <option value={group.groupName} key={group._id}>
                      {group.groupName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-600 mr-1">*</span>
                  Group Head
                </label>
                <input
                  required
                  type="text"
                  value={inputs.groupHead}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, groupHead: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
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
                  value={newInputs.branchName}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, branchName: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-2">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm pl-[8px] font-semibold relative"
                >
                  Holder's DOB
                </label>
                <input
                  required
                  type="date"
                  value={inputs.holderDOB}
                  onChange={(e) =>
                    setInputs({ ...newInputs, holderDOB: e.target.value })
                  }
                  className="w-full -ml-[1px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
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
                    setNewInputs({ ...newInputs, address: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-full pl-[8px] text-sm font-semibold relative"
                >
                  State
                </label>
                <input
                  required
                  type="text"
                  value={inputs.state}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, state: e.target.value })
                  }
                  className="w-full ml-5 focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                />
              </div>
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm pl-[8px] font-semibold relative"
                >
                  PIN
                </label>
                <input
                  required
                  type="number"
                  value={inputs.PIN}
                  onChange={(e) =>
                    setNewInputs({
                      ...newInputs,
                      PIN: e.target.value,
                    })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm pl-[8px] font-semibold relative"
                >
                  Phone No
                </label>
                <input
                  required
                  type="number"
                  value={inputs.phoneNo}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, phoneNo: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="text-lg text-center font-semibold bg-teal-500 text-white my-3">
              <h2>Loan Product Information</h2>
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
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
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
                  className="w-full ml-3 flex justify-end focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
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
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
                />
              </div>
              <div className="w-full flex col-span-3 gap-3 items-center">
                <label htmlFor="" className="text-sm font-semibold relative">
                  Mode
                </label>
                <input
                  required
                  type="text"
                  value={newInputs.mode}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, mode: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
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
                  value={newInputs.loanAmount}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, loanAmount: e.target.value })
                  }
                  className="w-full ml-3 flex justify-end focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px] "
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
                  value={newInputs.ROI}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, ROI: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
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
                  value={newInputs.EMI}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, EMI: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
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
                    setNewInputs({ ...newInputs, interestType: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
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
                  Legal Amount
                </label>
                <input
                  required
                  type="text"
                  value={collections.legalAmount}
                  onChange={(e) =>
                    setInputs({ ...inputs, legalAmount: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Processing Fess
                </label>
                <input
                  required
                  type="text"
                  value={collections.processingFees}
                  onChange={(e) =>
                    setInputs({ ...inputs, processingFee: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Service Tax
                </label>
                <input
                  required
                  type="text"
                  value={newInputs.serviceTax}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, serviceTax: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px] "
                />
              </div>
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
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px] "
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
                  <span className="text-red-600 mr-1">*</span>
                  Payment By
                </label>
                <select
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, paymentBy: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                >
                  <option selected disabled>
                    --select--
                  </option>
                  <option value="CASH">CASH</option>
                  <option value="CHEQUE">CHEQUE</option>
                  <option value="NEFT">NEFT</option>
                  <option value="IMPS">IMPS</option>
                  <option value="ONLINE">ONLINE</option>
                </select>
              </div>
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  Cheque No.
                </label>
                <input
                  required
                  type="text"
                  value={newInputs.chequeNo}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, chequeNo: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
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
                  value={newInputs.chequeDate}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, chequeDate: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  Bank A/C
                </label>
                <input
                  required
                  type="text"
                  value={newInputs.bankAC}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, bankAC: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
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
                onChange={(e) =>
                  setNewInputs({ ...newInputs, bankName: e.target.value })
                }
                className="w-full ml-1 py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
              />
            </div>

            <div className="gap-3">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  From A/C
                </label>
                <input
                  required
                  type="text"
                  value={newInputs.fromAC}
                  onChange={(e) =>
                    setNewInputs({ ...newInputs, fromAC: e.target.value })
                  }
                  className="w-full -ml-2 focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px] "
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-center mt-6">
              <button
                type="submit"
                disabled={loading}
                onClick={hadleSubmit}
                className={`px-6 py-2 bg-teal-700 font-semibold text-white rounded-sm ${
                  loading && "cursor-not-allowed bg-teal-500 animate-pulse"
                }`}
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

export default CreateGroupLoan;
