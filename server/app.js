import express from "express";
import cors from 'cors'
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import userRoutes from './routes/user.Routes.js'

config();
const app = express();

app.use(cors({
    origin: [process.env.FRONTED_URI],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

// user routes
app.use('/api/v1/auth',userRoutes);

export default app;