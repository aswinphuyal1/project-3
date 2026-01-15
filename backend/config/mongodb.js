// // //npm i mongoose
// import mongoose from "mongoose";
// const connectdb= async()=>
// {
//     mongoose.connection.on("connected",()=>
//     {
//         console.log("db connected");

//     })
//     await mongoose.connect(`${process.env.MONGODB_url}/project-3`);
// }
// export default connectdb

//npm i mongoose
import mongoose from "mongoose";
const connectdb = async () => {
  // detailed-fix: Workaround for "queryTxt ECONNREFUSED"
  // This attempts to use Google DNS explicitly to resolve the MongoDB SRV record
  try {
    const dns = await import("node:dns");
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    console.log("Attempting to use Google DNS for resolution...");
  } catch (e) {
    // If this fails (e.g. on some restricted environments), we just ignore and try connecting
    console.log("Could not set custom DNS:", e.message);
  }

  mongoose.connection.on("connected", () => {
    console.log("db connected");
  });
  try {
    await mongoose.connect(`${process.env.MONGODB_url}/project-3`);
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    console.error(
      "Suggestion: The error 'queryTxt ECONNREFUSED' often indicates a DNS issue with the 'mongodb+srv://' connection string. \nTry switching to the 'Standard Connection String' (mongodb://) in your MongoDB Atlas dashboard."
    );
  }
};
export default connectdb;
