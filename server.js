import app from "./Backend/app.js";
import dotenv from "dotenv";

dotenv.config({ path: './Backend/.env'});

const PORT =  process.env.PORT || 5000;

app.listen(PORT,()=> {
    console.log(`Server is running on Port ${PORT}`)
});