import mongoose from "mongoose";
const messageSchema=   new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        requires:true,
    },
    receiverId:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});
const Message =mongoose.model("message",messageSchema);
export default Message;