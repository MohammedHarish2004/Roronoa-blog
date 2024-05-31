import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

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

app.use(cookieParser())

app.use((err,req,res,next)=>{

    const statusCode = err.statusCode || 500
    const message = err.message || 'Invalid server error'

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})