import jwt from "jsonwebtoken";
import User from "../models/usermodel.js"; // Still need this!

const authuser = async (req, res, next) => {
  try {
    // FIX 1: Correct token extraction
    let token = req.headers.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }

    // FIX 2: Handle Bearer token
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // FIX 3: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // FIX 4: Get user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // FIX 5: Attach user properly
    req.user = user; // Not req.body.userid

    next();
  } catch (error) {
    console.log("Auth error:", error.message);

    // FIX 6: Proper error responses
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default authuser;
