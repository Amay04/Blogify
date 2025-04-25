import express from "express";
import { addComment } from "../controllers/comments.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/addComment/:blogId",isAuth, addComment)

export default router;