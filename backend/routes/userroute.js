import express from "express";
import {
  loginuser,
  registeruser,
  adminlogin,
  supabaseLogin
} from "../controllers/usercontroller.js";

const userrouter = express.Router();

userrouter.post("/register", registeruser);
userrouter.post("/login", loginuser);
userrouter.post("/admin", adminlogin);
userrouter.post("/supabase-login",supabaseLogin);
export default userrouter;
