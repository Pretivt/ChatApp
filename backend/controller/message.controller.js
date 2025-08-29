
import Conversation from"../models/conversation.model.js";
import Message from "../models/messages.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";
import {io} from "../SocketIO/server.js"
export const sendMessage = async(req,res)=>{
    
    try{
    
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId =req.user._id;//current loggedi  user
        let conversation=await Conversation.findOne({
            members:{$all :[senderId,receiverId]}
        })
        if(!conversation){
            conversation =await Conversation.create({
                members:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        await Promise.all([conversation.save(),newMessage.save()]);
        //run parallely
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        
res.status(201).json(newMessage);

    }
    catch(error){
        console.log("Error in sendMessage",error)
        res.status(500).json({error :"internal server error"})
    }
};







export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] }
        }).populate("messages");

        if (!conversation) {
            return res.status(201).json([]);

            };

            // New conversation has no messages yet
            
        

        const messages = conversation.messages || [];
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessage", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
