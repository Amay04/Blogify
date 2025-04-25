import express from "express";
import { logout, SignIn, SignUp } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.js"

const router = express.Router();

router.post("/signup",upload.single("profile"), SignUp);

router.post("/signin", SignIn);

router.post("/logout", logout);



export default router;