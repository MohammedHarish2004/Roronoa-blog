import express from 'express'
import {verifyToken} from '../utils/verifyToken.js'
import { createPost,getposts,deletePost,updatePost } from '../controllers/post.controller.js'

const router = express.Router()

router.post('/create',verifyToken,createPost)
router.get('/getposts',getposts)
router.delete('/delete/:postId/:userId',verifyToken,deletePost)
router.post('/update/:postId/:userId',verifyToken,updatePost)
export default router