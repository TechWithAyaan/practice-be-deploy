import jwt from "jsonwebtoken";
import User from "../models/Schema.js";

const updateUser = async (req, res) => {
        let token = req.headers.authorization;
if(!token) throw new Error("No token provided")
token = token.split(" ")[1]
const decoded = jwt.verify(token, process.env.JWT_SECRET)
if(!decoded) throw new Error("Invalid token")
const userId = decoded.id
const user = await User.findById(userId)
if(!user) throw new Error("User not found")
const {name,email,age} = req.body

user.name = name || user.name
user.email = email || user.email
user.age = age || user.age

await user.save()

res.status(200).json({
    status: true,
    message: "User updated successfully",
    data: user
})}





const deleteUser = async (req, res) => {
    try{
        let token = req.headers.authorization;
        if(!token) throw new Error("No token provided")
        token = token.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) throw new Error("Invalid token")
        const userId = decoded.id
        const user = await User.findById(userId)
        if(!user) throw new Error("User not found")
        await user.deleteOne()

        res.status(200).json({
            status: true,
            message: "User Deleted Successfully",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}
export { updateUser, deleteUser }