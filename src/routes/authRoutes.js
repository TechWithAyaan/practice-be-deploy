import express from "express";
import { signup, login } from "../controllers/authController.js";

const authRoute = express.Router()

authRoute.post("/signup", signup) 
authRoute.post("/login", login) 

export default authRoute