import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

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
    const newUser = User({username,email,password:hashedPassword})
    const {password:pass,...rest} = newUser._doc 
    await newUser.save()
    res.status(200).json(rest)
  } 
  
  catch (error) {
    if(error.code === 11000){
        res.status(401).json('Username / email already exist');
    }
    else{
        next(error)
    }
  }

}