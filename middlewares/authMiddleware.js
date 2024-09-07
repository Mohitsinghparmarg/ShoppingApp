import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send({ success: false, message: "Authentication failed" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({ success: false, message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    console.error("Admin authorization error:", error);
    res.status(500).send({ success: false, message: "Admin middleware error", error });
  }
};
