import mongoose from "mongoose";


const comments = new mongoose.Schema({
    commentId: {type:String},
    comment: {type:String}
})


const like = new mongoose.Schema({
    likeId: {type:String}
})


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    likes:[like],
    commentUser:[comments],
    post:{
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }

);

const Messgae = mongoose.model("Message", messageSchema);
export default Messgae;
