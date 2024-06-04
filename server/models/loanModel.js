const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    applicantName: {
      type: String,
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    loanId: {
      type: String,
      required: true,
    },
    formNo: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: String,
      required: true,
    },
    totalPaid: {
      type: Number,
      default: 0,
    },
    advanceAmount: {
      type: Number,
      default: 0,
    },
    totalPayments: {
      type: Number,
      default: 0,
    },
    branch: {
      type: String,
      required: true,
    },
    previousLoan: {
      type: Number,
    },
    dateOfBirth: {
      type: String,
    },
    age: {
      type: Number,
    },
    gurdianName: {
      type: String,
    },
    address: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
    phoneNo: {
      type: Number,
    },
    gender: {
      type: String,
    },
    productName: {
      type: String,
      required: true,
    },
    loanTerm: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    ROI: {
      type: Number,
    },
    EMI: {
      type: Number,
      required: true,
    },
    interestType: {
      type: String,
    },
    collectorCode: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    processingFees: {
      type: Number,
    },
    updatedDate: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    isApprove: {
      type: Boolean,
      default: false,
    },
    approveDate: {
      type: String,
    },
    fileCharges: {
      type: Number,
    },
    legalAmount: {
      type: Number,
    },
    GST: {
      type: Number,
    },
    insuranceAmount: {
      type: Number,
    },
    disburseAmount: {
      type: Number,
    },
    paymentBy: {
      type: String,
      required: true,
    },
    chequeNo: {
      type: String,
      required: true,
    },
    chequeDate: {
      type: String,
      required: true,
    },
    bankAC: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    fromAC: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("loan", loanSchema);
