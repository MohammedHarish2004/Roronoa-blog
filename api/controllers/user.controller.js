import User from "../models/user.model.js"
import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const updateUser = async (req,res,next)=>{

    if(req.user.id !== req.params.id) return next(errorHandler(201,'You can only update your own account'))

        try {
            
            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password,10)
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    avatar:req.body.avatar,
                }
            },{new:true})

            const {password:pass,...rest} = updatedUser._doc
            res.status(200).json(rest)
        } 
        catch (error) {
            next(error)
        }
}

export const deleteUser = async (req,res,next)=>{

    if(!req.user.isAdmin && req.user.id !== req.params.id) return next(errorHandler(201,'You can only delete your own account'))

        if(req.user.isAdmin){
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('User deleted')
        }
        try {
            
            await User.findByIdAndDelete(req.params.id)
            await Post.deleteMany({userId:req.params.id})
            res.clearCookie('access_token')
            res.status(200).json('User deleted')
        } 
        
        catch (error) {
            next(error)
        }
}

export const getUsers = async (req,res,next)=>{

    if(!req.user.isAdmin){
        return next(errorHandler(403,'Only admin is allowed'))
    }

    try {
        const sort = req.query.sort == 'asc' ? 1 : -1

        const users = await User.find().sort({createdAt:sort})

        const userWithoutPasswords = users.map((user)=>{
            const {password:pass,...rest} = user._doc
            return rest
        })

        const totalUsers = await User.countDocuments()

        const now = new Date()

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })

        res.status(200).json({
            users:userWithoutPasswords,
            totalUsers,
            lastMonthUsers
        })
    } 
    catch (error) {
        next(error)
    }
}

export const getUser = async(req,res,next)=>{

    try {
        const user = await User.findById(req.params.userId);
        if(!user){
            return next(errorHandler(404,'User not found'))
        }
        const {password:pass,...rest} = user._doc
        res.status(200).json(rest)
    } 
    catch (error) {
    next(error)    
    }
}