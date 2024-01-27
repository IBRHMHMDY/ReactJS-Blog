import express from 'express'
import { Signup, Login } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', Signup)
router.post('/login', Login)

export default router;