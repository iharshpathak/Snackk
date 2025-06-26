import userModel from "../models/userModel.js"

//add items to user cart
async function addToCart(req, res){
  try{

    let userData = await userModel.findById(req.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found"});
    }
    let cart = await userData.cart || {};

    
    if(!cart[req.body.itemId])
    {
      cart[req.body.itemId] = 1;
      
    }else{
      cart[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.userId, { $set: { cart } });

    res.json({success:true, message:"Added To Cart"});
    
  }catch(error){
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

//remove items from user cart
async function removeFromCart(req, res){
try{
  let userData = await userModel.findById(req.userId);
  let cart = await userData.cart;
  
  if (cart[req.body.itemId]) {
    cart[req.body.itemId] -= 1;
    if (cart[req.body.itemId] <= 0) {
      delete cart[req.body.itemId];
    }
  }

  await userModel.findByIdAndUpdate(req.userId, { $set: { cart } });

  res.json({success:true, message:"Removed From Cart"});
  
}catch(error){
  console.log(error);
  res.json({success:false, message:"Error"})
}
}

//fetch user cart data
async function getCart(req, res){
try{
  // let userData = await userModel.findById(req.body.userId)
  let userData = await userModel.findById(req.userId);
  if (!userData) {
    return res.json({ success: false, message: "User not found"});
  }
  let cart = await userData.cart || {};
  res.json({success:true, cart});
}catch(error){
  console.log(error);
  res.json({success:false, message:"Error"});
}
}

export {addToCart, removeFromCart, getCart};