// Create min-express app
import exp from "express"
export const userApp=exp.Router();
import { UserModel } from "../Models/UserModel.js";
// USER API routes

// create a user
userApp.post('/users',async(req,res)=>{
    // get new user
    const newUser=req.body;
    // create user document
    const newUserDocument=new UserModel(newUser);
    // save new user
    await newUserDocument.save();
    // send res
    res.status(201).json({message:"users",payload:newUser});
})
// Read all users
userApp.get('/users',async(req,res)=>{
    let users = await UserModel.find({status:true})
    res.status(200).json({message:"List of Users are:- ",payload: users})
})
// Read a user by ID
userApp.get('/user/:id',async (req,res) => {
    let user = await UserModel.findById(req.params.id)
    if(!user || user.status === false)
    {
       return res.status(404).json({message:"User Not Found"})
    }
    res.status(200).json({message:"User Details:-",payload: user})
})
// Delete a user by ID
userApp.delete('/user/:id',async (req,res) => {
    let uid = req.params.id
    let user = await UserModel.findById(uid)
    if(!user || user.status === false)
    {
       return res.status(404).json({message:"User Not Found"})
    }
    await UserModel.findByIdAndUpdate(uid,{$set:{status:false}})
    res.status(200).json({message:"User Removed"})
})

// Activate the user(change status to true)
userApp.patch("/user/:id",async(req,res)=>{
    // get user id from url
    let uid=req.params.id;
    // find user and update status to true
    
    let user = await UserModel.findByIdAndUpdate(uid,{$set:{status:true}})
    let updateduser=await UserModel.findById(uid);
    res.status(200).json({message:"User Activated",payload:updateduser})
})
// Update a user by ID
userApp.put('/user/:id', async (req, res, next) => {
    try {
        let uid = req.params.id;
        let modifiedUser = req.body;
        let user = await UserModel.findByIdAndUpdate(uid, { $set: modifiedUser }, { new: true });
        if (!user || user.status === false) {
            return res.status(404).json({ message: "User Not Found" });
        }
        res.status(200).json({ message: "User Updated", payload: user });
    } catch (err) {
        next(err);
    }
});