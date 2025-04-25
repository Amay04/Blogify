import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:String
    }
},
{ timestamps: true });

export const User = mongoose.model("User", userSchema);