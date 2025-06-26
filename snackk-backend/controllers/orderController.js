import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe";

//stripe config
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend
async function placeOrder(req, res){

  const frontendUrl = "https://snackk-frontend.onrender.com";
  
  try{
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.id,{$set:{cart:{}}});

    const line_items = req.body.items.map((item)=>({
      price_data:{
        currency:"usd",
        product_data:{
          name:item.name,
        },
        unit_amount:item.price*100
      },
      quantity:item.quantity
    }))
    line_items.push({
      price_data:{
        currency:"usd",
        product_data:{
          name:"Delivery Charges"
        },
        unit_amount:200
      },
      quantity:1
    })
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode:"payment",
      success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
    })
    res.json({success:true, session_url:session.url});
  }catch(error){
    console.log(error);
    res.json({success:false, message: error.message})
  }
}
async function verifyOrder(req, res){
  const {orderId, success} = req.body;
  try{
    if(success==="true"){
      await orderModel.findByIdAndUpdate(orderId,{$set:{payment:true}});
      res.json({success:true, message:"Payment Successful"})
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false, message:"Payment Failed"})
    }
    // res.redirect(`${frontendUrl}/order/${orderId}`);
  }catch(error){
    console.log(error);
    res.json({success:false, message: error.message})
  }
}

//user orders for frontend
async function userOrders(req, res){
  try{
    const orders = await orderModel.find({userId:req.userId});
    res.json({success:true, data:orders});
  }catch(error){
    console.log(error);
    res.json({success:false, message: error.message})
  }
}

//Listing orders for admin
async function listOrders(req, res){
  
  try{
    const orders = await orderModel.find({});
    res.json({success:true, data:orders});
  }catch(error){
    console.log(error);
    res.json({success:false, message: error.message})
  }
}

//updating order status for admin
async function updateStatus(req, res){
  try{
    await orderModel.findByIdAndUpdate(req.body.orderId,{$set:{status:req.body.status}});
    res.json({success:true, message:"Order Status Updated"});
  }catch(error){
    console.log(error);
    res.json({success:false, message: error.message});
  }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}