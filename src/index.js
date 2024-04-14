import express from "express";
import "dotenv/config";
import cors from "cors"
import cookieParser from "cookie-parser"
import {connectToMongo} from "./DB/MongoConnection.js"
import userRouter from "./routes/userRoute.js"
// import bussinessRouter from "./routes/bussiness.js"
// import Loggs from "./models/loggs.js";


const app = express();
app.use(cors())
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const connectAndListen = async () => {
    try {
      await connectToMongo().catch(e=>{
        console.log(error)
      })
      app.on("error", (error) => {
        console.log(error.message);
      });
      app.listen(process.env.PORT, () => {
        console.log("listening at port :4000");
      });
    } catch (error) {
      console.log(
        console.log("Error while Listening to database"),
        error.message
      );
    }
  };

  connectAndListen()

  app.use("/user",userRouter)