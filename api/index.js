import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connect to MongoDB');
}).catch((error)=>{
    console.log(error);
})


const app = express()

app.listen(3000,()=>{
console.log('Server running on port 3000');
})