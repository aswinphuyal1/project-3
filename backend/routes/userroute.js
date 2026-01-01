import express from "express";
import {
  loginuser,
  registeruser,
  adminlogin,
  supabaseLogin,
  changePassword,
  deleteAccount,
  getAllUsers
} from "../controllers/usercontroller.js";
import authuser from "../middleware/auth.js";

const userrouter = express.Router();

userrouter.post("/register", registeruser);
userrouter.post("/login", loginuser);
userrouter.post("/admin", adminlogin);
userrouter.post("/supabase-login", supabaseLogin);
userrouter.post("/change-password", authuser, changePassword);
userrouter.delete("/delete", authuser, deleteAccount);
userrouter.get("/list", getAllUsers); // broad access for now as per "admin" flow
export default userrouter;
