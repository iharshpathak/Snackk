import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login
async function loginAdmin(req, res) {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
      return res.json({ success: false, message: "Admin Does Not Exist" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = createToken(admin._id);
    res.json({ success: true, token: token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register or Signup
async function registerAdmin(req, res) {
  const { email, password } = req.body;
  try {
    //checking if admin already exists
    const exists = await adminModel.findOne({ email: email });
    if (exists) {
      return res.json({ success: false, message: "Admin already exists" });
    }
    //checking if email is valid and password is strong
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter A Valid Email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter A Strong Password of atleast 8 characters",
      });
    } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return res.json({
        success: false,
        message: "Password must include both letters and numbers",
      });
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return res.json({
        success: false,
        message: "Password must include at least one special character",
      });
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new admin
    const newAdmin = new adminModel({
      email: email,
      password: hashedPassword,
    });
    const admin = await newAdmin.save();
    const token = createToken(admin._id);
    res.json({ success: true, token: token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { loginAdmin, registerAdmin };
