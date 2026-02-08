import { ErrorHandler } from '../middlewares/error.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import generateToken from '../utils/generateToken.js';
import User from '../models/user.model.js'

// REGISTER USER
export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body || {};
    if(!name || !email || !password || !role){
        return next(new ErrorHandler("Please Provide all required fields", 400));
    }
    let user = await User.findOne({ email });
    if(user){
        return next(new ErrorHandler("User already exists", 400));
    }
    user = new User({ name, email, password, role });
    await user.save();
    generateToken(user, 201, "User Registered Successfully", res);
});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password, role } = req.body || {};
    if(!email || !password || !role){
        return next(new ErrorHandler("Please Provide all required fields", 400));
    }
    const user = await User.findOne({email, role}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email, password or role", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email, password or role", 401))
    }
    generateToken(user, 200, "Logged In SuccessFully", res);
});

export const logout = asyncHandler(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Logged out successfully"
    })
});

export const getUser = asyncHandler(async (req, res, next) => {});

export const forgotPassword = asyncHandler(async (req, res, next) => {});

export const resetPassword = asyncHandler(async (req, res, next) => {});

