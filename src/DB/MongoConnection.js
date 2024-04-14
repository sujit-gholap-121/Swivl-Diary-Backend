import mongoose from "mongoose";

export async function connectToMongo(){
 try{
    console.log(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
    const instance=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`,{retryWrites:true,w:"majority"})
    console.log("MongoDB successfully conencted at: ",instance.connection.host)
    return instance
 }
 catch(e){
    console.log("Error connecting to the database",e.message)
 }
}

export default mongoose
