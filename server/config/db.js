const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tejassaykar2001:walsawangi123@cluster0.u7ookqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MONGO GOT CONNECTED`);
  } catch (error) {
    console.log("MONGO ERROR : ", error);
  }
};

module.exports = connectDb;
