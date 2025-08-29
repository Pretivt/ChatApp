import React from 'react';
import message from "./Messages.jsx"

function Message({ message }) {

  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  console.log("senderId", message.senderId);
  console.log("authId", authUser);


  //const itsMe=message.senderId === authUser.user._id;
  const itsMe = message.senderId === authUser.user._id;
  console.log("its me", itsMe)


  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "bg-gray-600"
  const createdAt = new Date(message.createdAt)
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
})
  return (
    <div className='p-4'>

      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>{message.message}</div>
        <div className='chat-footer'>{formattedTime}</div>
      </div>

    </div>
  );
}

export default Message;

