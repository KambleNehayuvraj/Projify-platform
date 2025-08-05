import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}, // Fixed: Number not number
    image: {type: String, required: true},
    category: {type: String, required: true},
})

const projectModel = mongoose.models.project || mongoose.model("project", projectSchema) // Fixed: model not Model

export default projectModel;