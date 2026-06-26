import nodemailer from "nodemailer" 
import crypto from "crypto" 
import jsonwebtoken from "jsonwebtoken" 
import bcryptjs from "bcryptjs" 

import userModel from "../models/userEmployee.js"

import {config} from "../config.js"

const registrerUserEmployeeController = {};

registrerUserEmployeeController.registrer = async (req, res) => {
    try{
        const {
            name,
        email,
        password,
        phone,
        isVerified,
        loginAttempts,
        timeOut
        } = req.body

        const existUsersEmployee = await userModel.findOne({email})

        if(existUsersEmployee){
            return res.status(400).json({message: "Users already exists"})
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const newUsers = new userModel({
            name,
            email,
            password: passwordHash,
            phone,
            isVerified,
            loginAttempts,
            timeOut
        })

        await newUsers.save();

        const verificationCode = crypto.randomBytes(3).toString("hex")

    const tokenCode = jsonwebtoken.sign(
    {email, verificationCode},
    config.JWT.secret,
    {expiresIn: "15m"}
    )

    res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email.user_email,
        pass: config.email.user_password
    }
})

    const mailOptions = {
    from: config.email.user_email,
    to: email,
    subject: "Verification code",
    text: "para verificar tu cuenta, utiliza el siguiente codigo: " + verificationCode + " Expira en 15 minutos"
}

transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        console.log(error)
        return res.status(500).json({message: "Error"})
    }
    res.status(200).json({message: "Email send"})
})

    }catch(error) {
        console.error("error" + error)
    return res.status(500).json({message: "Internal server error"})
    }
}

registrerUserEmployeeController.verifyCode = async (req, res) => {
    try{

        const {verificationCode} = req.body

        const token = req.cookies.verificationTokenCookie

        const decoced = jsonwebtoken.verify(token, config.JWT.secret)
            const {email, verificationCode: storedCode} = decoced

        if(verificationCode !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const employees = await userModel.findOne({email})
            employees.isVerified = true
            await employees.save()
    
            res.clearCookie("verificationTokenCookie")
            res.json({message: "Email verified successfully"})


    }catch(error){
        console.error("error" + error)
    return res.status(500).json({message: "Internal server error"})
    }
}


export default registrerUserEmployeeController
