import express from 'express'
import { updateUser ,deleteUser,getUsers,getUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/getusers',verifyToken,getUsers)
router.get('/:userId',getUser)
export default router