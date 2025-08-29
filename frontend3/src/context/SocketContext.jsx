
import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

// Correct context naming
const SocketContext = createContext(null);

export const useSocketContext=()=>{
  //return useContext(SocketContext)
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};




export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const[onlineUsers,setOnlineUsers] =useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:4002", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(newSocket);
      newSocket.on("getOnlineUsers",(users)=>{
            setOnlineUsers(users);
      });
return()=>newSocket.close();

      //return () => newSocket.disconnect(); // Cleanup on unmount
    } else{
      if(socket){
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket,onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// Optional: Export the context for use in other components
export default SocketContext;
