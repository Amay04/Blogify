import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

dotenv.config();
export const isAuth = async (req,res,next)=> {
    
    const token = req.cookies.Auth;
    try {
        
        if(!token) return next();

        const decode = jwt.verify(token, process.env.JWT_SECRET);

         req.user = await User.findOne({_id:decode.UserId});
         
         next();
    } catch (error) {
        console.log("Error in auth middleware: ",error)
        
    }
}