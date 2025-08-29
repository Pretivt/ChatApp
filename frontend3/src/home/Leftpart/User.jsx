
import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4 px-6 py-3 cursor-pointer">
        {/* Avatar with Online Badge */}
        <div className="relative">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />

          {isOnline && (
            <span
              className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
              title="Online"
            ></span>
          )}
        </div>

        {/* User Info */}
        <div>
          <h1 className="font-bold text-white">{user.fullname}</h1>
          <span className="text-gray-300 text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;

