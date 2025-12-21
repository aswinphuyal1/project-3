//npm i mongoose
import mongoose from "mongoose";
const connectdb= async()=>
{
    mongoose.connection.on("connected",()=>
    {
        console.log("db connected");

    })
    await mongoose.connect(`${process.env.MONGODB_url}/project-3`);
}
export default connectdb