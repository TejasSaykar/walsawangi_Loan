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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/loan" element={<Loan />} />
      <Route path="/create-loan" element={<CreateLoan />} />
      <Route path="/add-customer" element={<AddCustomer />} />
      <Route path="/edit-customer/:id" element={<EditCustomer />} />
      <Route path="/update-loan/:id" element={<UpdateLoan />} />
      <Route path="/bank-details" element={<BankDetails />} />
      <Route path="/group" element={<Group />} />
      <Route path="/loan-collection" element={<Collection />} />
    </Routes>
  );
}

export default App;
