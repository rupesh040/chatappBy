import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { X } from 'lucide-react';
import { motion } from "motion/react"
import toast from 'react-hot-toast';



const Toast = () => {
    const { toast , users ,setToast , setSelectedUser,selectedUser ,subscribeToMessage } = useChatStore();


    return (toast.length > 0 ? toast.map((item, index) => <>
        <motion.div  key={item._id} style={{
            top: `${index * 70 + 35}px`,
            transition:'top .3s ease'
        }} className={`fixed ${toast ? " scale-100 blur-0 animate-enter " : "-top-10 scale-0 blur-sm animate-leave"}  transition-all duration-300 left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90%] max-w-96 z-[9999]  rounded-xl bg-white flex flex-col px-3 justify-center gap-1 py-2`}>
            <div   onClick={() => {setToast(item._id); location.href=`/msg/${users.filter((user) => user._id === item.senderId).map((matchUser) => matchUser._id)}`; setSelectedUser(users.filter((user) => user._id === item.senderId).map((matchUser) => matchUser)); subscribeToMessage(); }} className="flex flex-row gap-1 items-center relative cursor-pointer">
                <div className="min-w-10 min-h-10 bg-black rounded-full"></div>
                <h1 className='text-black translate-y-0' >{users.filter((user) => user._id === item.senderId).map((matchUser) => matchUser.fullname)}
                    <p className='text-[12px] -translate-y-1 tracking-wide text-zinc-600'>{item.text}</p>
                </h1>
                <X className='animate-none absolute top-2 right-2 cursor-pointer text-black font-black' onClick={(e) => {setToast(item._id); e.stopPropagation()}}/>
            </div>
        </motion.div> 
        


        </>) : null
    )
}

export default Toast