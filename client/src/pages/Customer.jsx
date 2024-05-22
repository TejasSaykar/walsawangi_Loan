import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const { data: customers } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/customer/get-customers`
      );
      if (customers) {
        // console.log("Data : ", customers);
        setCustomers(customers.customers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const conf = confirm("Are you sure to delete ? ");
    if (!conf) {
      return;
    }
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/customer/delete/${id}`
      );
      if (data.success === true) {
        message.success("Customer Deleted !");
        fetchCustomers();
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
              to={"/add-customer"}
              className="bg-teal-700 px-5 py-2 rounded-md text-white font-semibold"
            >
              Add Customer
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
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Father Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Mother Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Marital Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-semibold text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <a href="#" className="relative block"></a>
                        </div>
                        <div className="">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Jean marc
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        12/09/2020
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                        ></span>
                        <span className="relative">active</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <a href="#" className="relative block"></a>
                        </div>
                        <div className="">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Marcus coco
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Designer
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        01/10/2012
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                        ></span>
                        <span className="relative">active</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <a href="#" className="relative block"></a>
                        </div>
                        <div className="">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Ecric marc
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Developer
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        02/10/2018
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                        ></span>
                        <span className="relative">active</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <a href="#" className="relative block"></a>
                        </div>
                        <div className="">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Julien Huger
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">User</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        23/09/2010
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                        ></span>
                        <span className="relative">active</span>
                      </span>
                    </td>
                  </tr>
                </tbody> */}

                <tbody>
                  {customers?.map((customer) => (
                    <>
                      <tr key={customer._id} className="">
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="#" className="relative block"></a>
                            </div>
                            <div className="">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {customer.customerName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {customer.fatherName}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {customer.motherName}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">
                              {customer.maritalStatus}
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative px-3 flex gap-4 items-center py-1 font-semibold leading-tight">
                            <Link to={`/edit-customer/${customer._id}`}>
                              <span
                                className="text-xl cursor-pointer text-green-700"
                                title="Edit"
                              >
                                <FaEdit />
                              </span>
                            </Link>
                            <Link onClick={() => handleDelete(customer._id)}>
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

export default Customer;
