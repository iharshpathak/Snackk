import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login
async function loginUser(req,res){
  const {email, password} = req.body;
  try{
    const user = await userModel.findOne({email: email});
    if(!user){
      return res.json({success: false, message: "User Does Not Exist"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.json({success: false, message: "Invalid Credentials"});
    }
    const token = createToken(user._id);
    res.json({success: true, token: token});
    
  }catch(error){
    console.log(error);
    res.json({success: false, message: "Error"});
  }
  
}

const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,)
}

//register or Signup
async function registerUser(req,res){
  const {name, email, password} = req.body;
  try{
    //checking if user already exists
    const exists = await userModel.findOne({email: email});
    if(exists){
      return res.json({success: false, message: "User already exists"});
    }
    //checking if email is valid and password is strong
    if(!validator.isEmail(email)){
      return res.json({success: false, message: "Please Enter A Valid Email"});
    }
    if(password.length<8){
      return res.json({success: false, message: "Please Enter A Strong Password of atleast 8 characters"});
    }else if(!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)){
      return res.json({success: false, message: "Password must include both letters and numbers"});
    }else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return res.json({ success: false, message: "Password must include at least one special character" });
      }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword
    })
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({success: true, token: token});
    
  }catch(error){
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}


export {loginUser, registerUser};