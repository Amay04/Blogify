import { Comment } from "../models/comments.js";

export const addComment = async (req, res)=>{
    try {
        const {comment} = req.body;
        const {blogId} = req.params
        if(!comment){
            res.status(400).json({
                success:false,
                message:"All fields required"
            });
        }
        if(!req.user){
            res.status(401).json({
                success:false,
                message:"Unauthorized user"
            });
        }

        await Comment.create({
            author:req.user._id,
            comment:comment,
            blog: blogId
        })
        
        res.status(200).json({
            success:true,
            message:"Comment added successfully"
        })
    } catch (error) {
        console.log("Error in comment controller");
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}