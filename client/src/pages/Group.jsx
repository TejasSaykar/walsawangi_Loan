import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from "antd";

const Group = () => {
  const [inputs, setInputs] = useState({
    groupCode: "",
    openingDate: "",
    groupBranch: "",
    collectorCode: "",
    company: "",
    groupName: "",
    groupHead: "",
    phoneNo: "",
    address: "",
    memberCode: "",
    name: "",
  });

  const [groupInfo, setGroupInfo] = useState([]);
  const [rowId, setRowId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loanding1, setLoanding1] = useState(false);

  const fetchGroupInfo = async () => {
    try {
      setLoanding1(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/group/all-groups`
      );
      if (data) {
        // console.log("Group Info : ", data);
        setGroupInfo(data.groups);
        setLoanding1(false);
      }
    } catch (error) {
      console.log(error);
      setLoanding1(false);
    }
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/group/create-group`,
        {
          ...inputs,
        }
      );
      if (data) {
        // console.log("Group Data : ", data);
        message.success("Group created!");
        fetchGroupInfo();
        setInputs({
          groupCode: "",
          openingDate: "",
          groupBranch: "",
          collectorCode: "",
          company: "",
          groupName: "",
          groupHead: "",
          phoneNo: "",
          address: "",
          memberCode: "",
          name: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleGroup = async (id) => {
    setRowId(id);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/group/single-group/${id}`
      );
      if (data) {
        // console.log("Single Bank Data : ", data);
        setInputs(data.group);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/group/update-group/${rowId}`,
        {
          ...inputs,
        }
      );
      if (data) {
        // console.log("Updated Data : ", data.group);
        fetchGroupInfo();
        setInputs({
          groupCode: "",
          openingDate: "",
          groupBranch: "",
          collectorCode: "",
          company: "",
          groupName: "",
          groupHead: "",
          phoneNo: "",
          address: "",
          memberCode: "",
          name: "",
        });
        setRowId("")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/group/delete-group/${rowId}`
      );
      if (data) {
        message.success("Bank Details Deleted!");
        fetchGroupInfo();
        setInputs({
          groupCode: "",
          openingDate: "",
          groupBranch: "",
          collectorCode: "",
          company: "",
          groupName: "",
          groupHead: "",
          phoneNo: "",
          address: "",
          memberCode: "",
          name: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setInputs({
      groupCode: "",
      openingDate: "",
      groupBranch: "",
      collectorCode: "",
      company: "",
      groupName: "",
      groupHead: "",
      phoneNo: "",
      address: "",
      memberCode: "",
      name: "",
    });
    setRowId("");
  };

  return (
    <Layout>
      <div className="w-full h-screen">
        <div className="w-full grid grid-cols-12 py-4">
          <div className="w-full col-span-4">
            <div className="w-full flex flex-col gap-4 border-r-[2px] p-4">
              <div className="text-lg text-center font-semibold bg-teal-500 text-white">
                <h2>Group Entry</h2>
              </div>
              <form className="flex flex-col gap-4">
                <div className="w-full flex items-center gap-6">
                  <div className="w-full flex items-center">
                    <label htmlFor="" className="w-1/3 text-sm font-semibold">
                      Group Code
                    </label>
                    <input
                      type="text"
                      value={inputs.groupCode}
                      onChange={(e) =>
                        setInputs({ ...inputs, groupCode: e.target.value })
                      }
                      className="w-full focus:outline-none px-1 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 items-center gap-6">
                  <div className="w-full flex items-center">
                    <label htmlFor="" className="w-1/3 text-sm font-semibold">
                      Opening Date
                    </label>
                    <input
                      required
                      type="date"
                      value={inputs.openingDate}
                      onChange={(e) =>
                        setInputs({ ...inputs, openingDate: e.target.value })
                      }
                      className="w-full py-[2px] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400"
                    />
                  </div>
                  <div className="w-full flex items-center">
                    <label
                      htmlFor=""
                      className="w-1/3 text-sm font-semibold relative"
                    >
                      Group Branch
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.groupBranch}
                      onChange={(e) =>
                        setInputs({ ...inputs, groupBranch: e.target.value })
                      }
                      className="w-full focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center">
                  <div className="w-full flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="w-1/3 text-sm font-semibold relative"
                    >
                      Collector Code
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.collectorCode}
                      onChange={(e) =>
                        setInputs({ ...inputs, collectorCode: e.target.value })
                      }
                      className="w-[59%] focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                  <div className="w-2/3 flex items-center">
                    <input
                      required
                      placeholder="Company"
                      type="text"
                      value={inputs.company}
                      onChange={(e) =>
                        setInputs({ ...inputs, company: e.target.value })
                      }
                      className="w-full ml-4 focus:outline-none px-2 ring-1 ring-gray-300 rounded-md focus:ring-blue-400 p-[1px]"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center gap-6">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor=""
                      className="w-1/3 text-sm font-semibold relative"
                    >
                      Group Name
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.groupName}
                      onChange={(e) =>
                        setInputs({ ...inputs, groupName: e.target.value })
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
                      Group Head
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.groupHead}
                      onChange={(e) =>
                        setInputs({ ...inputs, groupHead: e.target.value })
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
                      Phone No
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.phoneNo}
                      onChange={(e) =>
                        setInputs({ ...inputs, phoneNo: e.target.value })
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
                      Address
                    </label>
                    <textarea
                      required
                      type="text"
                      value={inputs.address}
                      onChange={(e) =>
                        setInputs({ ...inputs, address: e.target.value })
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
                      Member Code
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.memberCode}
                      onChange={(e) =>
                        setInputs({ ...inputs, memberCode: e.target.value })
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
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      value={inputs.name}
                      onChange={(e) =>
                        setInputs({ ...inputs, name: e.target.value })
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
                  <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Group Code
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Group Name
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Date Of Joining
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Collector
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Branch
                          </th>
                        </tr>
                      </thead>

                      <tbody className="w-full">
                        {loanding1 ? (
                          <div className="translate-x-[20vw] mx-auto text-center flex items-center justify-center">
                            <h2 className="text-center py-2 text-teal-600 animate-bounce text-lg font-semibold">
                              Loading...
                            </h2>
                          </div>
                        ) : (
                          groupInfo?.map((group) => (
                            <>
                              <tr
                                title="Edit"
                                key={group._id}
                                onClick={() => getSingleGroup(group._id)}
                                className={`${
                                  group._id == rowId
                                    ? "bg-cyan-400"
                                    : "bg-white"
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
                                        {group.groupCode}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {group.groupName}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {group.openingDate}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm  border-b border-gray-200">
                                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                    ></span>
                                    <span className="relative">
                                      {group.company}
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
                                      {group.groupBranch}
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

export default Group;
