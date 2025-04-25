import app from "./Backend/app.js";
import dotenv from "dotenv";
import { connectDB } from "./Backend/data/database.js";

// dotenv
dotenv.config();

// Database connection
connectDB();

const PORT =  process.env.PORT || 5000;

// server
app.listen(PORT,()=> {
    console.log(`Server is running on Port ${PORT}`)
});