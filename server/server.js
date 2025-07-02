import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRoutes from './routes/auth.js'
import taskRoutes from './routes/tasks.js'

dotenv.config()

const port=process.env.PORT

const app=express()

mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('DB connected')).catch(err=>console.log(err))

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);
    
app.use('/api/tasks', taskRoutes)

app.listen(port||4200,()=>console.log(`App listening by port ${port}`))

