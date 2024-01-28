import express from 'express'
import { Signup, Login, signinWithGoogle } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/google', signinWithGoogle)

export default router;