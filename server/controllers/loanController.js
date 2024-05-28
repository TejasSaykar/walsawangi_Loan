const loanModel = require("../models/loanModel");
const emiModel = require("../models/emiModel");

exports.loan = async (req, res) => {
  const { term } = req.body;

  const loanReacords = [];
  const startDate = new Date(req.body.dateOfJoining);

  for (let i = 0; i < term; i++) {
    const emiDate = new Date(startDate);
    emiDate.setMonth(emiDate.getMonth() + i);

    loanReacords.push({
      ...req.body,
      dueDate: emiDate.toLocaleDateString(),
    });
  }

  try {
    const emi = await emiModel.insertMany(loanReacords);
    const loan = await new loanModel({ ...req.body }).save();
    return res.status(201).json({
      success: true,
      message: "Loan created",
      loan,
      emi,
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
    const emi = await emiModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body, isPaid: true },
      { new: true }
    );

    const loan = await loanModel.findOne({ loanId: req.body.loanId });
    loan.advanceAmount += parseInt(req.body.advanceAmount);
    loan.totalPaid += parseInt(req.body.EMI);
    loan.totalPayments++;

    const updatedLoan = await loanModel.findByIdAndUpdate(
      { _id: loan._id },
      { $set: loan },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Loan updated",
      emi,
      updatedLoan,
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

exports.getEmis = async (req, res) => {
  try {
    const emis = await emiModel.find({});
    return res.status(200).json({
      success: true,
      message: "Getting all emis",
      emis,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all emis",
      error,
    });
  }
};
