import multer from "multer";

// Store file in memory (as buffer)
const storage = multer.memoryStorage();

export const upload = multer({storage});