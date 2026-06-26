/*
Campos:
    userId,
    date,
    reason,
    status
*/

import mongoose, { Schema, model, } from "mongoose";

const dateSchema = new Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    date:{
        type: Date
    },
    reason:{
        type: String
    },
    status:{
        type: String
    }
})

export default model("Date", dateSchema)