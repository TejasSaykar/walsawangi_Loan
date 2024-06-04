const loanModel = require("../models/loanModel");
const emiModel = require("../models/emiModel");

const groupLoanModel = require("../models/groupLoanModel");
const groupEmiModel = require("../models/groupEmiModel");

exports.loan = async (req, res) => {
  const { term } = req.body;

  const exists = await loanModel.findOne({ loanId: req.body.loanId });
  if (exists) {
    return res.status(401).json({
      success: false,
      message: "Loan Id already exists. Try different one !",
    });
  }

  const loanRecords = [];
  const startDate = new Date(req.body.dateOfJoining);

  for (let i = 1; i <= term; i++) {
    const emiDate = new Date(startDate);
    emiDate.setMonth(emiDate.getMonth() + i);

    loanRecords.push({
      ...req.body,
      dueDate: emiDate.toLocaleDateString(),
    });
  }
  try {
    const emi = await emiModel.insertMany(loanRecords);
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

exports.getLoanByLoanId = async (req, res) => {
  const { loanId } = req.params;
  try {
    const loan = await loanModel.findOne({ loanId: loanId });
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "LoanId not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Getting the loan",
      loan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the loan",
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
    if (loan.totalPayments + 1 == parseInt(loan.term)) {
      loan.advanceAmount += parseInt(req.body.advanceAmount);
      loan.totalPaid += parseInt(req.body.EMI);
      loan.totalPayments++;
      loan.status = true;
    } else {
      loan.advanceAmount += parseInt(req.body.advanceAmount);
      loan.totalPaid += parseInt(req.body.EMI);
      loan.totalPayments++;
    }

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
  const { loanId } = req.params;
  try {
    const emis = await emiModel.find({ loanId });
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

exports.approveLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await loanModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Status updated",
      loan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the status",
      error,
    });
  }
};

exports.getRequisitions = async (req, res) => {
  try {
    const loans = await loanModel.find({}).populate("applicantId");
    const requisitionLoans = loans.filter((loan) => loan.isApprove === false);
    if (!requisitionLoans) {
      return res.status(401).json({
        success: false,
        message: "No loan requisition found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Getting all loan requisitions",
      requisitionLoans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the loan requisitions",
      error,
    });
  }
};

exports.getApprovals = async (req, res) => {
  try {
    const loans = await loanModel.find({});
    const approvalLoans = loans.filter((loan) => loan.isApprove);
    if (!approvalLoans) {
      return res.status(401).json({
        success: false,
        message: "No loan approval found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Getting approval loans",
      approvalLoans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the approval loans",
      error,
    });
  }
};

exports.getDues = async (req, res) => {
  try {
    const loans = await loanModel.find({});
    const dueLoans = loans.filter((due) => due.totalPayments < due.term);
    return res.status(200).json({
      success: true,
      message: "Due loans are getting",
      dueLoans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the due loans",
      error,
    });
  }
};

// Group Loans

exports.groupLoan = async (req, res) => {
  const { term } = req.body;

  const loanRecords = [];
  const startDate = new Date(req.body.dateOfJoining);

  for (let i = 1; i <= term; i++) {
    const emiDate = new Date(startDate);
    emiDate.setMonth(emiDate.getMonth() + i);

    loanRecords.push({
      ...req.body,
      dueDate: emiDate.toLocaleDateString(),
    });
  }
  try {
    const groupEmi = await groupEmiModel.insertMany(loanRecords);
    const groupLoan = await new groupLoanModel({ ...req.body }).save();
    return res.status(201).json({
      success: true,
      message: "Loan created",
      groupLoan,
      groupEmi,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the group loan",
      error,
    });
  }
};

// Group Loan Controllers
// Get Group Loans
exports.getGroupLoans = async (req, res) => {
  try {
    const groupLoans = await groupLoanModel.find({});
    return res.status(200).json({
      success: true,
      message: "Getting all group loans",
      groupLoans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the group Loans",
      error,
    });
  }
};

exports.deleteGroupLoan = async (req, res) => {
  const { id } = req.params;
  const { loanId } = req.query;
  try {
    const groupLoan = await groupLoanModel.findByIdAndDelete({ _id: id });
    const groupEmi = await groupEmiModel.deleteMany({ loanId });
    return res.status(200).json({
      success: true,
      message: "Group loan deleted",
      groupLoan,
      groupEmi,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the group loan",
      error,
    });
  }
};

exports.getGroupLoanByLoanId = async (req, res) => {
  const { loanId } = req.params;
  try {
    const loan = await groupLoanModel.findOne({ loanId: loanId });
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "LoanId not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Getting the loan",
      loan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the loan",
      error,
    });
  }
};

exports.updateGroupLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const emi = await groupEmiModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body, isPaid: true },
      { new: true }
    );

    const loan = await groupLoanModel.findOne({ loanId: req.body.loanId });
    if (loan.totalPayments + 1 === parseInt(loan.term)) {
      loan.advanceAmount += parseInt(req.body.advanceAmount);
      loan.totalPaid += parseInt(req.body.EMI);
      loan.totalPayments++;
      loan.status = true;
    } else {
      loan.advanceAmount += parseInt(req.body.advanceAmount);
      loan.totalPaid += parseInt(req.body.EMI);
      loan.totalPayments++;
    }

    const updatedLoan = await groupLoanModel.findByIdAndUpdate(
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

exports.getGroupEmis = async (req, res) => {
  const { loanId } = req.params;
  try {
    const emis = await groupEmiModel.find({ loanId });
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

exports.approveGroupLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await groupLoanModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Status updated",
      loan,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the status",
      error,
    });
  }
};

exports.getGroupRequisitions = async (req, res) => {
  try {
    const loans = await groupLoanModel.find({});
    const requisitionLoans = loans.filter((loan) => loan.isApprove === false);
    if (!requisitionLoans) {
      return res.status(401).json({
        success: false,
        message: "No loan requisition found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Getting all loan requisitions",
      requisitionLoans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the loan requisitions",
      error,
    });
  }
};

exports.getGroupApprovals = async (req, res) => {
  try {
    const loans = await groupLoanModel.find({});
    const approvalLoans = loans.filter((loan) => loan.isApprove);
    if (!approvalLoans) {
      return res.status(401).json({
        success: false,
        message: "No loan approval found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Getting approval loans",
      approvalLoans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the approval loans",
      error,
    });
  }
};

exports.getGroupDues = async (req, res) => {
  try {
    const loans = await groupLoanModel.find({});
    const dueLoans = loans.filter((due) => due.totalPayments < due.term);
    return res.status(200).json({
      success: true,
      message: "Due loans are getting",
      dueLoans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the due loans",
      error,
    });
  }
};
