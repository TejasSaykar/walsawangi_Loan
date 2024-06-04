import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { message } from "antd";

const RepaySingle = () => {
  const [loan, setLoan] = useState({});
  const [allEmis, setAllEmis] = useState([]);
  const [unpaidData, setUnpaidData] = useState([]);
  const [singleUnpaid, setSingleUnpaid] = useState({});
  const [paidData, setPaidData] = useState([]);
  const [loanId, setLoanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentBy, setPaymentBy] = useState("");

  useEffect(() => {
    if (singleUnpaid.totalAmount > singleUnpaid.EMI) {
      let advance = singleUnpaid.totalAmount - singleUnpaid.EMI;
      setLoan({ ...loan, advanceAmount: advance });
    } else {
      setLoan({ ...loan, advanceAmount: 0 });
    }
  }, [singleUnpaid, setLoan]);

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

  const singleUnpaidData = (id) => {
    const unpay = unpaidData?.filter((item) => item._id == id);
    setSingleUnpaid(unpay[0]);
  };

  const fetchLoans = async (e) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/loan/get-loanId/${loanId}`
      );
      if (data) {
        // console.log("Loan Data : ", data.loan);
        setLoan(data.loan);
        setLoading(false);
      }
      fetchEmis();
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
      message.error(error.response.data.message);
    }
  };

  const fetchEmis = async () => {
    try {
      const { data: emis } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/loan/emis/${loanId}`
      );
      if (emis) {
        // console.log("Emis : ", emis.emis);
        setAllEmis(emis.emis);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if(!singleUnpaid.paymentNumber){
      return message.error("Payment number is required!")
    }
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/loan/update/${singleUnpaid._id}`,
        {
          ...singleUnpaid,
          advanceAmount: loan.advanceAmount,
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
        setLoan({
          totalPaid: "",
          advanceAmount: "",
        });
        fetchLoans();
        fetchEmis();
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="w-full">
        <div>
          <h2 className="text-center font-semibold text-2xl pt-3 text-stone-700">Single Loan Re-Payment</h2>
        </div>
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
                <span className="w-[50%] font-semibold">Enter Loan ID</span>
                <input
                  type="text"
                  value={loanId}
                  onChange={(e) => setLoanId(e.target.value)}
                  className="w-full focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                />
                {loading ? (
                  <button
                    className="w-[50%] bg-teal-400 animate-pulse text-white p-1 py-[6px] text-sm font-semibold"
                    onClick={fetchLoans}
                  >
                    Loading....
                  </button>
                ) : (
                  <button
                    className="w-[50%] bg-teal-700 text-white p-1 py-[6px] text-sm font-semibold"
                    onClick={fetchLoans}
                  >
                    Fetch Loan
                  </button>
                )}
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
                        value={loan?.loanId}
                        onChange={(e) =>
                          setFilteredData({
                            ...loan,
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
                        value={loan?.formNo}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.memberId}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.dateOfJoining}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                      value={loan?.applicantName}
                      onChange={(e) =>
                        setLoan({
                          ...loan,
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
                        value={loan?.phoneNo}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.age}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.productName}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.term}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.loanAmount}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.mode}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.ROI}
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
                        value={loan?.processingFees}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.insuranceAmount}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.EMI}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                          setLoan({
                            ...loan,
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
                      type="text"
                      value={loan?.bankAC}
                      onChange={(e) =>
                        setLoan({
                          ...loan,
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
                        setLoan({
                          ...loan,
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
                        value={loan?.paymentBy}
                        className="w-2/3 focus:outline-none ring-1 ring-gray-400 px-1 focus:ring-blue-400"
                      />
                    </div>
                    <div className="w-full flex items-center gap-3">
                      <label className="w-[55%] text-sm font-semibold">
                        Cheque No
                      </label>
                      <input
                        type="text"
                        value={loan?.chequeNo}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.chequeDate}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                        value={loan?.bankAC}
                        onChange={(e) =>
                          setLoan({
                            ...loan,
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
                      value={loan?.bankName}
                      onChange={(e) =>
                        setLoan({
                          ...loan,
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
                    value={loan?.totalPaid}
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
                    value={loan?.advanceAmount}
                    onChange={(e) =>
                      setLoan({
                        ...loan,
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
                  {loading ? (
                    <button
                      onClick={handleUpdate}
                      className="bg-teal-700 animate-pulse text-white font-semibold px-4 py-2 rounded-md"
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-md"
                    >
                      Update
                    </button>
                  )}
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
