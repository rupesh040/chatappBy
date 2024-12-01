import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import toast from 'react-hot-toast';



export const useChatStore = create((set, get) => ({
    messages: [],
    comment: [],
    post: [],
    postId: null,
    AImessages:[],
    users: [],
    selectedUser: null,
    toast:[],
    isPost: false,

    getUsers: async () => {
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data });
        }
        catch {

        }
    },
    getMessages: async (userId) => {
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data });
        }
        catch {

        }
    },
    getPost: async () => {
        try {
            const res = await axiosInstance.post(`/message/get`);
            set({ post: res.data });
        }
        catch {

        }
    },


    setToast: async (itemId) => {
        set((state) => ({
            toast:state.toast.filter((item) => item._id !== itemId),
        }))
    },


    setSelectedUser: async (selectedUser) => {
        set({ selectedUser })
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        }
        catch {

        }
    },
    sendPost: async (messageData) => {
        const {  post } = get();
        try {
            const res = await axiosInstance.post(`/message/save`, messageData);
            set({ post: [...post, res.data] });
            toast.success('Post Addes')
        }
        catch {

        }
    },
    sendPostComment: async (messageData) => {
        set({isPost:true});
        try {
            const {  comment } = get();
            if (!messageData) return;
            console.log( messageData)
            const res = await axiosInstance.post(`/message/comment`, messageData);
            set({ comment: [...comment, res.data] });
            set({isPost:false});
            toast.success("Commented successfully")
        }
        catch {
            set({isPost:false});
        }
        finally{
            set({isPost:false});
        }
    },
    sendPostLike: async (setlike) => {
        try {
            console.log( setlike)
            const res = await axiosInstance.post(`/message/like`, setlike);
            console.log(res);
        }
        catch {

        }
    },
    setPostComment: async (postId) => {
        set({ postId })
    },



    subscribeToMessage: (id) => {
        const { selectedUser } = get()        
        if (!selectedUser  ) return;
        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelecetedUSer = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelecetedUSer) return  set({ toast: [...get().toast, newMessage] });
            set({ messages: [...get().messages, newMessage] });
        })
    },

    unsubscribeFromMessage: () => { 
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
}))