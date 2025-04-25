import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier"; 
import { User } from "../models/User.js";
import { generateTokenAndSendCookie } from "../utilities/genrateTokenAndSendCookie.js";
export const SignUp = async (req, res)=>{
    try {
        const {name, email, password } = req.body;
        let profile = "";

        if (!name || !email || !password) {
            return res.status(400).json({
              success: false,
              message: "All fields are required"
            });
          }
          
        if(req.file) {
            const streamUpload = ()=>{
                return new Promise ((resolve, reject) =>
                    { const stream = cloudinary.uploader.upload_stream(
                    {
                        folder:"Blogify/Profile"
                    },
                    (error, results) =>{
                        if(results){
                            resolve(results)
                        }
                        else{
                            reject(error);
                        }
                    })
                    streamifier.createReadStream(req.file.buffer).pipe(stream);

                });

                
            }
            const result = await streamUpload();
                profile = result.secure_url;
                console.log(result);       
        }
        else{
            profile = "https://www.w3schools.com/howto/img_avatar.png"
        }


        const emailValidation = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm

        if(!emailValidation.test(email)){
            return res.status(400).json({
                success:false,
                message:"Invalid Email"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                success:false,
                message:"Password must be atleast 6"
            });
        }

        const existingUserByEmail = await User.findOne({email:email})

        if(existingUserByEmail){
           return  res.status(400).json({
                success:false,
                message:"Email Already Exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            profile: profile
        });

        generateTokenAndSendCookie(newUser._id, res);
        return res.status(200).json({
            success:true,
            message:"Sign Up successfully"
        });
        
    } catch (error) {
        console.log("Error in Signup controller: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
          });
        
    }
}

export const SignIn = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields required"
            });
        }
            let user = await User.findOne({email:email});

            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"User does not exist"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({
                    success:false,
                    message:"Inavlid credentials"
                });
            }
            generateTokenAndSendCookie(user._id, res);

            return res.status(200).json({
                success:true,
                message:"Login Successfully"
            });
    } catch (error) {
        console.log("Error in SignIn Controller: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
          });
        
    }
}
export const logout = (req, res) =>{
    try {
        res.clearCookie("auth");
        return res.status(200).json({
            success:true,
            message:"Logout Successfully"
        });

    } catch (error) {
        console.log("Error in Logout: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
          });
        
    }
}