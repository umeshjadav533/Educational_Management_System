import express from "express";
import { register, loginUser, logout, getUser, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import multer from 'multer';
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);
router.get('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated,  getUser);
router.post('/password/forgot', forgotPassword);
router.post('/password/reset/:token', resetPassword);

export default router;
