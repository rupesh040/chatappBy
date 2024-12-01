import React, { useRef, useState } from 'react'
import { motion } from "motion/react"
import { useChatStore } from '../store/useChatStore';
import {Loader} from 'lucide-react'
import toast from 'react-hot-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';



export const Comment = () => {
    const [comment , setComment] = useState(true);
    const [postComment , setPostComment] = useState("");
    const [compressedBase64 , setCompressedBase64] = useState("");
    const {sendPost , post , isPost} = useChatStore();
  const [Enhance , setEnhance] = useState(false)


console.log(post)

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



      const textareaRef = useRef(null)


      const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }





    const postHandle = async () => {
      if( compressedBase64 === " " || postComment === "" ) return toast.error('Please select post') ;
        await sendPost( { text:postComment , image:compressedBase64});
        setCompressedBase64("");
        setPostComment("");
    }

    const ai = async () => {
      setEnhance(true)
      const genAI = new GoogleGenerativeAI("AIzaSyDWmldts9nJ3o9g2jPxVx770plD0cKdKkk");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `${postComment} + " - format the text with better words only dont increate letters and words if prompt in hinglish so does not convert in hindi or any other language only enhance the words"`;

      const result = await model.generateContent(prompt);
      setEnhance(false)
      console.log(result.response.text());
      setPostComment(result.response.text().trim());
  }



  return (
    <motion.div   onClick={(e) => {setComment(false); }} className={` fixed ${comment ? "w-32 h-10   " :"w-96  h-96 max-[500px]:w-[90%] "} bottom-5 right-5 shadow-2xl rounded-3xl transition-all duration-300  flex justify-center items-center  cursor-pointer  bg-zinc-900 font-bold text-white border-[1px] border-zinc-800 origin-bottom overflow-hidden` }>
      <div className="w-1 h-5 bg-zinc-400 absolute top-1 left-2 blur-md -rotate-45 z-50"></div>
        {comment ?<h1 > +Post </h1> : 
        <div className="w-full p-5 h-full flex flex-col justify-between items-center">
            <div className="w-full ">
            {!compressedBase64 ?   <label htmlFor="image">
             <div className={`w-full ${comment ? "hidden scale-0" :"flex scale-100" } h-20 bg-blue-50 border-[1px] border-dashed border-zinc-500 font-normal cursor-pointer rounded-lg flex justify-center items-center text-black`}>
            Select Image
             </div>   <input type="file" onInput={handleInput} hidden id='image' onChange={(e) => handleImageUpload(e)} /></label> : 
             <img src={compressedBase64} className=' h-32 rounded-lg object-cover' alt="" />
             }
            <textarea type="text" placeholder='caption' rows={4} value={postComment} onChange={(e) => setPostComment(e.target.value)} className={`  ${comment ? " scale-0" :" scale-100" } ${Enhance ? "button" : ""}  w-full outline-none resize-none px-5 py-2 rounded-lg bg-zinc-900 text-sm font-normal border-[1px] border-zinc-800 z-0 my-3 `}></textarea>
          <div className=" flex flex-row gap-5">  {isPost ? 
             <button className='w-[48%] bg-white py-2 text-black rounded-full mt-1 flex justify-center items-center' ><Loader/></button> :
             <button className={` ${Enhance ? "" : ""} w-[48%] bg-black py-2 text-white  rounded-full mt-1 border-[1px] border-zinc-800 `}  onClick={() => {setEnhance(!Enhance); ai()} }  >{ !Enhance ? "Ai Caption" : "cancel"}</button> }
             <button onClick={() => postHandle()} className='w-[48%] bg-zinc-200  py-2 text-black rounded-full mt-1' >Post</button>
             </div> 
            </div>
            <h1 className={` ${comment ? " scale-0" :" scale-100" } transition-all duration-1000 justify-center items-center bg-zinc-700 px-5 py-1 rounded-full text-white `} onClick={(e) => {setComment(true); e.stopPropagation(); setEnhance(false); }}> Close</h1>
        </div>
        }
    </motion.div>
  )
}
