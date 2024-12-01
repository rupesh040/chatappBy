import React, { useEffect, useState } from 'react'
import { Friends } from '../components/Friends'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import ChatArea from '../components/ChatArea'
import { useChatStore } from '../store/useChatStore'

const Home = () => {
  const { isLogout, logout, authUser, selectedUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const {setSelectedUser , subscribeToMessage} = useChatStore();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(true)
  const [edit, setEdit] = useState(true)
  const [status, setStatus] = useState(true)
  const [setIMage, setSetIMage] = useState(null)
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedBase64, setCompressedBase64] = useState(null);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalImage(file);
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















  // const DpUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload =  () => {
  //     const base64Image = reader.result;
  //     setSetIMage(base64Image);
  //     console.log(base64Image)
  //   }
  // }


  useEffect(() => {
    setSelectedUser(authUser);
    subscribeToMessage(authUser._id)
  },[])

  const profileSave = async () => {
    await updateProfile({ profilePic: compressedBase64 });
  }

  return (
    <div className='w-[100%] h-screen bg-zinc-300 flex  overflow-hidden ' onClick={() => setProfile(true)}>
      <div className="w-5 -rotate-45 h-44 bg-zinc-500 bg-opacity-60 blur-lg  absolute top-20 left-0 z-0"></div>
      <div className="w-20 -rotate-45 h-44 bg-zinc-500 bg-opacity-10 blur-lg  absolute top-[50%] left-0 "></div>
      <div className="w-20 -rotate-45 h-44 bg-zinc-400 bg-opacity-10 blur-lg  absolute top-[80%] left-0 "></div>
      <div className="w-14 h-full max-[800px]:max-w-96  bg-black border-r-2 border-zinc-900 flex flex-col pt-24 items-center justify-between pb-5 max-[800px]:flex-row max-[800px]:fixed max-[800px]:bg-zinc-900 max-[800px]:bottom-5 max-[800px]:right-0 max-[800px]:rounded-xl max-[800px]:left-0 max-[800px]:z-50 max-[800px]:h-14   max-[800px]:py-5 max-[800px]:px-3 max-[800px]:w-[90%] max-[800px]:mx-auto max-[800px]:border-[1px] max-[800px]:overflow-hidden">
        <div className="w-10 h-10 bg-white bg-opacity-40 absolute top-0 left-0 blur-2xl"></div>
        <div className="w-20 h-20 max-[800px]:hidden bg-red-500 bg-opacity-20 blur-xl absolute top-0 left-0"></div>
        <div className="flex flex-col gap-3 max-[800px]:flex-row max-[800px]:justify-between max-[800px]:w-full">
          <i className={`ri-chat-1-fill text-2xl   hover:bg-zinc-300  ${status ? "bg-white border-zinc-700 text-black" : "bg-transparent border-transparent text-zinc-600"} cursor-pointer  border-[1px]  px-2 py-1 rounded-xl z-10`} onClick={() => setStatus(true)}></i>
          <i className={`ri-apps-2-ai-fill  ${!status ? "bg-white border-zinc-700 text-black" : "bg-transparent border-transparent text-zinc-600"} text-2xl text-zinc-600 hover:bg-zinc-300  hover:text-black cursor-pointer z-10   px-2 py-1 rounded-xl`} onClick={() => navigate('/story')}></i>
          <i className="ri-translate-ai-2 text-2xl text-zinc-600 hover:bg-zinc-300 cursor-pointer  hover:text-black  px-2 py-1 rounded-xl" onClick={() => {navigate('/ai');  setSelectedUser(authUser)}}></i>
          <i className={`ri-settings-4-fill min-[800px]:hidden ${!profile ? "bg-zinc-300 text-black" : 'text-white'} text-2xl   hover:bg-zinc-300 hover:text-black  cursor-pointer  z-10  px-2 py-1 rounded-xl`} onClick={(e) => { navigate('/profile') }}></i>
          <hr className='max-[800px]:hidden' />
        </div>
        <i className={`ri-settings-4-fill max-[800px]:hidden  ${!profile ? "bg-zinc-300 text-black" : 'text-white'} text-2xl   hover:bg-zinc-300 hover:text-black  cursor-pointer  z-10  px-2 py-1 rounded-xl`} onClick={(e) => { navigate('/profile') }}></i>
      </div>
      <div className={`${!status ? "max-[800px]:hidden" : " "} w-[30%] max-[800px]:w-full `}>
        <Friends /></div>

        <div className='w-[70%] max-[800px]:hidden bg-black h-screen relative flex flex-col justify-center items-center'>
          <h1 className='text-5xl font-black text-zinc-800 capatilize'>Hi {authUser.fullname} </h1>
          <h1 className='font-black tracking-wide ml-52 text-[#c95719] opacity-50'>by Rupesh</h1>
        </div>

   

    </div>
  )
}

export default Home