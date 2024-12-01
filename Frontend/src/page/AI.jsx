import React, { useEffect, useState } from 'react'
import { Friends } from '../components/Friends'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import ChatArea from '../components/ChatArea'
import { Paperclip, Copy } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';


const AI = () => {
    const { isLogout, logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();

    const navigate = useNavigate();
    const [profile, setProfile] = useState(true)
    const [isResponse, setIsResponse] = useState(true)
    const [status, setStatus] = useState(true)
    const [setIMage, setSetIMage] = useState(null)
    const [load, setLoad] = useState(false)
    const [promts, setPromts] = useState("")
    const [promtsUser, setPromtsUser] = useState("")
    const [aiRes, setAiRes] = useState("")


    const DpUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Image = reader.result;
            setSetIMage(base64Image);
            console.log(base64Image)
        }
    }

    const profileSave = async () => {
        await updateProfile({ profilePic: setIMage });
    }
    // ai function

    const ai = async () => {
        setPromtsUser(promts)
        setIsResponse(false)
        setAiRes("")
        setPromts("")
        const genAI = new GoogleGenerativeAI("AIzaSyDWmldts9nJ3o9g2jPxVx770plD0cKdKkk");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = promts;
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        const res = result.response.text();
        setAiRes(res.replace(/\*\*(.*?)\*\*/g, "<b style='color: white; font-weight: bold;'><br>$1</b>").replace(/\*(.*?)\*/g, "<i style='color: green;'>$1</i>").replace(/"(.*?)"/g, "<span style=''>$1</span>").replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/<b>/g, "<br><b>").replace(/<i>/g, "<br><i>"));
    }

    return (
        <div className='w-[100%] h-screen bg-zinc-300 flex  overflow-hidden ' onClick={() => setProfile(true)}>
            <div className="w-5 -rotate-45 h-44 bg-zinc-500 bg-opacity-60 blur-lg  absolute top-20 left-0 z-0"></div>
            <div className="w-20 -rotate-45 h-44 bg-zinc-500 bg-opacity-10 blur-lg  absolute top-[50%] left-0 "></div>
            <div className="w-20 -rotate-45 h-44 bg-zinc-400 bg-opacity-10 blur-lg  absolute top-[80%] left-0 "></div>
            <div className="w-14 h-full max-[800px]:max-w-96 max-[800px]:hidden   bg-black border-r-2 border-zinc-900 flex flex-col pt-24 items-center justify-between pb-5 max-[800px]:flex-row max-[800px]:fixed max-[800px]:bg-zinc-900 max-[800px]:bottom-5 max-[800px]:right-0 max-[800px]:rounded-xl max-[800px]:left-0 max-[800px]:z-50 max-[800px]:h-14   max-[800px]:py-5 max-[800px]:px-3 max-[800px]:w-[90%] max-[800px]:mx-auto max-[800px]:border-[1px] max-[800px]:overflow-hidden">
                <div className="w-10 h-10 bg-white bg-opacity-40 absolute top-0 left-0 blur-2xl"></div>
                <div className="w-20 h-20 max-[800px]:hidden bg-red-500 bg-opacity-20 blur-xl absolute top-0 left-0"></div>
                <div className="flex flex-col gap-3 max-[800px]:flex-row max-[800px]:justify-between max-[800px]:w-full px-1">
                    <i className={`ri-chat-1-fill text-2xl   hover:bg-zinc-300 bg-transparent border-transparent text-zinc-600 cursor-pointer  border-[1px]  px-2 py-1 rounded-xl z-10`} onClick={() => navigate('/')}></i>
                    <i className={`ri-apps-2-ai-fill  ${!status ? "bg-white border-zinc-700 text-black" : "bg-transparent border-transparent text-zinc-600"} text-2xl text-zinc-600 hover:bg-zinc-300  hover:text-black cursor-pointer z-10   px-2 py-1 rounded-xl`} onClick={() => navigate('/story')}></i>
                    <i className="ri-translate-ai-2 text-2xl  bg-zinc-300 cursor-pointer text-black  px-2 py-1 rounded-xl " onClick={() => navigate('/ai')}></i>
                    <i className={`ri-settings-4-fill min-[800px]:hidden ${!profile ? "bg-zinc-300 text-black" : 'text-white'} text-2xl   hover:bg-zinc-300 hover:text-black  cursor-pointer  z-10  px-2 py-1 rounded-xl`} onClick={(e) => { setProfile(!profile); e.stopPropagation(); }}></i>
                    <hr className='max-[800px]:hidden' />
                </div>
                <i className={`ri-settings-4-fill max-[800px]:hidden  ${!profile ? "bg-zinc-300 text-black" : 'text-white'} text-2xl   hover:bg-zinc-300 hover:text-black  cursor-pointer  z-10  px-2 py-1 rounded-xl`} onClick={(e) => { navigate('/profile') }}></i>
            </div>



            <div className='w-full  bg-black h-screen relative flex flex-col justify-center items-center '>
              {isResponse ? <> <h1 className='text-[50px] max-[490px]:text-[40px] font-black bg-gradient-to-r from-blue-500  via-purple-500 to-red-500 bg-clip-text text-transparent relative'>Hello {authUser.fullname}  </h1>
                <p className='tracking-wide text-zinc-500 '>Ask me Anything</p></> :
                 <div className={`p-5 w-[90%] max-w-[800px] mx-auto max-[800px]:w-full  overflow-y-scroll scroll  grid  gap-5 scroll-smooth pb-40`}>

                    <div className={` ${promtsUser ? "flex" : "hidden"} inline-block  px-6 rounded-xl break-words whitespace-normal  py-[6px]  place-self-end bg-zinc-900 border-[1px] border-zinc-800 text-zinc-300 rounded-br-none relative min-w-16 max-w-[50%] `}>{promtsUser}</div>

                    <div className={`inline-block ${!isResponse ? "flex" : "hidden"}  px-6 rounded-xl break-words whitespace-normal  py-[14px]  place-self-start bg-zinc-900 border-[1px] border-zinc-800 text-white tracking-wide rounded-bl-none relative min-w-16   max-w-[50%]`}>
                        <div class="spinner flex flex-row gap-2">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>

                        <span className='absolute -bottom-7 text-[12px] tracking-wider bg-gradient-to-r from-blue-500  via-purple-500 to-red-500 bg-clip-text text-transparent opacity-80 font-semibold left-0'>Generated by Ai   </span>
                    </div>

                    <div id="data" className={`inline-block space-y-2  ${aiRes ? "flex" : "hidden"} px-6 rounded-xl break-words whitespace-normal  py-[14px]  place-self-start bg-zinc-900 border-[1px] border-zinc-800 text-zinc-100  tracking-wider rounded-bl-none relative min-w-16   font-light`}>
                        <div dangerouslySetInnerHTML={{ __html: aiRes }}></div>
                        <span className='absolute -bottom-7 text-[12px] tracking-wider bg-gradient-to-r from-blue-500  via-purple-500 to-red-500 bg-clip-text text-transparent opacity-80 font-semibold left-0'>Generated by Ai </span>
                    </div>

                </div> }
                {!load ? <div className="w-[70%] h-40 rounded-full blur-[100px] opacity-40 max-[800px]:w-[90%] bg-zinc-500 absolute -bottom-20 z-20"></div> : null}
                <div className="w-full max-w-[600px]  max-[800px]:w-full  absolute  bottom-5 flex justify-center items-center sendmsg flex-col z-50">

                    <div className={`w-[90%] ${load ? "button" : null} bg-black py-2  text-white bg-opacity-50 border-[1px] border-zinc-800 rounded-xl flex shadow-2xl items-end backdrop-blur-lg relative  sendmsg justify-end`}>
                        <label htmlFor="image">
                            <Paperclip className="ri-gallery-view-2 px-2 ml-2 rounded-lg cursor-pointer hover:bg-zinc-800 animate-none size-8" /></label><textarea value={promts} onChange={(e) => setPromts(e.target.value)} type="text" className='w-full  outline-none bg-transparent px-2 z-10 resize-none h-auto scroll-smooth sendmsg appearance-none mb-1 max-h-60' rows={1} placeholder='Message....' onFocus={() => setLoad(true)} onBlur={() => setLoad(false)}   ></textarea> <button onClick={() => ai()} > <i className="ri-arrow-up-circle-fill text-2xl text-zinc-100  cursor-pointer px-4"></i></button>
                    </div>
                </div>
            </div>






        </div>
    )
}

export default AI