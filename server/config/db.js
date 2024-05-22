const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/walsawangikarurban1');
    console.log(`MONGO GOT CONNECTED`);
  } catch (error) {
    console.log("MONGO ERROR : ", error);
  }
};

module.exports = connectDb;
