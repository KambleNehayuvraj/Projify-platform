// routes/projectRoute.js - Fixed with absolute paths
import express from "express";
import { addProject,listProject,removeProject} from "../controllers/projectcontroller.js";
import multer from "multer";

const projectRouter = express.Router();

// Image storage engine with absolute path
const storage = multer.diskStorage({
    destination: "uploads/images",
    filename:(req, file, cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
});

const upload = multer({storage:storage})

projectRouter.post("/add",upload.single("image"),addProject)
projectRouter.get("/list",listProject)
projectRouter.post("/remove",removeProject);





export default projectRouter;