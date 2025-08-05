// controllers/projectController.js - Enhanced with file verification
import projectModel from "../models/projectModel.js";
import fs from 'fs';

// Add project item
const addProject = async (req, res) => {
    console.log('req.file:', req.file);  // Add this line
    console.log('req.body:', req.body);
    if (!req.file) {
        return res.json({success:false,message:"No file uploaded"});
    }
    
    let image_filename = `${req.file.filename}`;

    const project = new projectModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await project.save();
        res.json({success:true,message:"Project Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all project list 
const listProject = async (req,res) => {
    try{
        const projects = await projectModel.find({});
        res.json({success:true,data:projects})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove projects 
const removeProject = async (req,res) => {
    try{
        const project = await projectModel.findById(req.body.id);
        fs.unlink(`uploads/images/${project.image}`,()=>{})

        await projectModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Project Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }

}

export {addProject,listProject,removeProject}