import express from"express";
import mongoose, { startSession } from "mongoose";
import dotenv from"dotenv";
import cors from "cors"
import cookieParser from"cookie-parser";
import path from"path";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app,server} from"./SocketIO/server.js";
dotenv.config();
//middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// // ......code for deployment
// if(process.env.NODE_ENV ==="production"){
//     const dirPath = path.resolve();

//     app.use(express.static("./fronted3/dist "));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(dirPath,"./frontend3/vite-project/index.html"));
//     })
// }



const PORT = process.env.PORT ||4002;
const URI= process.env.MongoDBURI;


try{
mongoose.connect(URI,{
    // useNewUrlParser: true,
    // useUnifiedTopology:true
    })
console.log("Connected to Mongodb")
}
catch(error){
console.log("Error:",error)
}
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute);
server.listen(PORT,()=>{
    console.log(`Example app is listening on port ${PORT}`)
})