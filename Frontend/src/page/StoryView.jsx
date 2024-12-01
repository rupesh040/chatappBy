import React, { useEffect, useState } from 'react'
import Story from '../components/Story'
import AddStory from '../components/AddStory'
import { useNavigate } from 'react-router-dom'
import { Friends } from '../components/Friends'
import Global from '../components/Global'
import { MessageCircle, Heart } from "lucide-react"
import { Comment } from '../components/Comment'
import {X} from "lucide-react"
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { motion } from "motion/react"

const StoryView = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(true)
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(true)
  const [heart, setHeart] = useState(false)
  const [status, setStatus] = useState(true)
  const [sendComment, setSendComment] = useState("")
  const [sendIDComment, setSendIDComment] = useState("")
  const {getPost , post , users ,setPostComment , sendPostComment , sendPostLike} = useChatStore();
  const {authUser} = useAuthStore();
  const [commentsLive, setCommentsLive] = useState({})
  const [likeLive, setLikeLive] = useState({})

  useEffect(() => {
    getPost()
  },[getPost])

  const close = () => {
    setStatus(!status)
  }

  const commentSend = async () => {
    if (sendComment === "") {
      return 
    }
    setCommentsLive([...commentsLive, {comment:sendComment,commentId:authUser._id }]);
    await sendPostComment({comment:sendComment,postId:sendIDComment });
    setSendComment("")
  }

  console.log(commentsLive)

const sendLike = async (id) => {
  await sendPostLike({setlike: id});
}

  return (
    <div className='w-[100%] h-screen bg-zinc-300 flex  overflow-hidden relative' onClick={() => setProfile(true)}>
      <div className="w-5 -rotate-45 h-44 bg-zinc-500 bg-opacity-60 blur-lg  absolute top-20 left-0 z-0"></div>
      <div className="w-20 -rotate-45 h-44 bg-zinc-500 bg-opacity-10 blur-lg  absolute top-[50%] left-0 "></div>
      <div className="w-20 -rotate-45 h-44 bg-zinc-400 bg-opacity-10 blur-lg  absolute top-[80%] left-0 "></div>
      <div className="w-14 h-full max-[800px]:max-w-96  bg-black border-r-2 border-zinc-900 flex flex-col pt-24 items-center justify-between pb-5 max-[800px]:flex-row max-[800px]:fixed max-[800px]:bg-zinc-900 max-[800px]:bottom-5 max-[800px]:right-0 max-[800px]:rounded-xl max-[800px]:left-0 max-[800px]:z-50 max-[800px]:h-14   max-[800px]:py-5 max-[800px]:px-3 max-[800px]:w-[90%] max-[800px]:mx-auto max-[800px]:border-[1px] max-[800px]:hidden">
        <div className="w-10 h-10 bg-white bg-opacity-40 absolute top-0 left-0 blur-2xl"></div>
        <div className="w-20 h-20 max-[800px]:hidden bg-red-500 bg-opacity-20 blur-xl absolute top-0 left-0"></div>
        <div className="flex flex-col gap-3 max-[800px]:flex-row max-[800px]:justify-between max-[800px]:w-full">
          <i className={`ri-chat-1-fill text-2xl   hover:bg-zinc-300   cursor-pointer  text-zinc-600 hover:text-black  px-2 py-1 rounded-xl z-10`} onClick={() => navigate('/')}></i>
          <i className={`ri-apps-2-ai-fill bg-white border-zinc-700 text-black text-2xl  hover:bg-zinc-300  hover:text-black cursor-pointer z-10   px-2 py-1 rounded-xl`}></i>
          <i className="ri-translate-ai-2 text-2xl text-zinc-600 hover:bg-zinc-300 cursor-pointer  hover:text-black  px-2 py-1 rounded-xl" onClick={() => navigate('/ai')}></i>
          <i className={`ri-settings-4-fill min-[800px]:hidden ${!profile ? "bg-zinc-300 text-black" : 'text-white'} text-2xl   hover:bg-zinc-300 hover:text-black  cursor-pointer  z-10  px-2 py-1 rounded-xl`} onClick={(e) => { setProfile(!profile); e.stopPropagation(); }}></i>
          <hr className='max-[800px]:hidden' />
        </div>
        <i className={`ri-settings-4-fill max-[800px]:hidden  ${!profile ? "bg-zinc-300 text-black" : 'text-white'} text-2xl   hover:bg-zinc-300 hover:text-black  cursor-pointer  z-10  px-2 py-1 rounded-xl`} onClick={(e) => { navigate('/profile') }}></i>
      </div>

      <div className="w-[30%] h-full bg-black max-[800px]:hidden  z-20">
        <Global />
      </div>
      <div className="w-[70%] h-full bg-black  max-[800px]:w-full overflow-y-scroll scroll z-20 p-5" >
       {post ? [...post].reverse().map((item) => <div key={item._id}>
        <div  className=" border-b-[1px] border-zinc-800 pb-5">
          <div className="flex flex-row items-center gap-2">
            <img src={authUser._id === item.senderId ? authUser.profilePic : users.filter((user) => user._id === item.senderId).map(item => {return item.profilePic})  } className="w-10 h-10 bg-white rounded-full "/>
            <h1 className='text-lg  font-semibold tracking-wide flex flex-col translate-y-1'>{authUser._id === item.senderId ? authUser.fullname : users.filter((user) => user._id === item.senderId).map(item => {return item.fullname})  } <span className='text-[12px] -translate-y-2 font-normal'>yahsdbu</span></h1>
          </div>
          <div className=' font-normal tracking-wide pl-12'>
            {item.text}
          </div>
          <div className="w-full  pl-12 mt-5 rounded-xl">
            <div className="  mt-5 relative"> <img onDoubleClick={() => {sendPostLike({setlike: item._id});}} src={item.image} alt=""  className='rounded-xl'/>
            <motion.i initial={{text:0}} animate={{text:300}}   className={`ri-heart-fill absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-red-700  ${heart ? "text-[300px]" : "text-[0px]" } `}></motion.i>
             </div>
            <div className=" w-full h-10 flex flex-row items-center px-5 gap-5">
              <span className='text-[12px] cursor-pointer flex flex-row items-center gap-1' onClick={() => {sendPostLike({setlike: item._id});   }} > <i className={`animate-none  text-xl ${item.likes.find((id) => id.likeId === authUser._id) ? " text-red-500 ri-heart-fill" :"text-white ri-heart-line"  }  `} ></i> {item.likes.filter((items)=>items).length} Likes</span>
              <div className='text-[12px] cursor-pointer flex flex-row items-center gap-1 list-none' onClick={() => {setSendIDComment(item._id); setCommentsLive(item.commentUser);  document.getElementById(`modal-${item._id}`).classList.replace('hidden','block')}}>  <MessageCircle className='animate-none size-5' /> {item.commentUser.filter((items)=>items).length}</div>
               
               
                <div className="w-96 max-[800px]:w-[98%] h-[500px]  z-20 bg-opacity-80 backdrop-blur-md rounded-3xl  border-[1px] border-zinc-700 p-5 bg-black fixed top-[50%] max-[800px]:top-[61%] max-[800px]:left-[50%] left-[65%] shadow-2xl translate-x-[-50%] translate-y-[-50%] hidden" id={`modal-${item._id}`}  >
               
                <div className="overflow-y-scroll scroll h-full pb-14 scroll-smooth">
                  <span className='px-3 font-bold text-lg py-1 bg-white text-black scale-75 rounded-full fixed top-3 right-4 cursor-pointer z-50' onClick={() => document.getElementById(`modal-${item._id}`).classList.replace('block','hidden')}>X</span>
                  {commentsLive.length > 0 ? [...commentsLive].reverse().map((items) => 
                  <div key={items._id}  className=" flex flex-row gap-1 min-h-10 mt-3 border-b-[1px] border-zinc-800">
                  <img src={authUser._id === items.commentId ? authUser.profilePic : users.filter((user) => user._id === items.commentId).map(connemtIMG => {return connemtIMG.profilePic}) } className='min-w-8 min-h-8 max-w-8 max-h-8 bg-black rounded-full' alt="" />
                    <div className="flex flex-col gap-1 -translate-y-1">
                      <h1 className='text-[15px] font-light flex flex-col tracking-widest text-zinc-100 '>Rupesh </h1>
                      <p className='-translate-y-2 text-[13px] text-zinc-300 tracking-wider'>{items.comment}</p>
                    </div>
                  </div> ) : null}
                  </div>
                
                  <div className="flex flex-row gap-1 fixed bottom-3 left-2 max-[800px]:w-[98%] w-[95%] bg-zinc-800 py-2 px-3 rounded-full border-[1px] border-zinc-700  ">
                    <input type="text" className='w-[90%] px-2 bg-transparent text-white outline-none' value={sendComment} onChange={(e) => setSendComment(e.target.value)} placeholder='comment.....' />
                    <button className='bg-zinc-600 px-3 py-1 rounded-full font-semibold text-white ' onClick={() => commentSend()}>send</button>
                  </div>

                </div>
            </div>
          </div>

        </div></div>) : null }
        <Comment/>
      </div>

    </div>
  )
}

export default StoryView









