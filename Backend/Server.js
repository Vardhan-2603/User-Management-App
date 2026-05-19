import exp from "express"
import {connect} from "mongoose";
import  {userApp}  from "./APIs/UserAPI.js";
import { config } from "dotenv";
import cors from "cors";
config();
const app=exp();
// add cors
app.use(cors({
    origin:["http://localhost:5173", "https://user-management-app-frontend-67n7.onrender.com"],
    credentials:true
}));

// Create HTTP server

// Add bodyparser middleware
app.use(exp.json());

// Disable caching for API responses
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});
// Forward request to UserAPI if path starts with /user-API
app.use('/user-api',userApp);
// Connect to DB
async function connectdb()
{
    try{
        await connect(process.env.ATLAS_URL)
        console.log("Connected to MongoDB")
        app.listen(process.env.PORT,()=>console.log(`server running on port ${process.env.PORT}`))
    }
    catch(err){
        console.log("Error connecting to MongoDB",err)
    }
}

connectdb();

// Add error handling middleware
app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: err.message,
  });
});