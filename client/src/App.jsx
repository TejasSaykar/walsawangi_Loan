import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<BankDetails />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/loan" element={<Loan />} />
      <Route path="/create-loan" element={<CreateLoan />} />
      <Route path="/add-customer" element={<AddCustomer />} />
      <Route path="/edit-customer/:id" element={<EditCustomer />} />
      <Route path="/update-loan/:id" element={<UpdateLoan />} />
      <Route path="/bank-details" element={<BankDetails />} />
      <Route path="/group" element={<Group />} />
      <Route path="/loan-collection" element={<Collection />} />
      <Route path="/bank-withdraw" element={<Withdrawal />} />
      <Route path="/bank-deposit" element={<Deposit />} />
      <Route path="/journal" element={<JournalVoucher />} />
      <Route path="/receipt" element={<ReceiptVoucher />} />
      <Route path="/payment" element={<PaymentVoucher />} />
    </Routes>
  );
}

export default App;
