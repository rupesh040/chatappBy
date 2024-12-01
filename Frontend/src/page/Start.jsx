import React, { useState } from 'react'
import Auth from '../components/Auth'

const Start = () => {
    const[show,setShow] = useState(false)
    const[auth,setAuth] = useState(true)
  return (auth? <>
    <div className='w-[100vw] h-[100vh] flex justify-center items-center flex-col overflow-hidden bg-white'>
        <h1 className='absolute z-[1] font-bold top-0 text-center text-[300px] text-zinc-400 name max-[1080px]:text-[250px] max-[900px]:text-[200px] max-[900px]:top-10 max-[780px]:text-[150px] max-[780px]:top-20 max-[680px]:text-[100px] overflow-hidden '> <span className='txtname'> Rup</span><span className='txtname2'>esh.</span> </h1>

        {/* Iphone  */}
        <div className={` w-[300px] h-[555px] rounded-[50px] bg-black flex justify-center items-center iphone ${show?"LoginIphone":""} z-[2]`}>
          <div className={`${show?"bg-[#f4f4f4]":""}  w-[280px] h-[535px] rounded-[40px] bg-[#f4f4f4] flex justify-center items-center relative `}>
            <div className={`${show?"z-10":" z-0"} absolute top-2 w-24 rounded-full h-6  bg-black  `}></div>
           <p className='font-bold text-[15px] text-white z-10 absolute top-14'> Monday June 8</p>
            <h1 className='font-bold text-[50px] text-white z-10 absolute top-16'> 09:41</h1>

           <div className={` ${show?"z-10 top-[-5%] left-[-20%]":" z-0"} absolute top-0 opacity-55 blur-[50px] w-full  h-20 bg-purple-500 rotate-[-40deg] `} ></div>
           <div className={`${show?"hidden":" z-0"} absolute top-32 left-5 opacity-25 blur-[60px] w-full  h-20 bg-blue-500 rotate-[-40deg]`}></div>
           </div>
           {/* messages  */}
           <div className={` absolute w-80 h-16 bg-white rounded-xl border-[1px] shadow-xl message2  flex-row items-center justify-start px-3 mt-20 ${show? "hidden" : "flex"}`}>
            <div className="w-10 h-10 bg-purple-400 rounded-full"></div>
            <p className='absolute top-2 right-5 text-[10px] text-zinc-400'>1min</p>
            <div className='flex flex-col pl-2'>
                <p className='font-bold text-black'>하이웹.</p>
                <p className='font-semibold text-zinc-500 text-[13px] '>That's so funny 🤣</p>
            </div>
           </div>
           {/* messages  */}
           <div className={` absolute w-80 h-16 bg-white rounded-xl border-[1px] shadow-xl mb-20 ${show? "hidden" : "flex"} flex-row items-center justify-start px-3 message1`}>
           <div className="w-10 h-10 bg-purple-400 rounded-full"></div>
            <p className='absolute top-2 right-5 text-[10px] text-zinc-400'>now</p>
            <div className='flex flex-col pl-2'>
                <p className='font-bold text-black'>Rupesh.</p>
                <p className='font-semibold text-zinc-500 text-[13px] '>That's so funny 🤣</p>
            </div>
           </div>
        </div>

         {/* iphone end */}

        <h1 className={` absolute bottom-40 z-10 text-3xl font-bold text text-center  max-[420px]:text-2xl ${show?"hidden":""} text-black`}>Lorem ipsum dolor sit amet.</h1>
        <h1 className={` absolute bottom-32 z-10 text-sm  text-zinc-500 text2 max-[420px]:bottom-[118px] max-[420px]:w-[70%] ${show?"hidden":""} max-[420px]:text-center`}> Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1>
       <h1 className={` ${show?"hidden":""} absolute bottom-16 z-10 bg-black w-80 py-3 rounded-lg text-white text-center font-semibold cursor-pointer text2 max-[420px]:bottom-12`} >Let's Chat</h1>
       <div className=" absolute bottom-0 w-full h-[40vh] overlay z-[5]"></div>
    </div></>:<> <Auth/> </>
  )
}

export default Start
