import express from "express";
import { register, loginUser, logout, getUser, forgotPassword, resetPassword } from "../controllers/user.controller.js";
import multer from 'multer';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/me', getUser);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

export default router;
