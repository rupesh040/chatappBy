import React, { useEffect, useState } from 'react'
import { Friends } from '../components/Friends'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import ChatArea from '../components/ChatArea'
import { useChatStore } from '../store/useChatStore'

const Profile = () => {
  const { isLogout, logout, authUser, selectedUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { setSelectedUser, subscribeToMessage , post, getPost} = useChatStore();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(true)
  const [edit, setEdit] = useState(true)
  const [status, setStatus] = useState(true)
  const [setIMage, setSetIMage] = useState(null)
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedBase64, setCompressedBase64] = useState(null);

  useEffect(() => {
    getPost()
  },[getPost])


  
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


  const profileSave = async () => {
    await updateProfile({ profilePic: compressedBase64 });
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



  return (
    <div className='w-[100%] h-screen bg-zinc-300 flex  overflow-hidden ' onClick={() => setProfile(true)}>
      <div className="w-5 -rotate-45 h-44 bg-zinc-500 bg-opacity-60 blur-lg  absolute top-20 left-0 z-0"></div>
      <div className="w-20 -rotate-45 h-44 bg-zinc-500 bg-opacity-10 blur-lg  absolute top-[50%] left-0 "></div>
      <div className="w-20 -rotate-45 h-44 bg-zinc-400 bg-opacity-10 blur-lg  absolute top-[80%] left-0 "></div>
      <div className="w-14 h-full max-[800px]:max-w-96  bg-black border-r-2 border-zinc-900 flex flex-col pt-24 items-center justify-between pb-5 max-[800px]:flex-row max-[800px]:fixed max-[800px]:bg-zinc-900 max-[800px]:bottom-5 max-[800px]:right-0 max-[800px]:rounded-xl max-[800px]:left-0 max-[800px]:z-50 max-[800px]:h-14   max-[800px]:py-5 max-[800px]:px-3 max-[800px]:w-[90%] max-[800px]:mx-auto max-[800px]:border-[1px] max-[800px]:overflow-hidden">
        <div className="w-10 h-10 bg-white bg-opacity-40 absolute top-0 left-0 blur-2xl"></div>
        <div className="w-20 h-20 max-[800px]:hidden bg-red-500 bg-opacity-20 blur-xl absolute top-0 left-0"></div>
        <div className="flex flex-col gap-3 max-[800px]:flex-row max-[800px]:justify-between max-[800px]:w-full">
          <i className={`ri-chat-1-fill text-2xl   hover:bg-zinc-300  bg-transparent border-transparent text-zinc-600 cursor-pointer  border-[1px]  px-2 py-1 rounded-xl z-10`} onClick={() => navigate('/')}></i>
          <i className={`ri-apps-2-ai-fill  ${!status ? "bg-white border-zinc-700 text-black" : "bg-transparent border-transparent text-zinc-600"} text-2xl text-zinc-600 hover:bg-zinc-300  hover:text-black cursor-pointer z-10   px-2 py-1 rounded-xl`} onClick={() => navigate('/story')}></i>
          <i className="ri-translate-ai-2 text-2xl text-zinc-600 hover:bg-zinc-300 cursor-pointer  hover:text-black  px-2 py-1 rounded-xl" onClick={() => { navigate('/ai'); setSelectedUser(authUser) }}></i>
          <i className={`ri-settings-4-fill min-[800px]:hidden bg-zinc-300 text-black text-2xl   hover:bg-zinc-300 hover:text-black  cursor-pointer  z-10  px-2 py-1 rounded-xl`} onClick={(e) => { setProfile(!profile); e.stopPropagation(); }}></i>
          <hr className='max-[800px]:hidden' />
        </div>
        <i className={`ri-settings-4-fill max-[800px]:hidden  bg-zinc-300 text-black text-2xl   hover:bg-zinc-300 hover:text-black  cursor-pointer  z-10  px-2 py-1 rounded-xl`} onClick={() => { navigate('/profile') }}></i>
      </div>

      <div className='w-full  bg-black h-screen relative flex flex-col py-5 gap-5 items-center'>
        <div className="w-[90%] py-5 bg-zinc-900 border-[1px] border-zinc-800 rounded-xl flex flex-col justify-center px-5 gap-5 ">
          <div className="flex flex-row items-center gap-5">
            <img src={compressedBase64 || authUser.profilePic} className="w-28 border-2 h-28 bg-purple-500 rounded-full" />
            <div className="">
              <h1 className='text-3xl font-semibold'>{authUser.fullname}</h1>
              <h1 className='text-lg tracking-wider'>{authUser.email}</h1>
              <h1 className='bg-gradient-to-r from-purple-500  via-blue-500 to-purple-500 font-bold tracking-wide bg-clip-text text-transparent'>Total Post: {post.filter((items)=>items.senderId === authUser._id).length}</h1>
            </div></div>
          <div className="flex flex-row gap-5">
          {!compressedBase64 ?
            <label className={` h-full bg-black py-1 px-4 rounded-lg border-[1px] border-zinc-800 cursor-pointer  flex gap-2`} > <i className="ri-edit-line text-zinc-200"></i>Edit Profile <input type="file" hidden onChange={(e) => handleImageUpload(e)} /></label> :
            <div className={`bg-green-800 text-white py-1 px-4 rounded-lg border-[1px] border-zinc-800  cursor-pointer flex flex-row gap-2`} onClick={() => profileSave()}>{isUpdatingProfile ? <svg viewBox="25 25 50 50">
              <circle r="20" cy="50" cx="50"></circle>
            </svg> : null}  save</div>}
            <h1 className='bg-black py-1 px-4 rounded-lg border-[1px] border-zinc-800 cursor-pointer text-red-500 flex flex-row gap-2' onClick={() => logout()}>  {isLogout ?
              <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg> : <i className="ri-logout-box-r-line text-red-500 "></i>} Logout</h1>
          </div>
        </div>
        <div className="w-[90%] h-screen py-5 bg-zinc-900 border-[1px] border-zinc-800 rounded-xl grid gridCard px-5 gap-5  overflow-y-scroll scroll">
          {post? [...post].reverse().filter(potsUser => potsUser.senderId === authUser._id ).map((item) => 
            <div className="  rounded-lg max-w-80 border-[1px] border-zinc-800 p-2 relative">
              <div className='px-5 bg-white bg-opacity-40 backdrop-blur-2xl  absolute text-black top-5 right-5 rounded-full flex justify-center items-center text-[12px]'>{formatTime(item.createdAt)}</div>
              <img src={item.image} className='rounded-lg ' alt="" />
              <h1>{item.text}</h1>
            </div>) :
            <div className=""></div>
            }

        </div>
      </div>
    </div>
  )
}

export default Profile