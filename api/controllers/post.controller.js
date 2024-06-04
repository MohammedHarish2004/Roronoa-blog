import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"

export const createPost = async (req,res,next)=>{

    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allower to create a post'))
    }

    if(!req.body.title || !req.body.content ){
        return next(errorHandler(400,'Please provide all required fields'))
    }

    const slug = req.body.title.split(" ").join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'-') 
    const post = new Post({
        ...req.body, slug,userId:req.user.id
    })

   try {
    await post.save()
    res.status(201).json(post)
   } 
   catch (error) {
    if(error.code === 11000){
        next(errorHandler(401,'Title already exist'))
    }
    else{
        next(error)
    }
   }

}