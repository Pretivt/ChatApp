
import React from 'react'
import useConversation from '../zustand/useConversation';
import { useState } from 'react';
import axios from 'axios';

function useSendMessage () {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();
    const sendMessages = async (message) => {
        setLoading(true);
        
            try {
                const res = await axios.post(`/api/message/send/${selectedConversation._id}`,{ message });
               // console.log("Response from frontend", res.data);
               // console.log("updated message state:", messages)
              // console.log("message is",res.data.newMessage.message)
                setMessage([     "message response",...messages,res.data]);
            } catch (error) {
                console.log("Error in getting messages", error);
            } 
                setLoading(false);
            
        };
    

  return {loading, sendMessages};
    }


  

export default useSendMessage



