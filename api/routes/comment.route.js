import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createComment, getCommentsPost, likeComment } from "../controllers/comment.controller.js";

const router = express.Router()

router.post('/create', verifyToken, createComment)
router.get('/getcomments/:postId', getCommentsPost)
router.put('/likeComment/:commentId', verifyToken, likeComment)
export default router;