import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const RepaySingle = () => {
  const [loan, setLoan] = useState([]);
  const [filteredData, setFilteredData] = useState(undefined);
  const [allEmis, setAllEmis] = useState([]);
  const [unpaidData, setUnpaidData] = useState([]);
  const [singleUnpaid, setSingleUnpaid] = useState({});
  const [paidData, setPaidData] = useState([]);
  const [loanId, setLoanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentBy, setPaymentBy] = useState("");

  console.log("Single Unpaid State : ", singleUnpaid);
  console.log("FilteredData : ", filteredData);

  useEffect(() => {
    if (singleUnpaid.totalAmount > singleUnpaid.EMI) {
      let advance = singleUnpaid.totalAmount - singleUnpaid.EMI;
      setFilteredData({ ...filteredData, advanceAmount: advance });
    }
  }, [singleUnpaid, setFilteredData]);

  const handleGeneratePDF = () => {
    const input = document.querySelectorAll(".pdf-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  useEffect(() => {
    if (loanId) {
      const loanEmi = allEmis.filter((item) => item.loanId === loanId);
      const unpayData = loanEmi?.filter((loan) => !loan.isPaid);
      setUnpaidData(unpayData);

      const payData = loanEmi?.filter((loan) => loan.isPaid);
      setPaidData(payData);
    } else {
      setUnpaidData([]);
      setPaidData([]);
    }
  }, [loanId, loan, allEmis]);

  useEffect(() => {
    if (loanId) {
      const filterData = loan?.loans?.filter((loan) => loan.loanId === loanId);
      setFilteredData(filterData[0]);
    } else {
      setFilteredData(undefined);
    }
  }, [loanId, loan]);

  const singleUnpaidData = (id) => {
    const unpay = unpaidData?.filter((item) => item._id == id);
    setSingleUnpaid(unpay[0]);
  };

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

  const fetchEmis = async () => {
    try {
      const { data: emis } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/loan/emis`
      );
      if (emis) {
        console.log("Emis : ", emis.emis);
        setAllEmis(emis.emis);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/loan/update/${singleUnpaid._id}`,
        {
          ...singleUnpaid,
          advanceAmount: filteredData.advanceAmount,
        }
      );
      if (data) {
        setSingleUnpaid({
          amount: "",
          EMI: "",
          depositBranch: "",
          paymentBy: "",
          transactionNo: "",
          chequeNo: "",
          chequeDate: "",
          receiveAC: "",
          bankName: "",
          penaltyDeduct: "",
          penaltyCharges: "",
          remarks: "",
          totalAmount: "",
          paymentNumber: "",
          payDate: "",
        });
        setFilteredData({
          totalPaid: "",
          advanceAmount: "",
        });
        fetchLoans();
        fetchEmis();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoans();
    fetchEmis();
  }, []);

  return (
    <Layout>
      <div className="w-full">
        <div className="w-full grid grid-cols-12">
          <div
            className="col-span-4 pt-4 border-r-[3px] pr-4 pdf-content"
            id="pdf-content"
          >
            <div>
              <h2 className="bg-teal-800 text-center text-white font-semibold py-[1.8px]">
                Search
              </h2>
              <div className="mt-3 flex items-center gap-4">
                <span className="w-[35%] font-semibold">Enter Loan ID</span>
                <input
                  type="text"
                  value={loanId}
                  onChange={(e) => setLoanId(e.target.value)}
                  className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                />
              </div>
              <div className="mt-5">
                <h2 className="bg-teal-800 text-center text-white font-semibold py-[1.8px]">
                  Loan Details
                </h2>
                <div className="flex items-center flex-col gap-2">
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[25%] text-sm font-semibold">
                        Loan ID
                      </label>
                      <input
                        type="text"
                        value={filteredData?.loanId}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            loanId: e.target.value,
                          })
                        }
                        className="w-2/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[35%] text-sm font-semibold">
                        Form No
                      </label>
                      <input
                        type="text"
                        value={filteredData?.formNo}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            formNo: e.target.value,
                          })
                        }
                        className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-start gap-3">
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[35%] text-sm font-semibold">
                        Member ID
                      </label>
                      <input
                        type="text"
                        value={filteredData?.memberId}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            memberId: e.target.value,
                          })
                        }
                        className="w-2/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="w-[25%] text-sm font-semibold">
                        Date
                      </label>
                      <input
                        type="Date"
                        value={filteredData?.dateOfJoining}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            dateOfJoining: e.target.value,
                          })
                        }
                        className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-4">
                    <label className="w-[25%] text-sm font-semibold">
                      Holder Name
                    </label>
                    <input
                      type="text"
                      value={filteredData?.applicantName}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          applicantName: e.target.value,
                        })
                      }
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    />
                  </div>

                  <div className="w-full flex items-start justify-start gap-0">
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[40%] text-sm font-semibold">
                        Phone No
                      </label>
                      <input
                        type="number"
                        value={filteredData?.phoneNo}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            phoneNo: e.target.value,
                          })
                        }
                        className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[45%] text-sm font-semibold">
                        Holder's Age
                      </label>
                      <input
                        type="number"
                        value={filteredData?.age}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            age: e.target.value,
                          })
                        }
                        className="w-2/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-start gap-0">
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[25%] text-sm font-semibold">
                        Product
                      </label>
                      <input
                        type="text"
                        value={filteredData?.productName}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            productName: e.target.value,
                          })
                        }
                        className="w-2/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[25%] text-sm font-semibold">
                        Term
                      </label>
                      <input
                        type="text"
                        value={filteredData?.term}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            term: e.target.value,
                          })
                        }
                        className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-start gap-2">
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[40%] text-sm font-semibold">
                        Loan Amount
                      </label>
                      <input
                        type="number"
                        value={filteredData?.loanAmount}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            loanAmount: e.target.value,
                          })
                        }
                        className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="w-[25%] text-sm font-semibold">
                        Mode
                      </label>
                      <input
                        type="text"
                        value={filteredData?.mode}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            mode: e.target.value,
                          })
                        }
                        className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="w-[25%] text-sm font-semibold">
                        ROI
                      </label>
                      <input
                        type="text"
                        className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-start gap-3">
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[43%] text-sm font-semibold">
                        Processing Fees
                      </label>
                      <input
                        type="number"
                        value={filteredData?.processingFees}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            processingFees: e.target.value,
                          })
                        }
                        className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[53%] text-sm font-semibold">
                        Insurance Amount
                      </label>
                      <input
                        type="number"
                        value={filteredData?.insuranceAmount}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            insuranceAmount: e.target.value,
                          })
                        }
                        className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-start gap-3">
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[45%] text-sm font-semibold">
                        EMI Amount
                      </label>
                      <input
                        type="number"
                        value={filteredData?.EMI}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            EMI: e.target.value,
                          })
                        }
                        className="w-2/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[65%] text-sm font-semibold">
                        Transfer to SB Account
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            SBAccount: e.target.value,
                          })
                        }
                        placeholder="Yes/No"
                        className="w-1/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-start gap-3">
                    <label className="w-[23%] text-sm font-semibold">
                      Account No
                    </label>
                    <input
                      type="number"
                      value={filteredData?.bankAC}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          bankAC: e.target.value,
                        })
                      }
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    />
                  </div>

                  <div className="w-full flex items-start justify-start gap-3">
                    <label className="w-[70%] text-sm font-semibold">
                      Loan Against Deposit (Policy)
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          loanPolicy: e.target.value,
                        })
                      }
                      placeholder="Yes/No"
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    />
                  </div>

                  <div className="w-full flex items-start justify-start gap-3">
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[35%] text-sm font-semibold">
                        Payment By
                      </label>
                      <input
                        type="text"
                        className="w-2/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[55%] text-sm font-semibold">
                        Cheque No
                      </label>
                      <input
                        type="text"
                        value={filteredData?.chequeNo}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            chequeNo: e.target.value,
                          })
                        }
                        className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-start gap-3">
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[45%] text-sm font-semibold">
                        Cheque Date
                      </label>
                      <input
                        type="date"
                        value={filteredData?.chequeDate}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            chequeDate: e.target.value,
                          })
                        }
                        className="w-2/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[55%] text-sm font-semibold">
                        Bank A/C
                      </label>
                      <input
                        type="text"
                        value={filteredData?.bankAC}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            bankAC: e.target.value,
                          })
                        }
                        className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-start gap-3">
                    <label className="w-[20%] text-sm font-semibold">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={filteredData?.bankName}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          bankName: e.target.value,
                        })
                      }
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-8 flex flex-col px-3">
            <div
              className="text-center bg-teal-800 mt-4 pdf-content"
              id="pdf-content"
            >
              <h2 className="font-semibold text-white py-[1.5px]">
                Amount Details
              </h2>
            </div>
            <div className="mt-3 pdf-content" id="pdf-content">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">
                    Total Payable Rs.
                  </label>
                  <input
                    type="number"
                    value={singleUnpaid.amount}
                    onChange={(e) =>
                      setSingleUnpaid({
                        ...singleUnpaid,
                        amount: e.target.value,
                      })
                    }
                    className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">Total Paid</label>
                  <input
                    type="number"
                    value={filteredData?.totalPaid}
                    onChange={(e) =>
                      setSingleUnpaid({
                        ...singleUnpaid,
                        totalPaid: e.target.value,
                      })
                    }
                    className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">Due Amount</label>
                  <input
                    type="number"
                    value={singleUnpaid.EMI}
                    onChange={(e) =>
                      setSingleUnpaid({ ...singleUnpaid, EMI: e.target.value })
                    }
                    className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-[60%] text-sm font-semibold">
                    Advance Amount
                  </label>
                  <input
                    type="number"
                    value={filteredData?.advanceAmount}
                    onChange={(e) =>
                      setFilteredData({
                        ...filteredData,
                        advanceAmount: e.target.value,
                      })
                    }
                    className="w-2/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 pdf-content" id="pdf-content">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">
                    Payment Number
                  </label>
                  <input
                    type="number"
                    value={singleUnpaid.paymentNumber}
                    onChange={(e) =>
                      setSingleUnpaid({
                        ...singleUnpaid,
                        paymentNumber: e.target.value,
                      })
                    }
                    className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">
                    Payment Amount
                  </label>
                  <input
                    type="number"
                    value={singleUnpaid.EMI}
                    className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">Total Amount</label>
                  <input
                    type="number"
                    value={singleUnpaid.totalAmount}
                    onChange={(e) =>
                      setSingleUnpaid({
                        ...singleUnpaid,
                        totalAmount: e.target.value,
                      })
                    }
                    className="w-1/2 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">Date</label>
                  <input
                    type="date"
                    onChange={(e) =>
                      setSingleUnpaid({
                        ...singleUnpaid,
                        payDate: e.target.value,
                      })
                    }
                    className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>

            <div className="pdf-content">
              <div className="text-center bg-teal-800 py-[1.5px] mt-4">
                <h2 className="font-semibold text-white">Payment Details</h2>
              </div>
              <div className="mt-2">
                <div className="flex items-center gap-7">
                  <div className="w-full flex items-center gap-0">
                    <label className="w-[35%] text-sm font-semibold">
                      Deposit Branch
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setSingleUnpaid({
                          ...singleUnpaid,
                          depositBranch: e.target.value,
                        })
                      }
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    />
                  </div>
                  <div className="w-full flex items-center gap-2">
                    <label className="w-[30%] text-sm font-semibold">
                      Payment By
                    </label>
                    <select
                      value={paymentBy}
                      onChange={(e) => {
                        setPaymentBy(e.target.value),
                          setSingleUnpaid({
                            ...singleUnpaid,
                            paymentBy: e.target.value,
                          });
                      }}
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    >
                      <option selected>--select--</option>
                      <option value="CASH">CASH</option>
                      <option value="CHEQUE">CHEQUE</option>
                      <option value="NEFT">NEFT</option>
                      <option value="IMPS">IMPS</option>
                      <option value="ONLINE">ONLINE</option>
                    </select>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    />
                  </div> */}
                </div>
              </div>
            </div>

            {paymentBy !== "CASH" && (
              <div className="w-full mt-2 pdf-content" id="pdf-content">
                <div className="flex items-center gap-3">
                  {paymentBy === "CHEQUE" ? (
                    <div className="w-full flex items-center gap-2">
                      <label className="w-[55%] text-sm font-semibold">
                        Cheque Number
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setSingleUnpaid({
                            ...singleUnpaid,
                            chequeNo: e.target.value,
                          })
                        }
                        className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  ) : (
                    <div className="w-full flex items-center gap-2">
                      <label className="w-[55%] text-sm font-semibold">
                        Transaction No
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setSingleUnpaid({
                            ...singleUnpaid,
                            transactionNo: e.target.value,
                          })
                        }
                        className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                  )}
                  <div className="w-full flex items-center gap-2">
                    <label className="w-[55%] text-sm font-semibold">
                      Cheque Date
                    </label>
                    <input
                      type="date"
                      onChange={(e) =>
                        setSingleUnpaid({
                          ...singleUnpaid,
                          chequeDate: e.target.value,
                        })
                      }
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    />
                  </div>
                  <div className="w-full flex items-center gap-2">
                    <label className="w-[35%] text-sm font-semibold">
                      Receive A/C
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setSingleUnpaid({
                          ...singleUnpaid,
                          receiveAC: e.target.value,
                        })
                      }
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="w-full mt-2 pdf-content" id="pdf-content">
              <div className="flex items-center gap-3">
                {paymentBy !== "CASH" && (
                  <div className="w-full flex items-center gap-2">
                    <label className="w-[55%] text-sm font-semibold">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setSingleUnpaid({
                          ...singleUnpaid,
                          paymentBank: e.target.value,
                        })
                      }
                      className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                    />
                  </div>
                )}
                <div className="w-full flex items-center gap-2">
                  <label className="w-[55%] text-sm font-semibold">
                    Penalty Deduct
                  </label>
                  <input
                    type="text"
                    placeholder="Yes/No"
                    onChange={(e) =>
                      setSingleUnpaid({
                        ...singleUnpaid,
                        penaltyDeduct: e.target.value,
                      })
                    }
                    className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
                <div className="w-full flex items-center gap-2">
                  <label className="w-[55%] text-sm font-semibold">
                    Penalty Charges
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setSingleUnpaid({
                        ...singleUnpaid,
                        penaltyCharges: e.target.value,
                      })
                    }
                    className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-2" id="pdf-content">
              <div className="w-full grid grid-cols-2 items-center gap-3">
                <div className="w-full flex items-center gap-3">
                  <label className="w-[25%] text-sm font-semibold">
                    Payment Remarks
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setSingleUnpaid({
                        ...singleUnpaid,
                        remarks: e.target.value,
                      })
                    }
                    className="w-1/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                  />
                </div>
                <div className="w-full flex items-center gap-5 mt-4">
                  <button className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-md">
                    Save
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-md"
                  >
                    Update
                  </button>
                  <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md">
                    Delete
                  </button>
                  <button
                    onClick={handleGeneratePDF}
                    className="bg-blue-700 text-white font-semibold px-4 py-2 rounded-md"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full mt-8">
              <div className="w-full grid grid-cols-2">
                <div>
                  <div className="w-full">
                    {" "}
                    <div className="container max-w-screen px-4 mx-auto sm:px-8 overflow-y-auto">
                      <div className="bg-teal-700 mt-3 py-2 rounded-t-lg">
                        <h2 className="text-center text-white font-bold">
                          Paid EMIs
                        </h2>
                      </div>
                      <div className="pb-8">
                        <div className="px-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                          <div className="inline-block min-w-full overflow-hidden rounded-b-lg shadow">
                            <table className="min-w-full leading-normal">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                                  >
                                    Due Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                                  >
                                    Pay Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                                  >
                                    Amount
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                                  >
                                    Late Fine
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
                                  paidData?.map((item) => (
                                    <>
                                      <tr
                                        title="Edit"
                                        key={item._id}
                                        className={`cursor-pointer bg-white`}
                                      >
                                        <td className="px-5 py-3 text-sm border-b border-gray-200">
                                          <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                              <a
                                                href="#"
                                                className="relative block"
                                              ></a>
                                            </div>
                                            <div className="">
                                              <p className="text-gray-900 whitespace-no-wrap">
                                                {item.dueDate}
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-5 py-3 text-sm  border-b border-gray-200">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {item.payDate}
                                          </p>
                                        </td>
                                        <td className="px-5 py-3 text-sm  border-b border-gray-200">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {item.EMI}
                                          </p>
                                        </td>
                                        <td className="px-5 py-3 text-sm  border-b border-gray-200">
                                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                            <span
                                              aria-hidden="true"
                                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                            ></span>
                                            <span className="relative">0</span>
                                          </span>
                                        </td>
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
                <div>
                  <div className="w-full">
                    <div className="container max-w-screen px-4 mx-auto sm:px-8 overflow-y-auto">
                      <div className="bg-teal-700 mt-3 py-2 rounded-t-lg">
                        <h2 className="text-center text-white font-bold">
                          Unpaid EMIs
                        </h2>
                      </div>
                      <div className="pb-8">
                        <div className="px-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                          <div className="inline-block min-w-full overflow-hidden rounded-b-lg shadow">
                            <table className="min-w-full leading-normal">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                                  >
                                    Due Date
                                  </th>
                                  {/* <th
                                    scope="col"
                                    className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                                  >
                                    Pay Date
                                  </th> */}
                                  <th
                                    scope="col"
                                    className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                                  >
                                    Amount
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                                  >
                                    Late Fine
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                                  >
                                    Action
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
                                  unpaidData?.map((item) => (
                                    <>
                                      <tr
                                        title="Edit"
                                        key={item._id}
                                        className={`cursor-pointer bg-white`}
                                      >
                                        <td className="px-5 py-3 text-sm  border-b border-gray-200">
                                          <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                              <a
                                                href="#"
                                                className="relative block"
                                              ></a>
                                            </div>
                                            <div className="">
                                              <p className="text-gray-900 whitespace-no-wrap">
                                                {item.dueDate}
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        {/* <td className="px-5 py-3 text-sm  border-b border-gray-200">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {item.dateOfJoining}
                                          </p>
                                        </td> */}
                                        <td className="px-5 py-3 text-sm  border-b border-gray-200">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {item.EMI}
                                          </p>
                                        </td>
                                        <td className="px-5 py-3 text-sm  border-b border-gray-200">
                                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                            <span
                                              aria-hidden="true"
                                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                            ></span>
                                            <span className="relative">0</span>
                                          </span>
                                        </td>
                                        <td className="px-5 text-sm border-b border-gray-200">
                                          <button
                                            className="bg-teal-600 py-2 px-3 text-white font-semibold rounded-sm"
                                            onClick={() =>
                                              singleUnpaidData(item._id)
                                            }
                                          >
                                            Pay Emi
                                          </button>
                                        </td>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RepaySingle;
