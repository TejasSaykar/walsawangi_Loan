const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    dateOfJoining: {
      type: String,
      required: true,
    },
    applicationNo: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    spouseName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    nomineeName: {
      type: String,
      required: true,
    },
    nomineeRelation: {
      type: String,
      required: true,
    },
    nomineeAge: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    acNo: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    ifsc: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    panNo: {
      type: String,
      required: true,
    },
    passportNo: {
      type: String,
      required: true,
    },
    rationCardNo: {
      type: String,
      required: true,
    },
    aadharNo: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema);
