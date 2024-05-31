import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'
    }
},{timestamps:true})

const User = new mongoose.model('User',userSchema)

export default User