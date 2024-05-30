import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'

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

app.use(express.json())

app.use('/api/auth',authRouter)