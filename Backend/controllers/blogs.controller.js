import cloudinary from "../config/cloudinary.js";
import { Blog } from "../models/blogs.js";
import { User } from "../models/User.js";
import streamifier from "streamifier";


export const addBlog = async (req, res) =>{
    try {
        if (!req.body || !req.body.title || !req.body.content || !req.file) {
            return res.status(400).json({
              success: false,
              message: "All fields required"
            });
          }
        const {title, content} = req.body;
        
        const user = await User.findOne({_id:req.user._id});
        
        
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Please Login first"
              });
        }
        if(req.file) {
            const stream= ()=>{
                return new Promise((resolve, reject) =>{
                    const stream = cloudinary.uploader.upload_stream({
                        folder:"Blogify/Image"
                    },
                (error,results)=>{
                    if(results){
                        resolve(results);
                    }
                    else{
                        reject(error);
                    }
                });
                streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            }
            var results =  await stream();
            console.log(results);
        }
        const blog = await Blog.create({
            title:title,
            content:content,
            author:req.user._id,
            image:{
                url:results.secure_url,
                profile_id:results.public_id
            }
        });
        return res.status(200).json({
            success:true,
            message:"Blog added success"
        });

    } catch (error) {
        console.log("Error in addBlog controller: ", error);
        return res.status(500).json({
            success: true,
            message: "Internal server error"
          });
    }
    
}

export const deleteblog = async (req, res)=>{
 try {
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId)

    if(!blog){
        return res.status(400).json({
            success: false,
            message: "Blog not found"
          });

    }
    if(blog.image?.profile_id){
    await cloudinary.uploader.destroy(blog.image.profile_id);   
    }

    await blog.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Blog SuccessFully deleted"
      });
 } catch (error) {
    console.log("Error in delete blog controller", error);
    
    return res.status(500).json({
        success: true,
        message: "Internal server error"
      });
 }
}