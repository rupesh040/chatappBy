import React from 'react'

const AddStory = ({close}) => {
  return (
    <div className='w-full  h-screen  border-r-[1px] border-zinc-800 flex flex-col  overflow-y-scroll scroll px-2 bg-black relative p-5'>
      <div className="w-20 h-1 bg-purple-500 absolute top-0 left-0 rounded-full "></div>
      <div className="w-20 h-1 bg-purple-500 absolute top-[6px] left-0 rounded-full blur-sm "></div>
      <div className="w-20 h-2 bg-purple-500 absolute top-[7px] left-0 rounded-full blur-md "></div>
      <div className="w-20 h-5 bg-purple-500 absolute top-[8px] left-0 rounded-full blur-xl "></div>
      
      <h1 className='text-3xl font-black bg-gradient-to-r from-purple-500  to-zinc-900-500 bg-clip-text text-transparent'>Share Your Story</h1>
      
      <div className="w-full h-96 bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-hidden mt-5 rounded-xl shadow-lg border-[1px] border-zinc-800 relative">
        <textarea 
          className='w-full h-full p-5 bg-transparent outline-none text-lg text-zinc-300 font-medium tracking-wide placeholder-zinc-600 focus:placeholder-zinc-700 transition-all duration-300'
          placeholder='Write your inspiring quote here...'
          maxLength={500}
        ></textarea>
        
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <span className="text-zinc-600 text-sm">Add some inspiration to the world</span>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center gap-2">
            <i className="ri-send-plane-fill"></i>
            Share Story
          </button>
        </div>
      </div>
      <button className='bg-zinc-800 mt-5 py-2 min-[800px]:hidden' onClick={close}>close</button>
      </div>
  )
}

export default AddStory