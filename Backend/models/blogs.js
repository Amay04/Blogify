import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String
    },
    content:{
        type:String
    },
    image:{
        url:String,
        profile_id:String
    }
},{timeStamp:true});

export const Blog = mongoose.model("blogs",blogSchema);