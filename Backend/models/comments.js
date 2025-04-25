import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
        required:true,
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{timestamps:true});

export const Comment = mongoose.model("comment", commentSchema)