
import React, { useEffect, useState } from 'react';
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();

    useEffect(() => {
        console.log("selected conversation changes",selectedConversation);
        const getMessages = async () => {
            if (selectedConversation && selectedConversation._id) {
                setLoading(true);
                try {
                    const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
                    console.log("Response from backend", res.data);
                    console.log("updated message state:", messages)
                    setMessage(res.data);
                } catch (error) {
                    console.log("Error in getting messages", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        getMessages();

    }, [selectedConversation, setMessage]);

    return { loading, messages };
};

export default useGetMessage;
