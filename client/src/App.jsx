import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Customer from "./pages/Customer";
import Loan from "./pages/Loan";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import CreateLoan from "./pages/CreateLoan";
import UpdateLoan from "./pages/UpdateLoan";
import BankDetails from "./pages/BankDetails";
import Group from "./pages/Group";
import Collection from "./pages/Collection";
import Withdrawal from "./pages/Withdrawal";
import Deposit from "./pages/Deposit";
import JournalVoucher from "./pages/JournalVoucher";
import ReceiptVoucher from "./pages/ReceiptVoucher";
import PaymentVoucher from "./pages/PaymentVoucher";
import Login from "./pages/Login";
import RepaySingle from "./pages/RepaySingle";
import RepayGroup from "./pages/RepayGroup";
import GroupLoan from "./pages/GroupLoan";
import CreateGroupLoan from "./pages/CreateGroupLoan";
import RequisitionReport from "./pages/RequisitionReport";
import ApprovalReport from "./pages/ApprovalReport";
import DueReport from "./pages/DueReport";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <IsAdmin>
            <BankDetails />
          </IsAdmin>
        }
      />
      <Route
        path="/customer"
        element={
          <IsAdmin>
            <Customer />
          </IsAdmin>
        }
      />
      <Route
        path="/loan"
        element={
          <IsAdmin>
            <Loan />
          </IsAdmin>
        }
      />
      <Route
        path="/create-loan"
        element={
          <IsAdmin>
            <CreateLoan />
          </IsAdmin>
        }
      />

      <Route
        path="/group-loan"
        element={
          <IsAdmin>
            <GroupLoan />
          </IsAdmin>
        }
      />

      <Route
        path="/create-group-loan"
        element={
          <IsAdmin>
            <CreateGroupLoan />
          </IsAdmin>
        }
      />

      <Route
        path="/add-customer"
        element={
          <IsAdmin>
            <AddCustomer />
          </IsAdmin>
        }
      />
      <Route
        path="/edit-customer/:id"
        element={
          <IsAdmin>
            <EditCustomer />
          </IsAdmin>
        }
      />
      <Route
        path="/update-loan/:id"
        element={
          <IsAdmin>
            <UpdateLoan />
          </IsAdmin>
        }
      />
      <Route
        path="/bank-details"
        element={
          <IsAdmin>
            <BankDetails />
          </IsAdmin>
        }
      />
      <Route
        path="/group"
        element={
          <IsAdmin>
            <Group />
          </IsAdmin>
        }
      />
      <Route
        path="/loan-collection"
        element={
          <IsAdmin>
            <Collection />
          </IsAdmin>
        }
      />
      <Route
        path="/bank-withdraw"
        element={
          <IsAdmin>
            <Withdrawal />
          </IsAdmin>
        }
      />
      <Route
        path="/bank-deposit"
        element={
          <IsAdmin>
            <Deposit />
          </IsAdmin>
        }
      />
      <Route
        path="/journal"
        element={
          <IsAdmin>
            <JournalVoucher />
          </IsAdmin>
        }
      />
      <Route
        path="/receipt"
        element={
          <IsAdmin>
            <ReceiptVoucher />
          </IsAdmin>
        }
      />
      <Route
        path="/payment"
        element={
          <IsAdmin>
            <PaymentVoucher />
          </IsAdmin>
        }
      />
      <Route
        path="/single-repay"
        element={
          <IsAdmin>
            <RepaySingle />
          </IsAdmin>
        }
      />
      <Route
        path="/group-repay"
        element={
          <IsAdmin>
            <RepayGroup />
          </IsAdmin>
        }
      />
      <Route
        path="/loan-requisition"
        element={
          <IsAdmin>
            <RequisitionReport />
          </IsAdmin>
        }
      />
      <Route
        path="/loan-approval"
        element={
          <IsAdmin>
            <ApprovalReport />
          </IsAdmin>
        }
      />
      <Route
        path="/loan-due"
        element={
          <IsAdmin>
            <DueReport />
          </IsAdmin>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export function IsAdmin(props) {
  const user = localStorage.getItem("auth");
  if (user) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default App;
