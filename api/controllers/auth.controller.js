import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'

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

export const signIn = async (req,res,next) =>{

  try {
    const {username,password} = req.body

    const validUser = await User.findOne({username})
    if(!validUser) return next(errorHandler(201,'Invalid username'))
    
    const validPassword = bcryptjs.compareSync(password,validUser.password)
    if(!validPassword) return next(errorHandler(201,'Invalid password'))
  
    const token = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET)
    const {password:pass,...rest} = validUser._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    
  } 
  
  catch (error) {
    next(error)  
  }
}

export const google = async (req,res,next) =>{

  const {username,email,avatar} = req.body
  try {
    const user = await User.findOne({email})
  if(user){
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    const {password:pass,...rest} = user._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
  }

  else{
    const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    const hashedPassword = bcryptjs.hashSync(generatePassword,10)

    const newUser = new User({
      username:username.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
      email:email,
      password:hashedPassword,
      avatar:avatar
    })

    await newUser.save()

    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
    const {password:pass,...rest} = newUser._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
  }

  } catch (error) {
    next(error)
  }
}

export const signOut = (req,res)=>{

  try {
    res.clearCookie('access_token')
    res.status(200).json('Signed Out')
  } catch (error) {
    next(error)
  }
}