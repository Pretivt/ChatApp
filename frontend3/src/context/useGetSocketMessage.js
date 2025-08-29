

import { useEffect } from 'react';
import useConversation from '../zustand/useConversation.js';
import sound from "../assets/notification.wav";
import { useSocketContext } from './SocketContext.jsx';

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      setMessage([...messages, newMessage]);

     
      const notification = new Audio(sound);
      notification.play();
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, setMessage]);
};

export default useGetSocketMessage;
