import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: []
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
}, {timestamps: true});

const comment = mongoose.model('comments', commentSchema);

export default comment;


