import React from 'react';
import Message from './Message.jsx';
import Loading from"../../components/Loading.jsx";
import { useRef,useEffect } from 'react';
import useGetMessage from '../../context/useGetMessage.js';
import useGetSocketMessage from '../../context/useGetSocketMessage.js';
import { useSocketContext } from '../../context/SocketContext.jsx';

function Messages() {
  const { loading,messages }=useGetMessage();
  useGetSocketMessage();//listenung incoming messages
  console.log(messages);
  


  const lastMsgRef=useRef()
  useEffect(()=>{
    setTimeout(()=>{
if(lastMsgRef.current){
  lastMsgRef.current.scrollIntoView({behaviour:"smooth"})
}
    },100)
  },[messages])
  return (
    <div className=" flex-1 overflow-y-auto"
     style={{minHeight:"calc(92vh - 8vh)"}}>

      {loading ?(
        <Loading/>
        ):((messages.length) > 0 && messages.map((message)=>(
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message}/>
          </div>

      )))}

      {!loading && (!messages || messages.length === 0 )}{
      (
        <div>
          <p className='text-center mt-[20%] text-white '>
            Say! Hi to start the conversation</p>;
        </div>
        )
      }
      
      
      
     
    </div>
    
  );
}

export default Messages
