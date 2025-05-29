import mongoose from "mongoose";


const adminSchema = mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})


export const Admin = mongoose.model("Admin",adminSchema);