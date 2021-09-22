import express from 'express'
import mongoose from 'mongoose';
import { mongoDbUri, port } from './config/config';
import authRouter from './routes/auth'
import cors from 'cors'
import assetsRouter from './routes/private/assets'
import celsiusRouter from './routes/private/celsius'
import cbProRouter from './routes/private/cbpro'


// Express Application Config

const app: express.Application  = express();

// Connection to MongoDB Atlas
mongoose.connect(mongoDbUri(), () => console.log(`Succesfully connected to MongoDB Atlas`))

// Middleware
app.use(express.json())

app.use(cors({
    origin: '*'
}))

// Routes Middleware
app.use('/', authRouter)
app.use('/assets', assetsRouter)
app.use('/celsius', celsiusRouter)
app.use('/cbpro', cbProRouter)


// Listen 

app.listen(port(), () => console.log(`Server is running on port ${port()}`))

