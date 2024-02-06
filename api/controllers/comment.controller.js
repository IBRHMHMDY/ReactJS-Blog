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

export const likeComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'Failed to like comment'));
        }
        if (!req.user || !req.user.id) {
            return next(errorHandler(401, 'Unauthorized'));
        }
        const userIndex = comment.likes?.indexOf(req.user?.id);

        if(userIndex === -1){
            comment.likes?.push(req.user?.id);
            comment.numberOfLikes +=1
        }else{
            comment.numberOfLikes -=1
            comment.likes?.splice(userIndex, 1);
        }
        await comment.save()
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

export const editComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'Failed to like comment'));
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to edit this comment'));
        }
        const editComment = await Comment.findByIdAndUpdate(req.params.commentId, {
            comment: req.body.comment,
        }, {new: true});

        res.status(200).json(editComment);
    } catch (error) {
        next(error)
    }
}


export const deleteComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'Failed to like comment'));
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to edit this comment'));
        }
        await Comment.findByIdAndDelete(req.params.commentId);

        res.status(200).json('Comment has been Deleted');
    } catch (error) {
        next(error)
    }
}

export const getComments = async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to get all comments'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortBy = req.query.order === 'asc' ? 1 : -1;
        const comments = await Comment.find()
        .sort({updatedAt: sortBy})
        .skip(startIndex)
        .limit(limit);
 
        const totalComments = await Comment.countDocuments();
 
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() -1, now.getDate());
 
        const lastMonthComments = await Comment.countDocuments({createdAt: {$gte: oneMonthAgo},});
 
        res.status(200).json({
         comments, totalComments, lastMonthComments,
        });
 
     } catch (error) {
         next(error)
     }
}




