import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
import supabase from "../config/supabase.js";

const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user donot exist create account",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (ismatch) {
      const token = createtoken(user._id);
      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          provider: user.provider,
        },
      });
    } else {
      res.json({ success: false, message: "incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await usermodel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "user already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: "false",
        message: "Enter the valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "type a stronger password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newuser = new usermodel({
      name,
      email,
      password: hashedpassword,
      provider: "local",
    });
    const user = await newuser.save();
    const token = createtoken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email: email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid user" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const supabaseLogin = async (req, res) => {
  try {
    const { access_token } = req.body;
    if (!access_token)
      return res.json({ success: false, message: "Missing access_token" });

    const { data, error } = await supabase.auth.getUser(access_token);
    if (error || !data?.user)
      return res.json({ success: false, message: "Invalid Supabase token" });

    const supaUser = data.user;
    console.log("Supabase User Data:", {
      email: supaUser.email,
      app_metadata: supaUser.app_metadata,
      identities: supaUser.identities,
    });

    const supabase_id = supaUser.id;
    const email = supaUser.email;
    const name =
      supaUser.user_metadata?.full_name ||
      supaUser.user_metadata?.name ||
      email?.split("@")[0] ||
      "User";

    // Improved provider detection
    let provider = supaUser.app_metadata?.provider;
    if (!provider) {
      if (supaUser.identities && supaUser.identities.length > 0) {
        provider = supaUser.identities[0].provider;
      }
    }

    if (provider) provider = provider.toLowerCase();

    console.log("Detected Provider:", provider);

    // Map to schema enum ["local", "google", "github"]
    if (provider !== "github" && provider !== "google") {
      provider = "google"; // Fallback or assume google if 'email' or other
    }

    if (!email)
      return res.json({
        success: false,
        message: "Email not available from provider",
      });

    const existing = await usermodel.findOne({ email });

    if (existing) {
      if (existing.provider === "local") {
        return res.json({
          success: false,
          message: "Email already registered via password. Use normal login.",
        });
      }
      if (!existing.supabase_id) {
        existing.supabase_id = supabase_id;
        await existing.save();
      }
      const token = createtoken(existing._id);
      return res.json({
        success: true,
        token,
        user: {
          id: existing._id,
          name: existing.name,
          email: existing.email,
          provider: existing.provider,
        },
      });
    }

    const newuser = await usermodel.create({
      name,
      email,
      supabase_id,
      provider,
    });

    const token = createtoken(newuser._id);
    res.json({
      success: true,
      token,
      user: {
        id: newuser._id,
        name: newuser.name,
        email: newuser.email,
        provider: newuser.provider,
      },
    });
  } catch (error) {
    console.error("Supabase Login Error:", error);
    res.json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId || req.body.userId;
    const user = await usermodel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.provider !== "local") {
      return res.json({
        success: false,
        message:
          "You can only change password if you logged in with email/password.",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect current password",
      });
    }

    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const user = await usermodel.findByIdAndDelete(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await usermodel.find({});
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usermodel.findByIdAndDelete(id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginuser,
  registeruser,
  adminlogin,
  supabaseLogin,
  changePassword,
  deleteAccount,
  getAllUsers,
  deleteUserById,
};
