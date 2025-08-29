
import { create } from 'zustand'
import messages from '../home/Rightpart/Messages';

const useConversation = create((set) => ({
  selelctedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation} ),
  messages:[],
  setMessage: (newMessageArray)=> set({ messages: newMessageArray}),
}));
export default useConversation;
