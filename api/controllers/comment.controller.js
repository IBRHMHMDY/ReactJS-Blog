import { errorHandler } from "../utils/error.js";
import Comment from '../models/comment.model.js'

export const createComment = async(req,res,next)=>{

    try {
        const {userId, postId, comment} = req.body;
        if(userId !== req.user.id){
            return next(errorHandler(403, 'You are not allowed to add comment'))
        }
        const newComment = new Comment({userId,postId,comment});
        await newComment.save();
        res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
}

export const getCommentsPost = async(req,res,next)=>{
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({createdAt: -1})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}