const {
  loan,
  getLoans,
  getSingleLoan,
  updateLoan,
  deleteLoan,
} = require("../controllers/loanController");

const router = require("express").Router();

router.post("/create", loan);

router.get("/get-loans", getLoans);

router.get("/get-loan/:id", getSingleLoan);

router.put("/update/:id", updateLoan);

router.delete("/delete/:id", deleteLoan);

module.exports = router;
