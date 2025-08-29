import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage';

function Typesend() {
  const [message,setMessage]=useState("")
  const {loading,sendMessages}=useSendMessage();
  const handleSubmit=async(e)=>{
    //console.log("targetValue",e.target.value)
    e.preventDefault();
    try{
    
    await sendMessages(message);
    setMessage("");
    }catch(error){
      console.log("error sending message",error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex space-x-1 h-[8vh]  bg-gray-800'>
    <div className='w-[70%]  mx-4'>
      <input type="text" placeholder="Type here"
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
      className="border border-gray-700 w-full mt-1 outline-none px-4 py-3 rounded-xl" />
    </div>
    <button>
    <IoSend className='text-3xl' />
    </button>
    </div>

    </form>
  )
}

export default Typesend
