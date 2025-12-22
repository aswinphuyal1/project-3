import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import usermodel from "../models/usermodel";
const createtoken =(id)=>
{
    return jwt.sign({ id }, process.env.JWT_SECRET
    );
}
 const loginuser= async(req,res)=>
 {
    try {
        const{email,password}=req.body
        const user=usermodel.findOne({email});
        if(!user)
        {
            res.json({success:false,message:"user donot exist create account"});

        }
        const ismatch= await bcrypt.compare(password,user.password);
        if(ismatch)
        {
            const token=createtoken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({ success: true, message:"incorrect password" });
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
 }
 