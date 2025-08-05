import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Array, default: []}  // Changed from Object to Array
}, {
    minimize: false,
    timestamps: true  // Optional: adds createdAt and updatedAt
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;