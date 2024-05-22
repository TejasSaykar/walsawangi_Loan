const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const customerRoute = require("./routes/userRoute");
const loanRoute = require("./routes/laonRoute");
const bankRoute = require("./routes/bankRoute");
const groupRoute = require("./routes/groupRoute");
const collectionRoute = require("./routes/collectionRoute");

const app = express();

connectDb();
dotenv.config();

app.use(cors());
app.use(express.json());

// Routes

app.use("/api/customer", customerRoute);
app.use("/api/loan", loanRoute);
app.use("/api/bank", bankRoute);
app.use("/api/group", groupRoute);
app.use("/api/collection", collectionRoute);

app.get("/", (req, res) => {
  res.send("Hello From Walsawangikarurban 1");
});

const port = process.env.PORT || 8383;
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON http://localhost:${port}`);
});
