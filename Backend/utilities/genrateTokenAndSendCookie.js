import jwt from "jsonwebtoken"

export const generateTokenAndSendCookie = (UserId, res) =>{
    const token = jwt.sign({UserId}, process.env.JWT_SECRET,{expiresIn:"15d"});
    
    res.cookie("Auth", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly:true
    });
}