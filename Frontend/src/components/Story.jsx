import React from 'react'

const Story = ({close}) => {
  return (
    <div className="w-[70%] max-[800px]:w-full bg-black h-screen relative flex flex-col justify-center items-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="w-96 max-[500px]:w-72 h-[70%] rounded-full bg-gradient-to-br from-purple-600 to-pink-600 blur-[120px] opacity-30 "></div>
      
      {/* Main card with slide animation */}
      <div className="w-96 max-[500px]:w-[90%] h-[70%] max-[500px]:h-[75%] overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-900/90 to-black backdrop-blur-lg border border-zinc-800/50 z-20 rounded-[2rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 max-[500px]:p-5 transition-all duration-500 ease-in-out transform hover:scale-[1.02] group">
        {/* Slide animation overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Author info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px] ">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuNw1fDzeYGH2BFi4ufuCv2EORvqxoEMDdoA&s" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Rupesh Kumar</h3>
            <p className="text-sm text-zinc-500">2 hours ago</p>
          </div>
        </div>

        {/* Quote content */}
        <div className="relative">
          <i className="ri-double-quotes-l text-4xl text-purple-500/30 absolute -left-4 -top-2"></i>
          <p className="text-2xl max-[500px]:text-xl font-serif text-white leading-relaxed mt-4 px-4">
            The only way to do great work is to love what you do.
          </p>
          <p className="text-lg text-purple-400 mt-4 px-4">- Steve Jobs</p>
        </div>

        {/* Decorative elements */}
        <div className="w-32 h-32 rounded-full bg-purple-500/10 blur-2xl absolute -top-10 -right-10"></div>
        <div className="w-32 h-32 rounded-full bg-pink-500/10 blur-2xl absolute -bottom-10 -left-10"></div>

        {/* Navigation and interaction buttons */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="group">
              <i className="ri-heart-fill text-2xl text-pink-500 group-hover:scale-125 transition-transform"></i>
            </button>
            <span className="text-zinc-400 text-sm">2.4K</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="group transition-transform hover:-translate-x-1" >
              <i className="ri-arrow-left-circle-fill text-2xl text-purple-500 group-hover:scale-110 transition-transform"></i>
            </button>
            <button className="group transition-transform hover:translate-x-1" >
              <i className="ri-arrow-right-circle-fill text-2xl text-purple-500 group-hover:scale-110 transition-transform"></i>
            </button>
          </div>
        </div>

        {/* Swipe indicators */}
        <div className="absolute top-1/2 -left-12 text-purple-500/50 text-4xl animate-bounceLeft max-[500px]:hidden">
          <i className="ri-arrow-left-line"></i>
        </div>
        <div className="absolute top-1/2 -right-12 text-purple-500/50 text-4xl animate-bounceRight max-[500px]:hidden">
          <i className="ri-arrow-right-line"></i>
        </div>
      </div>

      {/* Background cards for depth effect */}
      <div className="w-96 max-[500px]:w-[90%] h-[70%] max-[500px]:h-[80%] rotate-6 blur-[1px] overflow-hidden shadow-xl bg-gradient-to-br from-zinc-900/50 to-black border border-zinc-800/30 z-10 rounded-[2rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="w-96 max-[500px]:w-[90%] h-[70%] max-[500px]:h-[80%] rotate-12 blur-[2px] overflow-hidden shadow-xl bg-gradient-to-br from-zinc-900/30 to-black border border-zinc-800/20 z-0 rounded-[2rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Mobile add button */}
      <div className="w-20 h-10 bg-black absolute bottom-24 right-0 rounded-l-xl overflow-hidden flex justify-center items-center cursor-pointer font-bold text-purple-500 min-[800px]:hidden hover:w-24 transition-all duration-300" onClick={close}>
        Add
        <div className="w-[2px] h-full bg-purple-500 absolute top-0 right-0"></div>
        <div className="w-[2px] h-full bg-purple-500 absolute top-0 right-1 blur-sm"></div>
        <div className="w-[2px] h-full bg-purple-500 absolute top-0 right-3 blur-lg"></div>
        <div className="w-[2px] h-full bg-purple-500 absolute top-0 right-5 blur-xl"></div>
      </div>
    </div>

  )
}

export default Story