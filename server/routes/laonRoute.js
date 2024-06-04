const {
  loan,
  getLoans,
  getSingleLoan,
  updateLoan,
  deleteLoan,
  getEmis,
  getLoanByLoanId,
  groupLoan,
  getGroupLoans,
  deleteGroupLoan,
  getGroupLoanByLoanId,
  updateGroupLoan,
  getGroupEmis,
  approveLoan,
  getRequisitions,
  getApprovals,
  getDues,
  approveGroupLoan,
  getGroupRequisitions,
  getGroupApprovals,
  getGroupDues,
} = require("../controllers/loanController");

const router = require("express").Router();

router.post("/create", loan);

router.get("/get-loans", getLoans);

router.get("/get-loanId/:loanId", getLoanByLoanId);

router.get("/get-loan/:id", getSingleLoan);

router.put("/update/:id", updateLoan);

router.delete("/delete/:id", deleteLoan);

router.put("/status/:id", approveLoan);

router.get("/requisition", getRequisitions);

router.get("/approval", getApprovals);

router.get("/due-loans", getDues);

router.get("/emis/:loanId", getEmis);

router.post("/group-loan", groupLoan);

router.get("/get-group-loans", getGroupLoans);

router.delete("/delete-group-loan/:id", deleteGroupLoan);

router.get("/get-group/:loanId", getGroupLoanByLoanId);

router.get("/group-emis/:loanId", getGroupEmis);

router.put("/update-group/:id", updateGroupLoan);

router.put("/group-status/:id", approveGroupLoan);

router.get("/group-requisition", getGroupRequisitions);

router.get("/group-approval", getGroupApprovals);

router.get("/group-due-loans", getGroupDues);

module.exports = router;
