import {Schema,model} from 'mongoose'
// Create user schema with validations
// name ,email,DOB,Mobile No
const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already existed"]
    },
    dateofBirth:{
        type:Date,
        required:[true,"Date of birth is required"]
    },
    mobileNumber:{
        type:Number,
    },
    // for soft delete
    status:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true,
    versionKey:false,
    strict:"throw"
}

)
// Create user Model for User Schema
export const UserModel=model("user",userSchema);