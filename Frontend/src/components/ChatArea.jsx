import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from '../store/useAuthStore';
import { Paperclip, X, Download, Pencil } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BookDashed } from 'lucide-react';

const ChatArea = () => {
    const { selectedUser, getMessages, messages, sendMessage, getUsers, setSelectedUser, users, subscribeToMessage, unsubscribeFromMessage, setToast , toast } = useChatStore()
    const { authUser, onlineUsers } = useAuthStore()
    const [viewImage, setViewImage] = useState("");
    const [chat, setChat] = useState("");
    const [image, setImage] = useState("");
    const [aiON, setAiON] = useState(false);
    const [DP, setDP] = useState(true);
    
    const [compressedBase64, setCompressedBase64] = useState(null);

    const [dp, setDp] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        setDP(true)
        getMessages(id);
        subscribeToMessage(id);
        getUsers();
        return () => unsubscribeFromMessage();
    }, [id, getMessages, unsubscribeFromMessage, subscribeToMessage, setSelectedUser, selectedUser])

    const paramsId = async () => {
        if (selectedUser) return;
        const user = await users.find(user => user._id === id);
        setSelectedUser(user)
        subscribeToMessage(id);
    }
    const textareaRef = useRef(null)

    useEffect(() => {
        const messages = document.querySelector(".scrollBottom")
        if (messages) {
            messages.scrollTop = messages.scrollHeight
        }
        const toastId =  toast.filter(item => item.senderId === selectedUser._id).map(item => setToast(item._id) );
    }, [messages])

    console.log(selectedUser)

    const handleSendMessgae = async (e) => {
        e.preventDefault();
        if (compressedBase64 === "" && chat === "") {
            return alert("dfh");
        }
        sendMessage({ text: chat, image: compressedBase64 })
        setChat("")
        setCompressedBase64("")
        console.log(image)
    }


    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        })
    }


    // ai section 

    const ai = async () => {
        setAiON(true)
        const genAI = new GoogleGenerativeAI("AIzaSyDWmldts9nJ3o9g2jPxVx770plD0cKdKkk");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `${chat} + " - format the text with better words only dont increate letters and words if prompt in hinglish so does not convert in hindi or any other language only enhance the words"`;

        const result = await model.generateContent(prompt);
        setAiON(false)
        console.log(result.response.text());
        setChat(result.response.text().trim());
    }







    // for image only




    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        compressAndConvertToBase64(file);
      }
    };
  
  
  
    const compressAndConvertToBase64 = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          const maxWidth = 800; // Max width of the compressed image
          const maxHeight = 800; // Max height of the compressed image
          let width = img.width;
          let height = img.height;
  
          // Maintain aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert compressed image to Base64
          const base64 = canvas.toDataURL("image/jpeg", 0.7); // 70% quality
          setCompressedBase64(base64);
        };
      };
    };
  
  
    console.log(compressedBase64)







    return (
        <div className='w-[70%] max-[800px]:w-full bg-black h-screen relative ' onClick={() => {setDP(true); paramsId();}}>
            <div className="w-full h-14 bg-black  flex flex-row items-center px-5 gap-2 z-30  border-b-[1px] border-zinc-800 justify-between" >
                <div className="flex gap-2 items-center relative">
                    {users.filter((item) => item._id === id).map((items) => <div className=" flex flex-row gap-2" key={items._id}>  <img src={items.profilePic} className="w-10 h-10 object-cover rounded-full bg-red-300 cursor-pointer z-20 mt-1" onClick={(e) => { setDP(false); e.stopPropagation(); }} />  <h1 className='text-white translate-y-1 text-lg flex flex-col' >{items.fullname}
                        <span className={`${onlineUsers.includes(items._id) ? "text-green-500" : "text-zinc-500"} -translate-y-2 text-sm`}>{onlineUsers.includes(items._id) ? "online" : "offline"}</span>
                    </h1>
                        {items.profilePic ? <>
                            <div className={`w-[300px]  max-[450px]:w-[250px]  bg-white absolute blur-md z-50 overflow-hidden  ${DP ? "scale-0 -top-24 max-[450px]:-top-16 max-[450px]:-left-28 -left-32" : " scale-100 top-[110%] left-10"}  rounded-xl shadow-2xl transition-all duration-300`}>
                                <img src={items.profilePic} className='w-full' alt="" />
                            </div>
                            <div className={`w-[300px]  max-[450px]:w-[250px]  bg-white absolute z-50  overflow-hidden  ${DP ? "scale-0 -top-24 max-[450px]:-top-16 max-[450px]:-left-28 -left-32" : " scale-100 top-full left-10"}  rounded-xl shadow-2xl transition-all duration-300`}>
                                <img src={items.profilePic} className='w-full' alt="" />
                            </div> </>
                            : null }

                    </div>)}

                </div>
                <i className="ri-gallery-view-2  cursor-pointer hover:text-black text-white py-1 px-2 rounded-lg text-sm hover:bg-white "></i>


            </div>

            <div className="w-full h-full   flex flex-col overflow-y-scroll scroll relative bg-[#18181b] scrollBottom scroll-smooth ">
                <div className="p-5 w-[90%] mx-auto max-[800px]:w-full    grid  gap-10 scroll-smooth pb-40" >
                    {messages.map((item, index) => <>
                        {item.text && (<div className={`inline-block  px-6 rounded-2xl break-words whitespace-normal  py-[6px]    max-w-[50%] ${item.senderId === authUser._id ? "place-self-end bg-[#26292e] text-white rounded-br-none" : "place-self-start bg-zinc-300 rounded-bl-none text-black border-[1px] border-white"}   relative min-w-16`} key={item._id}  >{item.text} <span className={`text-[10px] tracking-wider ${item.senderId === authUser._id ? "right-0" : "left-0"} absolute -bottom-5  text-zinc-500  text-nowrap `}>{formatTime(item.createdAt)}</span>  </div>)}
                        {item.image && (<div  className={`inline-block w-60 rounded-2xl break-words whitespace-normal   max-w-[50%] ${item.senderId === authUser._id ? "place-self-end  text-white rounded-br-none" : "place-self-start  rounded-bl-none text-black "}   relative min-w-16`} key={item._id} > <img src={item.image} onClick={() => { setViewImage(item.image); setDp(true) }} alt="" className='rounded-2xl cursor-pointer' /> <span className={`text-[10px] tracking-wider ${item.senderId === authUser._id ? "right-0" : "left-0"} absolute -bottom-5  text-zinc-500  `}>{formatTime(item.createdAt)}</span>  </div>)}
                    </>
                    )}   </div>
                <div className="w-[70%] max-[800px]:w-full  fixed bottom-4 right-0 flex justify-center items-center sendmsg flex-col">
                    <div className={`${compressedBase64 ? "flex" : "hidden"} max-w-[80%] h-[500px] flex-col justify-end items-end `}>
                        <X className='animate-none mb-1 bg-white rounded-full px-2 size-8 text-black  cursor-pointer' onClick={() => setCompressedBase64("")} />
                        <img src={compressedBase64} className=' border-2 mb-2 rounded-xl max-h-[80%]' alt="" /></div>
                    <form onSubmit={handleSendMessgae} className={`${aiON ? "button" : null} w-[90%] bg-black py-2  text-white bg-opacity-50 border-[1px] border-zinc-800 rounded-xl flex shadow-2xl items-end backdrop-blur-lg relative overflow-hidden sendmsg justify-end `} >
                        <label htmlFor="image">
                            <Paperclip className="ri-gallery-view-2 px-2 ml-2 rounded-lg cursor-pointer hover:bg-zinc-800 animate-none size-8" /> <input id='image' onChange={(e) => handleImageUpload(e)} type="file" className='hidden' /></label><textarea ref={textareaRef}  onInput={handleInput} type="text" className='w-full  outline-none bg-transparent px-2 z-10 resize-none h-auto scroll-smooth sendmsg appearance-none mb-1 max-h-60' rows={1} placeholder='Message....' value={chat} onChange={(e) => setChat(e.target.value)}  ></textarea> <span className='hover:bg-zinc-800 cursor-pointer text-purple-500 px-2 py-1 font-black rounded-md' onClick={ai}>Ai</span> <button type='submit'> <i className="ri-arrow-up-circle-fill text-2xl text-zinc-100  cursor-pointer px-4"></i></button>
                    </form>
                </div>

                {dp ?
                    <div className="fixed top-0 left-0 z-30 bg-opacity-5 backdrop-blur-[4px] w-full h-full bg-black flex justify-center items-center" onClick={() => setDp(false)}>
                        <img onClick={(e) => e.stopPropagation()} src={viewImage} className="max-w-[90%]  max-h-[90%] rounded-xl bg-white absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] border-8 border-zinc-800 " />
                        <div className="bg-white border-[1px] border-zinc-800  rounded-full absolute bottom-5 right-10  px-3 py-2 flex flex-row gap-2" onClick={(e) => e.stopPropagation()}>
                            <a href={viewImage} download={viewImage}>
                                <Download className='animate-none text-black cursor-pointer hover:bg-zinc-300 rounded-full px-2 size-9' /></a>
                            <X className='animate-none text-zinc-800 cursor-pointer hover:bg-zinc-300 rounded-full px-2 size-9' onClick={() => setDp(false)} />
                        </div>
                    </div> : null}
            </div>

        </div>
    )
}

export default ChatArea