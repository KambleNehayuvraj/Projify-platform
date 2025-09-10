import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js" // Make sure this path is correct

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

// Add token verification route that your CartContext is looking for
userRouter.get("/verify", async (req, res) => {
    try {
        // Get token from header (your CartContext sends it as 'token' header)
        const token = req.headers.token || req.headers.authorization?.split(' ')[1];
        
        console.log('🔍 Token verification request received');
        console.log('📝 Token from header:', token ? token.substring(0, 20) + '...' : 'NO TOKEN');
        
        if (!token) {
            console.log('❌ No token provided in request');
            return res.status(401).json({ 
                success: false, 
                message: "No token provided" 
            });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token decoded successfully, user ID:', decoded.id);
        
        // Find the user in database (exclude password from response)
        const user = await userModel.findById(decoded.id).select('-password');
        
        if (!user) {
            console.log('❌ User not found for decoded ID:', decoded.id);
            return res.status(401).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        console.log('✅ Token verification successful for user:', user.email);
        res.json({ 
            success: true, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error("❌ Token verification error:", error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token format" 
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: "Token expired" 
            });
        } else {
            return res.status(500).json({ 
                success: false, 
                message: "Token verification failed" 
            });
        }
    }
});

export default userRouter;