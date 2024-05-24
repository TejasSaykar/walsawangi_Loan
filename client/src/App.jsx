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
