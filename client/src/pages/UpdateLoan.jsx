import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import axios from "axios";

const UpdateLoan = () => {
  const [inputs, setInputs] = useState({
    loanName: "",
    loanCode: "",
    collectionMode: "",
    minAmount: "",
    maxAmount: "",
    minTerm: "",
    maxTerm: "",
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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleLoan = async () => {
      try {
        const { data: loan } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/loan/get-loan/${id}`
        );
        if (loan) {
          console.log("Loan : ", loan);
          setInputs(loan.loan);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleLoan();
  }, []);

  const hadleUpdate = async () => {
    try {
      const {data : loan} = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/loan/update/${id}`,{
        ...inputs
      });
      if(loan){
        message.success("Loan updated successfully");
        navigate('/loan')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-full">
        <div>
          <h3 className="text-2xl text-center pt-5 font-semibold">Update Loan</h3>
        </div>
        <div className="flex w-full gap-4 pt-4">
          <div className="w-full flex flex-col gap-4 border-r-[2px] p-4">
            <div className="grid md:grid-cols-2 items-center gap-6">
              <div className="w-full flex items-center gap-3">
                <label htmlFor="" className="w-full text-sm font-semibold">
                  Loan Name
                </label>
                <input
                  required
                  type="date"
                  value={inputs.loanName}
                  onChange={(e) =>
                    setInputs({ ...inputs, loanName: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label htmlFor="" className="w-2/3 text-sm font-semibold">
                  Loan Code
                </label>
                <input
                  required
                  type="text"
                  value={inputs.loanCode}
                  onChange={(e) =>
                    setInputs({ ...inputs, loanCode: e.target.value })
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
                  <span className="text-red-500 pr-[3px]">*</span>
                  Collection Mode
                </label>
                <input
                  required
                  type="text"
                  value={inputs.collectionMode}
                  onChange={(e) =>
                    setInputs({ ...inputs, collectionMode: e.target.value })
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
                  Min Amount Rs.
                </label>
                <input
                  required
                  type="text"
                  value={inputs.minAmount}
                  onChange={(e) =>
                    setInputs({ ...inputs, minAmount: e.target.value })
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
                  Max Amount Rs.
                </label>
                <input
                  required
                  type="text"
                  value={inputs.maxAmount}
                  onChange={(e) =>
                    setInputs({ ...inputs, maxAmount: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center">
              <label
                htmlFor=""
                className="w-1/3 text-sm pl-[8px] font-semibold relative"
              >
                Min Term
              </label>
              <input
                required
                type="text"
                value={inputs.minTerm}
                onChange={(e) =>
                  setInputs({ ...inputs, minTerm: e.target.value })
                }
                className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
              />
            </div>

            <div className="w-full flex items-center">
              <label
                htmlFor=""
                className="w-1/3 text-sm pl-[8px] font-semibold relative"
              >
                Max Term
              </label>
              <input
                required
                type="text"
                value={inputs.maxTerm}
                onChange={(e) =>
                  setInputs({ ...inputs, maxTerm: e.target.value })
                }
                className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
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
                  Max Age
                </label>
                <input
                  required
                  type="text"
                  value={inputs.maxAge}
                  onChange={(e) =>
                    setInputs({ ...inputs, maxAge: e.target.value })
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
                  <span className="text-red-500 pr-[3px]">*</span>
                  Min ROI (%)
                </label>
                <input
                  type="text"
                  value={inputs.minROI}
                  onChange={(e) =>
                    setInputs({ ...inputs, minROI: e.target.value })
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
                  <span className="text-red-500 pr-[3px]">*</span>
                  Roi Step
                </label>
                <select
                value={inputs.ROIStep}
                  onChange={(e) =>
                    setInputs({ ...inputs, ROIStep: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
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
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
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
                  GST
                </label>
                <input
                  required
                  type="text"
                  value={inputs.GST}
                  onChange={(e) =>
                    setInputs({ ...inputs, GST: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
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
                Legal Amount
              </label>
              <input
                required
                type="text"
                value={inputs.legalAmount}
                onChange={(e) =>
                  setInputs({ ...inputs, legalAmount: e.target.value })
                }
                className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
              />
            </div>

            <div className="w-full flex gap-3 items-center">
              <label
                htmlFor=""
                className="w-1/3 text-sm font-semibold relative"
              >
                Insurance Amount
              </label>
              <input
                required
                type="text"
                value={inputs.insuranceAmount}
                onChange={(e) =>
                  setInputs({ ...inputs, insuranceAmount: e.target.value })
                }
                className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
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
                className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
              />
            </div>

            <div className="w-full flex gap-3 items-center">
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
                className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
              />
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  EMI Type
                </label>
                <select
                value={inputs.EMIType}
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
            </div>

            <div className="w-full flex items-center">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Interest Rate Calculation Option
                </label>
                <select
                value={inputs.interestOption}
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
            </div>

            <div className="w-full flex items-center">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Select Collection Type
                </label>
                <select
                value={inputs.loanCollectionType}
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
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex gap-3 items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Type Of Security
                </label>
                <select
                value={inputs.typeOfSecurity}
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
            </div>

            <div className="w-full flex justify-center items-center mt-6">
              <button
                type="submit"
                onClick={hadleUpdate}
                className="px-6 py-2 bg-orange-700 text-white rounded-md"
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

export default UpdateLoan;
