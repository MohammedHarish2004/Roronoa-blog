import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signUp = async (req,res)=>{

  try {
    const {username,email,password} = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = User({username,email,password:hashedPassword})
    const {password:pass,...rest} = newUser._doc 
    await newUser.save()
    res.status(200).json(rest)
  } catch (error) {
    if(error.code === 11000){
        console.log('Username already exist');
    }
    else{
        console.log(error.message);
    }
  }

}