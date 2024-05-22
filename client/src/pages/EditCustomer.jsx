import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const EditCustomer = () => {
  const [inputs, setInputs] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleCustomer = async (e) => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/customer/single-customer/${id}`
        );
        if (data) {
          setInputs(data.customer);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCustomer();
  }, []);

  const handleUpdate = async (e) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/customer/update/${id}`,
        {
          ...inputs,
        }
      );
      if (data) {
        navigate('/')
        message.success("Customer Updated!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-full h-screen">
        <div>
            <h2 className="text-center text-xl font-bold pt-5">Update Customer</h2>
        </div>
        <div className="flex w-full gap-4 pt-4">
          <div className="w-full flex flex-col gap-4 border-r-[2px] p-4">
            <div className="grid md:grid-cols-2 items-center gap-6">
              <div className="w-full flex items-center gap-3">
                <label htmlFor="" className="w-full text-sm font-semibold">
                  Date Of Joining
                </label>
                <input
                  required
                  type="date"
                  value={inputs.dateOfJoining}
                  onChange={(e) =>
                    setInputs({ ...inputs, dateOfJoining: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label htmlFor="" className="w-2/3 text-sm font-semibold">
                  Application No
                </label>
                <input
                  required
                  type="text"
                  value={inputs.applicationNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, applicationNo: e.target.value })
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
                  Customer Name
                </label>
                <input
                  required
                  type="text"
                  value={inputs.customerName}
                  onChange={(e) =>
                    setInputs({ ...inputs, customerName: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
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
                  Father Name
                </label>
                <input
                  required
                  type="text"
                  value={inputs.fatherName}
                  onChange={(e) =>
                    setInputs({ ...inputs, fatherName: e.target.value })
                  }
                  className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm pl-[8px] font-semibold relative"
                >
                  Mother Name
                </label>
                <input
                  required
                  type="text"
                  value={inputs.motherName}
                  onChange={(e) =>
                    setInputs({ ...inputs, motherName: e.target.value })
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
                  Marital Status
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, maritalStatus: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                >
                  <option selected>--select--</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm pl-[8px] font-semibold relative"
                >
                  Spouse Name
                </label>
                <input
                  required
                  type="text"
                  value={inputs.spouseName}
                  onChange={(e) =>
                    setInputs({ ...inputs, spouseName: e.target.value })
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
                  Address
                </label>
                <textarea
                  type="text"
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
                  className="w-1/3 text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  PIN Code
                </label>
                <input
                  required
                  type="text"
                  value={inputs.pinCode}
                  onChange={(e) =>
                    setInputs({ ...inputs, pinCode: e.target.value })
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
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={inputs.emailAddress}
                  onChange={(e) =>
                    setInputs({ ...inputs, emailAddress: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 items-center gap-6">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  <span className="text-red-500 pr-[3px]">*</span>
                  Date Of Birth
                </label>
                <input
                  required
                  type="date"
                  value={inputs.dateOfBirth}
                  onChange={(e) =>
                    setInputs({ ...inputs, dateOfBirth: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label htmlFor="" className="text-sm font-semibold relative">
                  <span className="text-red-500 pr-[3px]">*</span>
                  Age
                </label>
                <input
                  required
                  type="text"
                  value={inputs.age}
                  onChange={(e) =>
                    setInputs({ ...inputs, age: e.target.value })
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
                  Nominee Name
                </label>
                <input
                  required
                  type="text"
                  value={inputs.nomineeName}
                  onChange={(e) =>
                    setInputs({ ...inputs, nomineeName: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 items-center gap-6">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Nominee Relation
                </label>
                <input
                  required
                  type="text"
                  value={inputs.nomineeRelation}
                  onChange={(e) =>
                    setInputs({ ...inputs, nomineeRelation: e.target.value })
                  }
                  className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px] "
                />
              </div>
              <div className="w-full flex gap-3 items-center">
                <label htmlFor="" className="text-sm font-semibold relative">
                  Age
                </label>
                <input
                  required
                  type="text"
                  value={inputs.nomineeAge}
                  onChange={(e) =>
                    setInputs({ ...inputs, nomineeAge: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 items-center gap-6">
              <div className="w-full flex items-center gap-3">
                <label
                  htmlFor=""
                  className="w-full text-sm font-semibold relative"
                >
                  Blood Group
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, bloodGroup: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                >
                  <option selected>--select--</option>
                  <option value="AB">A</option>
                  <option value="AB">B</option>
                  <option value="AB">AB</option>
                  <option value="AB">O</option>
                </select>
              </div>
              <div className="w-full flex gap-3 items-center">
                <label htmlFor="" className="text-sm font-semibold relative">
                  Gender
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, gender: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                >
                  <option selected>--select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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
                  Phone No
                </label>
                <input
                  required
                  type="number"
                  value={inputs.phoneNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, phoneNo: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>
          </div>

          {/* ***************** Right **************** */}
          <div className="w-full flex flex-col gap-4 p-4">
            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Education
                </label>
                <input
                  required
                  type="text"
                  value={inputs.education}
                  onChange={(e) =>
                    setInputs({ ...inputs, education: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Occupation
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, occupation: e.target.value })
                  }
                  className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                >
                  <option selected>--select--</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Retired">Retired</option>
                  <option value="HouseWife">HouseWife</option>
                  <option value="Student">Student</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="w-full flex items-center gap-6">
              <div className="w-full flex items-center">
                <label
                  htmlFor=""
                  className="w-1/3 text-sm font-semibold relative"
                >
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Branch Name / Code
                </label>
                <input
                  required
                  type="text"
                  value={inputs.branchName}
                  onChange={(e) =>
                    setInputs({ ...inputs, branchName: e.target.value })
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
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  A/C No
                </label>
                <input
                  required
                  type="text"
                  value={inputs.acNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, acNo: e.target.value })
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
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Bank Name
                </label>
                <input
                  required
                  type="text"
                  value={inputs.bankName}
                  onChange={(e) =>
                    setInputs({ ...inputs, bankName: e.target.value })
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
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  IFSC
                </label>
                <input
                  required
                  type="text"
                  value={inputs.ifsc}
                  onChange={(e) =>
                    setInputs({ ...inputs, ifsc: e.target.value })
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
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Branch
                </label>
                <input
                  required
                  type="text"
                  value={inputs.branch}
                  onChange={(e) =>
                    setInputs({ ...inputs, branch: e.target.value })
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
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  PAN No
                </label>
                <input
                  required
                  type="text"
                  value={inputs.panNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, panNo: e.target.value })
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
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Passport No
                </label>
                <input
                  required
                  type="text"
                  value={inputs.passportNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, passportNo: e.target.value })
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
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Ration Card No
                </label>
                <input
                  required
                  type="text"
                  value={inputs.rationCardNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, rationCardNo: e.target.value })
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
                  {/* <span className="text-red-500 pr-[3px]">*</span> */}
                  Aadhar No
                </label>
                <input
                  required
                  type="text"
                  value={inputs.aadharNo}
                  onChange={(e) =>
                    setInputs({ ...inputs, aadharNo: e.target.value })
                  }
                  className="w-full focus:outline-none font-[400] px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                />
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <button
                type="submit"
                onClick={handleUpdate}
                className="border px-10 bg-teal-700 rounded-md text-white py-2 border-gray-400"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditCustomer;
