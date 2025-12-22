import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import usermodel from "../models/usermodel.js";
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
            res.json({ success: false, message:"incorrect password" });
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
 }
 const registeruser = async(req,res)=>
 {
try {
        const { name, email, password } = req.body;
        const exist = await usermodel.findOne({ email });
        if (exist) {
          res.json({ success: false, message: "user already exist" });
        }
        if (!validator.isEmail(email)) {
          return res.json({
            success: "false",
            message: "Enter the valid email",
          });
        }

        if(password.length<8)
        {
            res.json(
                {
                    success:false,
                    message:"type a stronger password"
                }
            )
        }

        const salt =await bcrypt.genSalt(20);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser= new usermodel(
            {
                name,
                email,
                password:hashedpassword
            }
        )
        const user=await newuser.save()
const token =createtoken(user._id);
res.json({ success: true, token });
} catch (error) {
    res.json({
success:false,
message:error.message
})
}

 }

 const adminlogin = async (req, res) => {
   try {
     const { email, password } = req.body;
     if (
       email == process.env.ADMIN_EMAIL &&
       password == process.env.ADMIN_PASSWORD
     ) {
       const token = jwt.sign(email + password, process.env.JWT_SECRET);
       res.json({ success: true, token });
     } else {
       res.json({ success: false, message: "invalid user" });
     }
   } catch (error) {
     console.log(error);
     res.json({ success: false, message: error.message });
   }
 };

 export { loginuser, registeruser, adminlogin };

