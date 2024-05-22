const loanModel = require("../models/loanModel");

exports.loan = async (req, res) => {
  // return console.log("Loan : ", req.body);
  try {
    const newLoan = await new loanModel({ ...req.body }).save();
    return res.status(201).json({
      success: true,
      message: "Loan Created",
      newLoan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the loan",
      error,
    });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const loans = await loanModel.find({});
    return res.status(200).json({
      success: true,
      message: "Getting all customers",
      loans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the Loans",
      error,
    });
  }
};

exports.getSingleLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await loanModel.findById({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Getting the single loan",
      loan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the single user",
      error,
    });
  }
};

exports.updateLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await loanModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Loan updated",
      loan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the loan",
      error,
    });
  }
};

exports.deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await loanModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Loan Deleted",
      loan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the loan",
      error,
    });
  }
};


