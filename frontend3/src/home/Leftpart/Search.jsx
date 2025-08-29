import React,{useState} from 'react'
import { FaSearch } from "react-icons/fa";
import useGetAllusers from"../../context/useGetAllUsers"
import useConversation from '../../zustand/useConversation';
import { all } from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Search() {
  const [search ,setSearch] = useState("");
  const [allUsers]=useGetAllusers();
  const {setSelectedConversation}=useConversation();
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!search)return;
    const conversation=allUsers.find((user)=>
      user.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    }
    else{
      toast.error("user not found");
    }
  }
  
  return (
    <div className="h-[10vh]">
    <div className='px-6 py-4'>
      <form onSubmit={handleSubmit}>
        <div className='flex space-x-3'>
      <label className="border-[1px] rounded-lg flex items-center bg-slate-900 gap-2  w-[80%] border-none  ">
  <input type="text" className="grow pl-4 text-lg shadow-slate-500 border-none bg-transparent"
   placeholder="Search" value={search}  onChange={(e)=> setSearch(e.target.value)}/>
  
</label>
<button>
<FaSearch className='text-5xl p-2  rounded-full duration-300' />
</button>
</div>
      </form>
    </div>
    </div>
  )
}

export default Search
