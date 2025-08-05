import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        console.log('🔐 Login attempt for:', email);
        
        // Validate input
        if (!email || !password) {
            console.log('❌ Missing email or password');
            return res.json({success: false, message: "Email and password are required"});
        }
        
        const user = await userModel.findOne({email});
        
        if (!user) {
            console.log('❌ User not found:', email);
            return res.json({success: false, message: "User doesn't exist"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            console.log('❌ Invalid password for:', email);
            return res.json({success: false, message: "Invalid credentials"});
        }
        
        const token = createToken(user._id);
        console.log('✅ Login successful for:', email);
        console.log('🔑 Token generated:', token ? 'YES' : 'NO');
        
        res.json({success: true, token});
        
    } catch(error) {
        console.error('🔥 Login error:', error);
        res.json({success: false, message: `Login error: ${error.message}`});
    }
}

const createToken = (id) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        
        const token = jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log('🔑 Token created successfully for user ID:', id);
        return token;
    } catch (error) {
        console.error('🔥 Token creation error:', error);
        throw error;
    }
}

//register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    
    try {
        console.log('📝 Registration attempt for:', email);
        console.log('📝 Request body:', { name: name ? 'PROVIDED' : 'MISSING', email, password: password ? `${password.length} chars` : 'MISSING' });
        
        // Validate input
        if (!name || !email || !password) {
            console.log('❌ Missing required fields');
            return res.json({success: false, message: "Name, email, and password are required"});
        }
        
        // checking if user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            console.log('❌ User already exists:', email);
            return res.json({success: false, message: "User already exists"});
        }
        
        // validating email format & strong password
        if (!validator.isEmail(email)) {
            console.log('❌ Invalid email format:', email);
            return res.json({success: false, message: "Please enter a valid email"});
        }
        
        if (password.length < 8) {
            console.log('❌ Password too short:', password.length);
            return res.json({success: false, message: "Please enter a strong password (minimum 8 characters)"});
        }
        
        // hashing user password
        console.log('🔒 Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('✅ Password hashed successfully');
        
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        
        console.log('💾 Saving user to database...');
        const user = await newUser.save();
        console.log('✅ User saved successfully with ID:', user._id);
        
        const token = createToken(user._id);
        console.log('✅ Registration successful for:', email);
        console.log('🔑 Token generated:', token ? 'YES' : 'NO');
        
        res.json({success: true, token});
        
    } catch (error) {
        console.error('🔥 Registration error:', error);
        console.error('🔥 Error stack:', error.stack);
        
        // Check for specific MongoDB errors
        if (error.code === 11000) {
            // Duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            return res.json({success: false, message: `${field} already exists`});
        }
        
        // Check for validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.json({success: false, message: messages.join(', ')});
        }
        
        res.json({success: false, message: `Registration error: ${error.message}`});
    }
}

export {loginUser, registerUser}