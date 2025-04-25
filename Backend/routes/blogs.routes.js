import express from "express";
import { addBlog, deleteblog } from "../controllers/blogs.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/addblog", isAuth,upload.single("image"),addBlog);
router.delete("/blog/:blogId",isAuth, deleteblog)

export default router;