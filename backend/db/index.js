import mongoose from "mongoose"


const connectDb = async () => {
    try {
         const connection =await  mongoose.connect(`mongodb+srv://EVMUSER:EVM%4012344@cluster0.sdbwaza.mongodb.net/EVM`)
         console.log("DB connected successfully")
    } catch (error) {
        console.error("ERR while connecting db",error)
        throw error;
    }
}


export default connectDb;

