import foodModel from "../models/foodModel.js";
import fs from "fs"

//add food item
async function addFood(req,res){

  let image_filename = `${req.file.filename}`

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category
  })
  try{
    await food.save();
    res.json({success: true, message: "Food item added successfully"});
    
  } catch(error){
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}

//all food list
async function listFood(req,res){
  try{
    const foods = await foodModel.find({});
    res.json({success: true, data: foods});
  }catch(error){
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}

//remove food item
async function removeFood(req,res){
  try{
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success: true, message: "Food item removed successfully"});
  }catch(error){
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}

export {addFood, listFood, removeFood}