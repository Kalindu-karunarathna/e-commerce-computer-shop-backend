import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

//create user schema
const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:"customer"
        },
        isBlocked:{
            type:Boolean,
            default:false
        },
        isEmailVerified:{
            type:Boolean,
            default:false
        },
        image:{
            type:String,
            required:true,
            default:"/default,jpg"
        }
    }
);

//connect schema with database collection
const User = mongoose.model("User",userSchema)

//export  schema
export default User;
