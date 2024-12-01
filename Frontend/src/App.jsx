import react, { useEffect } from 'react'
import './App.css'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Start from './page/Start'
import Home from './page/Home'
import Message from './page/Message'
import Auth from './components/Auth'
import StoryView from './page/StoryView'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react"
import AI from './page/AI'
import Toast from './components/Toast'
import ImageShare from './page/ImageShare'
import  { Toaster } from 'react-hot-toast';
import Profile from './page/Profile'

function App() {
  const {authUser, checkAuth, isCheckingAuth , onlineUsers} = useAuthStore();
useEffect(()=>{
  checkAuth();
},[checkAuth]);

console.log(onlineUsers);

if (isCheckingAuth && !authUser) return (
  <div className="flex items-center justify-center h-screen bg-black">
    <Loader className="size-10 animate-spin"/>
  </div>
)


  return (
    <>
    <Toast/>
    <Toaster />
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/auth"/>} />
          <Route path="/msg/:id" element={authUser ? <Message /> : <Navigate to="/auth"/>} />
          <Route path="/auth" element={!authUser ? <Auth /> : <Navigate to="/"/>} />
          <Route path="/story" element={authUser ? <StoryView /> : <Navigate to="/auth"/>} />
          <Route path="/ai" element={authUser ? <AI /> : <Navigate to="/auth"/>} />
          <Route path="/Image" element={authUser ? <ImageShare /> : <Navigate to="/auth"/>} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/auth"/>} />
        </Routes>
    </>
  )
}

export default App
