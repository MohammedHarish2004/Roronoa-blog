import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'

import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connect to MongoDB');
}).catch((error)=>{
    console.log(error);
})

const __dirname = path.resolve()

const app = express()

app.listen(3000,()=>{
console.log('Server running on port 3000');
})

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/comment',commentRouter)

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use((err,req,res,next)=>{

    const statusCode = err.statusCode || 500
    const message = err.message || 'Invalid server error'

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})