import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    content: {
        type: String,
        length: 6000,
        required: true,
    },
    category: {
        type: String,
        default: "uncategorized",
    },
    image: {
        type: String,
        default: "https://static.spacecrafted.com/bdcb89ef153b4eb28ffa328995516fbe/i/ca7a4439ea4d401c905ff146f8ada118/1/GCuCv726gZycFxatRFZ6HA/placeholder.png"
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    }
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;