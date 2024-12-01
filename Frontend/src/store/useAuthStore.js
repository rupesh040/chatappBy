import axios from "axios"
import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import {io} from "socket.io-client"
import toast from 'react-hot-toast';



export const useAuthStore = create((set, get) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    isLogout:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data})
            get().connectSocket();
        } catch (error) {
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async (data) => {
        set({isSigningUp:true});
        try {
           const res = await axiosInstance.post("/auth/signup", data)
            set ({authUser: res.data});
            get().connectSocket();
            if (res.data.success) {
                toast.success('Successfully signup!') 
                set({isSigningUp:false});
            } 
            
            
        } catch (error) {
            toast.error(error.response.data.message)
            set({authUser:null})
            set({isSigningUp:false});
        }
        finally{
            set({isSigningUp:false});
        }
    },
    login: async (data) => {
        try {
            set({isSigningUp:true});
           const res = await axiosInstance.post("/auth/login", data)
            set ({authUser: res.data});
            get().connectSocket();
            if (res.data.success) {
                toast.success(res.data.message) 
                set({isSigningUp:false});
            } 
        } catch (error) {
            set({isSigningUp:false});
            toast.error(error.response.data.message)
            set({authUser:null})
        }
        finally{
            set({isSigningUp:false});
        }
    },


    logout: async() => {
        set({isLogout:true})
        try {
            const res = await axiosInstance.post("/auth/logout")
            set({authUser:null})
            get().disconnectSocket();
            toast.success(res.data.message)
        } catch (error) {
            console.log("Internal server error")
            set({isLogout:false})
        }
        finally{
            set({isLogout:false});
        }
    },

    updateProfile: async(profilePic) => {
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.post("/auth/update-profile" , profilePic )
            if (res.data.success) {
                toast.success('Profile updated successfully')
                set({isUpdatingProfile:false})
            }
            set({isUpdatingProfile:false})
        } catch (error) {
            console.log(error)
            set({isUpdatingProfile:false})
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },


    connectSocket: () => {
        const {authUser} = get();
        if (!authUser || get().socket?.connected) return console.log("Internal server error");
        const socket = io("/" , {
          query:{
                userId:authUser._id,
            },
            withCredentials: true,
        }
        );
        socket.connect();
        set({socket:socket});
        socket.on("getOnlineUsers", (userIds) => {
                set({onlineUsers: userIds})
        })
    },
    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    },

}))