import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'

export const signUp = async (req,res,next)=>{

  try {
    const {username,email,password} = req.body
    
    if(!username || 
       !email ||
       !password || 
       username == '' || 
       email == '' || 
       password == ''){
        return res.status(400).json('All fields are required')
    }

    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,password:hashedPassword})
    await newUser.save()
    res.status(200).json('Signed up successfully')
  } 
  
  catch (error) {
    if(error.code === 11000){
        next(errorHandler(403,'Username / email already exist'))
    }
    else{
        next(error)
    }
  }

}