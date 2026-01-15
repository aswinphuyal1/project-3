import express from "express";
import {
  loginuser,
  registeruser,
  adminlogin,
  supabaseLogin,
  changePassword,
  deleteAccount,
  getAllUsers,
  deleteUserById
} from "../controllers/usercontroller.js";
import authuser from "../middleware/auth.js";
import adminAuth from "../middleware/adminauth.js";

const userrouter = express.Router();

userrouter.post("/register", registeruser);
userrouter.post("/login", loginuser);
userrouter.post("/admin", adminlogin);
userrouter.post("/supabase-login", supabaseLogin);
userrouter.post("/change-password", authuser, changePassword);
userrouter.delete("/delete", authuser, deleteAccount);
userrouter.delete("/delete", authuser, deleteAccount);
userrouter.get("/list", adminAuth, getAllUsers);
userrouter.delete("/admin/delete/:id", adminAuth, deleteUserById);
export default userrouter;
//