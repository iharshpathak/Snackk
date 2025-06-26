import mongoose from "mongoose";

async function connectDB(){
  try{
    await mongoose.connect('mongodb+srv://PathakTech:Chair-Best-Chin3~@cluster0.jsql4nn.mongodb.net/snackk').then(()=> console.log('MongoDB connected'))
  }
  catch(error){
    console.log('Error connecting to MongoDB:', error);
    // process.exit(1);
  }
}

export default connectDB;