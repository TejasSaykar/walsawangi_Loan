import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Layout from "../components/Layout";

const Collection = () => {
  const [inputs, setInputs] = useState({
    loanName: "",
    loanCode: "",
    collectionMode: "",
    minAmount: "",
    maxAmount: "",
    minAge: "",
    maxAge: "",
    minROI: "",
    maxROI: "",
    ROIStep: "",
    collectionType: "",
    processingFees: "",
    GST: "",
    legalAmount: "",
    insuranceAmount: "",
    fileCharges: "",
    gracePeriod: "",
    fineInterest: "",
    EMIType: "",
    interestOption: "",
    loanCollectionType: "",
    typeOfSecurity: "",
  });

  const [minTerm, setMinTerm] = useState(undefined);
  const [maxTerm, setMaxTerm] = useState(undefined);

  const navigate = useNavigate();

  let totalTerms = [];
  if (minTerm && maxTerm) {
    for (let i = minTerm; i <= maxTerm; i++) {
      totalTerms.push(i);
    }
  }

  const hadleSubmit = async (e) => {
    e.preventDefault();
    if(!inputs.loanName){
      return message.error("Loan name is required!")
    }
    if(!inputs.loanCode){
      return message.error("Loan code is required!")
    }
    if(!inputs.collectionMode){
      return message.error("Collection mode is required!")
    }
    if(!inputs.minAmount){
      return message.error("Min amount is required!")
    }
    if(!inputs.maxAmount){
      return message.error("Max amount is required!")
    }
    if(!inputs.minTerm){
      return message.error("Min term is required!")
    }
    if(!inputs.maxTerm){
      return message.error("Max term is required!")
    }
    if(!inputs.minROI){
      return message.error("Min ROI is required!")
    }
    if(!inputs.maxROI){
      return message.error("Max ROI is required!")
    }
    if(!inputs.ROIStep){
      return message.error("ROI step is required!")
    }
    if(!inputs.collectionType){
      return message.error("Collection type is required!")
    }
    if(!inputs.processingFees){
      return message.error("Processing fees is required!")
    }
    if(!inputs.GST){
      return message.error("GST is required!")
    }
    if(!inputs.legalAmount){
      return message.error("Legal amount is required!")
    }
    if(!inputs.insuranceAmount){
      return message.error("Insurance amount is required!")
    }
    if(!inputs.gracePeriod){
      return message.error("Grace period is required!")
    }
    if(!inputs.EMIType){
      return message.error("EMI type is required!")
    }
    if(!inputs.interestOption){
      return message.error("Interest rate option is required!")
    }
    if(!inputs.loanCollectionType){
      return message.error("Loan collection is required!")
    }
    if(!inputs.typeOfSecurity){
      return message.error("Security type is required!")
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/collection/create`,
        {
          ...inputs,
          minTerm,
          maxTerm,
          totalTerms,
        }
      );
      if (data) {
        console.log("Collection Data : ", data.loan);
        navigate("/customer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="text-center font-bold pt-4 text-xl">
          <h2>Loan Collection</h2>
        </div>
        <div className="flex w-full gap-4 pt-4">
          <div className="w-full flex flex-col gap-4 border-r-[2px] p-4">
            <div className="grid md:grid-cols-2 items-center gap-6">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  <span className="text-sm mr-1 text-red-600">*</span>
                  Loan Name
                </label>
                <input
                  required
                  type="text"
                  value={inputs.loanName}
                  onChange={(e) =>
                    setInputs({ ...inputs, loanName: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-2/3 text-sm font-semibold relative"
                >
                  <span className="text-sm mr-1 text-red-600">*</span>
                  Loan Code
                </label>
                <input
                  required
                  type="text"
                  value={inputs.loanCode}
                  onChange={(e) =>
                    setInputs({ ...inputs, loanCode: e.target.value })
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
                  <span className="text-red-500 pr-[3px]">*</span>
                  Collection Mode
                </label>
                <select
                  value={inputs.collectionMode}
                  onChange={(e) =>
                    setInputs({ ...inputs, collectionMode: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                >
                  <option defaultValue selected>
                    --select--
                  </option>
                  <option value="DLY">DLY.</option>
                  <option value="WLY">WLY.</option>
                  <option value="MLY">MLY.</option>
                  <option value="YLY">YLY.</option>
                </select>
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  Min Amount Rs.
                </label>
                <input
                  required
                  type="text"
                  value={inputs.minAmount}
                  onChange={(e) =>
                    setInputs({ ...inputs, minAmount: e.target.value })
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
                  <span className="text-sm mr-1 text-red-600">*</span>
                  Max Amount Rs.
                </label>
                <input
                  required
                  type="text"
                  value={inputs.maxAmount}
                  onChange={(e) =>
                    setInputs({ ...inputs, maxAmount: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center">
              <label
                htmlFor=""
                className="w-1/3 text-sm pl-[8px] font-semibold relative"
              >
                <span className="text-sm mr-1 text-red-600">*</span>
                Min Term
              </label>
              <input
                required
                type="text"
                value={inputs.minTerm}
                onChange={(e) =>
                  // setInputs({ ...inputs, minTerm: e.target.value })
                  setMinTerm(parseInt(e.target.value))
                }
                className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
              />
            </div>

            <div className="w-full flex items-center">
              <label
                htmlFor=""
                className="w-1/3 text-sm pl-[8px] font-semibold relative"
              >
                <span className="text-sm mr-1 text-red-600">*</span>
                Max Term
              </label>
              <input
                required
                type="text"
                value={inputs.maxTerm}
                onChange={(e) =>
                  // setInputs({ ...inputs, maxTerm: e.target.value })
                  setMaxTerm(parseInt(e.target.value))
                }
                className="w-full focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
              />
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm pl-[8px] font-semibold relative"
                >
                  Min Age
                </label>
                <input
                  type="number"
                  value={inputs.minAge}
                  onChange={(e) =>
                    setInputs({ ...inputs, minAge: e.target.value })
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
                  Max Age
                </label>
                <input
                  required
                  type="text"
                  value={inputs.maxAge}
                  onChange={(e) =>
                    setInputs({ ...inputs, maxAge: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
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
                  Min ROI (%)
                </label>
                <input
                  type="text"
                  value={inputs.minROI}
                  onChange={(e) =>
                    setInputs({ ...inputs, minROI: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
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
                  Max ROI (%)
                </label>
                <input
                  required
                  type="text"
                  value={inputs.maxROI}
                  onChange={(e) =>
                    setInputs({ ...inputs, maxROI: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
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
                  Roi Step
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, ROIStep: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                >
                  <option value="">--select--</option>
                  <option value="1.0">1.0</option>
                  <option value="1.1">1.1</option>
                  <option value="1.2">1.2</option>
                  <option value="1.3">1.3</option>
                  <option value="1.4">1.4</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 items-center gap-6">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  Collection Type
                </label>
                <input
                  required
                  type="text"
                  value={inputs.collectionType}
                  onChange={(e) =>
                    setInputs({ ...inputs, collectionType: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label htmlFor="" className="text-sm font-semibold relative">
                  <span className="text-red-500 pr-[3px]">*</span>
                  Processing Fees
                </label>
                <input
                  required
                  type="text"
                  value={inputs.processingFees}
                  onChange={(e) =>
                    setInputs({ ...inputs, processingFees: e.target.value })
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
                  <span className="text-sm mr-1 text-red-600">*</span>
                  GST
                </label>
                <input
                  required
                  type="text"
                  value={inputs.GST}
                  onChange={(e) =>
                    setInputs({ ...inputs, GST: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>
          </div>

          {/* ***************** Right **************** */}
          <div className="w-full flex flex-col gap-4 p-4">
            <div className="w-full flex items-center gap-3">
              <label
                htmlFor=""
                className="w-1/3 text-sm font-semibold relative"
              >
                <span className="text-sm mr-1 text-red-600">*</span>
                Legal Amount
              </label>
              <input
                required
                type="text"
                value={inputs.legalAmount}
                onChange={(e) =>
                  setInputs({ ...inputs, legalAmount: e.target.value })
                }
                className="w-full focus:outline-none px-1 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px] "
              />
            </div>

            <div className="w-full flex gap-3 items-center">
              <label
                htmlFor=""
                className="w-1/3 text-sm font-semibold relative"
              >
                <span className="text-sm mr-1 text-red-600">*</span>
                Insurance Amount
              </label>
              <input
                required
                type="text"
                value={inputs.insuranceAmount}
                onChange={(e) =>
                  setInputs({ ...inputs, insuranceAmount: e.target.value })
                }
                className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
              />
            </div>

            <div className="w-full flex items-center gap-3">
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
                className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
              />
            </div>

            <div className="w-full flex gap-3 items-center">
              <label
                htmlFor=""
                className="w-1/3 text-sm font-semibold relative"
              >
                <span className="text-sm mr-1 text-red-600">*</span>
                Grace Period
              </label>
              <input
                type="text"
                value={inputs.gracePeriod}
                onChange={(e) =>
                  setInputs({ ...inputs, gracePeriod: e.target.value })
                }
                className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
              />
            </div>

            <div className="w-full flex gap-3 items-center">
              <label htmlFor="" className="w-1/3 text-sm font-semibold">
                {/* <span className="text-red-500 pr-[3px]">*</span> */}
                Fine Interest
              </label>
              <input
                required
                type="number"
                value={inputs.fineInterest}
                onChange={(e) =>
                  setInputs({ ...inputs, fineInterest: e.target.value })
                }
                className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 focus:ring-blue-400 p-[1px]"
              />
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  EMI Type
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, EMIType: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                >
                  <option value="">--select--</option>
                  <option value="FixedEmi">Fixed EMI</option>
                  <option value="NoneEmi">Non EMI</option>
                </select>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  Interest Rate Calculation Option
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, interestOption: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
                >
                  <option selected>--select--</option>
                  <option value="Simple">Simple</option>
                  <option value="Compound">Compound</option>
                  <option value="Reducing">Reducing</option>
                </select>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  Select Collection Type
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, loanCollectionType: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300  focus:ring-blue-400"
                >
                  <option selected>--select--</option>
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Group Loan">Group Loan</option>
                </select>
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  Type Of Security
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, typeOfSecurity: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300  focus:ring-blue-400 p-[1px]"
                >
                  <option value="" selected disabled>
                    --select--
                  </option>
                  <option value="Pledge">Pledge</option>
                  <option value="Mortgage">Mortgage</option>
                  <option value="Mortgage">Hypothecation</option>
                  <option value="Guarantee">Guarantee</option>
                  <option value="Hire Purchase">Hire Purchase</option>
                </select>
              </div>
            </div>

            <div className="w-full flex justify-center items-center mt-6">
              <button
                type="submit"
                onClick={hadleSubmit}
                className="px-6 py-2 bg-teal-700 font-semibold text-white rounded-sm"
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

export default Collection;
