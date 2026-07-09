import express from "express";
import { updateUser,deleteUser } from "src/controllers/userController.js";

const userRoute = express.Router()

// userRoute.get("/", getUsers)
// userRoute.get("/:id", getUserById)
userRoute.put("/", updateUser)
userRoute.delete("/", deleteUser)
export default userRoute