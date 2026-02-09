import bcrypt from 'bcrypt';
import mongoose, { mongo } from 'mongoose';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        maxLength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        select: false,
        minLength: [8, "Password must be at least 8 characters long"]
    },
    role: {
        type: String,
        default: "Student",
        enum: ["Student", "Teacher", "Admin"]
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    department: {
        type: String,
        trim: true,
        default: null
    },
    experties: {
        type: [String],
        default: []
    },
    maxStudents: {
        type: Number,
        default: 10,
        min: [1, "Students must be at least 1"]
    },
    assignStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        default: null
    }
}, { timestamps: true });

userSchema.methods.generateToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;

  return this.password = await bcrypt.hash(this.password, 11);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model("User", userSchema);
export default User;