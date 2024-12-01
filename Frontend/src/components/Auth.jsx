import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import {EyeOff , EyeIcon} from "lucide-react"
import { useAuthStore } from '../store/useAuthStore'



const Auth = () => {
  const {signup, login , isSigningUp} = useAuthStore();
  const [activeForm, setActiveForm] = useState('login');
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: ''
  });
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (activeForm === 'signup') {
      setLoading(true)
      signup(formData)
    } else if (activeForm === 'login') {
      setLoading(true)
      login(formData)
    } else if (activeForm === 'forgot') {
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-black via-[#101010] to-black relative overflow-hidden">
      <div className="relative max-w-md w-full mx-4 ">
        {/* Main Card */}
        <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden relative bg-opacity-60 backdrop-blur-xl border-[1px] border-zinc-500 border-opacity-30 ">
        <div className="w-10 h-[3px] rounded-full bg-blue-500 absolute top-0 left-10"></div>
        <div className="w-10 h-[3px] rounded-full bg-blue-500 absolute top-[2px] blur-sm left-10"></div>
          <div className="relative">
            {/* Blue Accent Top Bar */}
            <div className="h-60 w-40 bg-blue-900 absolute  -top-16 bg-opacity-20 left-4 blur-2xl -rotate-45"></div>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-600 z-0">
                  {activeForm === 'login' && 'Welcome Back'}
                  {activeForm === 'signup' && 'Create Account'}
                  {activeForm === 'forgot' && 'Reset Password'}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {activeForm === 'login' && "Don't have an account? "}
                  {activeForm === 'signup' && 'Already have an account? '}
                  <button
                    onClick={() => setActiveForm(activeForm === 'login' ? 'signup' : 'login')}
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    {activeForm === 'login' ? 'Sign up' : 'Log in'}
                  </button>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 text-red-500 rounded-xl text-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-3 bg-green-50 text-green-500 rounded-xl text-sm">
                    {success}
                  </div>
                )}

                <div className="space-y-4">
                  {activeForm === 'signup' && (
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.fullname}
                          onChange={(e) => setFormData({...formData, fullname:e.target.value})}
                          className="w-full bg-opacity-30 px-4 py-3 bg-zinc-950 outline-none border border-zinc-900 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                  )}

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email:e.target.value})}
                        className="w-full bg-opacity-30 px-4 py-3 bg-zinc-950 outline-none border border-zinc-900 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {activeForm !== 'forgot' && (
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={`${showPassword ? "password" : "text"}`}
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password:e.target.value})}
                          className="w-full bg-opacity-30 px-4 py-3 bg-zinc-950 outline-none border border-zinc-900 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all"
                          placeholder="Enter your password"
                        /> 
                        {showPassword ? <EyeOff className="size-5 animate-none absolute top-4 text-zinc-700 cursor-pointer right-5" onClick={() => setShowPassword(false)}/> 
                        :
                        <EyeIcon className="size-5 animate-none absolute top-4 text-zinc-700 cursor-pointer right-5" onClick={() => setShowPassword(true)}/>}
                      </div>
                    </div>
                  )}


                </div>

                {activeForm === 'login' && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-gray-600">Remember me</label>
                    </div>

                  </div>
                )}

                <button className="shiny-cta w-full font-bold flex justify-center items-center h-14  opacity-70"   type='submit'>
        {!isSigningUp ?      <>  {activeForm === 'login' && 'Sign In'}
                  {activeForm === 'signup' && 'Create Account'}</>   :
                  <div className="custom-loader"></div>}
                </button>

                {activeForm === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => setActiveForm('login')}
                    className="w-full py-3 px-4 bg-white border border-blue-500 rounded-xl text-blue-600 font-medium hover:bg-blue-50 transition-all duration-200"
                  >
                    Back to Login
                  </button>
                )}
              </form>

              {/* Social Login */}
              <h1 className='text-center py-2 translate-y-5 font-black tracking-wider text-zinc-800'>by Rupesh</h1>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth