const mongoose = require("mongoose");

const emiSchema = new mongoose.Schema(
  {
    applicantName: {
      type: String,
      required: true,
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
    isPaid: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: String,
    },
    payDate: {
      type: String,
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
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gurdianName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
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
      required: true,
    },
    EMI: {
      type: Number,
    },
    interestType: {
      type: String,
      required: true,
    },
    collectorCode: {
      type: String,
    },
    purpose: {
      type: String,
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
    },
    chequeNo: {
      type: String,
    },
    chequeDate: {
      type: String,
    },
    bankAC: {
      type: String,
    },
    bankName: {
      type: String,
    },
    fromAC: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("emi", emiSchema);
