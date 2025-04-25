import express from "express";
import authRoutes from "./routes/auth.routes.js";
import blogsRoutes from "./routes/blogs.routes.js";
import cookieParser from "cookie-parser";
import { isAuth } from "./middlewares/isAuth.js";
import commentRouter from "./routes/comments.routes.js";

const app = express();

// middlerware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authRoutes);
app.use(blogsRoutes);
app.use(commentRouter);

app.get("/", isAuth, (req, res)=>{
    res.send("<h1>Hello</h1>")
})

export default app;