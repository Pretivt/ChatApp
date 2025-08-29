
import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);


  return (
    <div className='relative flex items-center h-[8%] justify-center gap-4 bg-gray-800'>
      <label htmlFor="my-drawer-2" className='btn btn-ghost drawer-button lg:hidden absolute left-5'>
        <div className='text-4xl text-white'>
          <CiMenuFries className='text-white text-xl' />
        </div>

      </label>

      <div className="flex items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
        {selectedConversation && (
          <div className="flex space-x-3 items-center">
            <div className="relative">
              <div className="w-16 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User Avatar"
                  className="rounded-full w-16 h-16 object-cover"
                />
              </div>
              {/* Online/Offline Badge */}
              <span
                className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                title={isOnline ? "Online" : "Offline"}
              ></span>
            </div>

            <div>
              <h1 className="text-xl text-white">{selectedConversation.fullname}</h1>
              <span className="text-sm text-gray-300">{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
        )}
      </div>
      </div>
      );
      
}

      export default Chatuser;
