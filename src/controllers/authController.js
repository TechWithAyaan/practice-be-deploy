import { errorResponse, successResponse } from "src/responseHandlers/responseHandler.js"
import User from "src/models/Schema.js";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken"
import { sendEmailOTP } from "src/utils/SendEmail.js";

const signup = async (req,res) =>{
try{
    const {name,email,password,age} = req.body

if(!name || !email || !password) throw new Error("Please provide all required fields")

    if(password.length < 8){
        throw new Error("Password must be at least 8 characters long")
    }
    if(age && (age < 8 || age > 120)){
        throw new Error("Age must be between 8 and 120")
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new Error("User already exists with this email")
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const otp = uuidv4().slice(0, 6) 

await sendEmailOTP(email,otp)

    const user = new User({...req.body, password: hashedPassword, otp})

    await user.save()

    return successResponse(201,"success","User created successfully",user,res)
}
catch(error){
    return errorResponse(500,"error",error.message,res)
}
}

const login = async (req,res) =>{
    try{
let token ;
const {email,password} = req.body
if(!email || !password) throw new Error("Please provide all required fields")

    const user = await User.findOne({email})
    if(!user){
        throw new Error("User not found with this email")
    }
    const ismatched = await bcrypt.compare(password,user.password)
    if(!ismatched){
        throw new Error("Invalid Credentials")
    }
const jwtToken = jwt.sign({id:user._id,name:user.name,age:user.age}, process.env.JWT_SECRET,{expiresIn:"1h"})

            return res.status(200).json({
                status : true,
                message : "user logged in sucessfully",
                data : user,
                token : jwtToken
            })
}
catch(error){
    return errorResponse(500,"error",error.message,res)
}
}

export { signup,login }