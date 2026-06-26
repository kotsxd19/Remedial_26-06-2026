/*
Campos: 
    name,
    email,
    password,
    phone,
    isVerified,
    loginAttempts,
    timeOut
*/

import { Schema, model, } from "mongoose";

const userEmployeesSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    isVerified:{
        type: Boolean
    },
    loginAttempts:{
        type: Number
    },
    timeOut:{
        type: Date
    }
},{
    timestamps: true,
    strict: false
})

export default model("Employee", userEmployeesSchema)

