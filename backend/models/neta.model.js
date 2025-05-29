import mongoose from 'mongoose';

const netaSchema = new mongoose.Schema({
    aadhar:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        index:true
     },
    
    neta:{
        type: String,
        required:true,
    },
    party:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String
    },
    electionType:{
       type: String,
       required:true,
    },
    age:{
        type:Number,
        required:true,
        min: 18,
        max: 100
    },
    gender:{
        type:String,
        required:true,
    }

})


const Neta = mongoose.model("Neta", netaSchema);


export {Neta}