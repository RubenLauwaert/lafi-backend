import express from 'express'
import mongoose from 'mongoose';
import { mongoDbUri, port } from './config/config';
import authRouter from './routes/auth'
import assetsRouter from './routes/private/assets'
import celsiusRouter from './routes/private/celsius'
import cbProRouter from './routes/private/cbpro'


// Express Application Config

const app: express.Application  = express();

// Connection to MongoDB Atlas
mongoose.connect(mongoDbUri(), () => console.log(`Succesfully connected to MongoDB Atlas`))

// Middleware
app.use(express.json())

// Routes Middleware
app.use('/api/user', authRouter)
app.use('/api/user/assets', assetsRouter)
app.use('/api/user/celsius', celsiusRouter)
app.use('/api/user/cbpro', cbProRouter)


// Listen 

app.listen(port(), () => console.log(`Server is running on port ${port()}`))

