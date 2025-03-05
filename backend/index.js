// Packages
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'

// Files 
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import moviesRoutes from './routes/moviesRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

// Configuration
dotenv.config() // Load environment variables from .env file
connectDB() // Connect to MongoDB

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors())

// Use your environment variable for the port
const PORT = process.env.PORT || 3000

// Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/genre', genreRoutes)
app.use('/api/v1/movies', moviesRoutes)
app.use('/api/v1/upload', uploadRoutes)

// Serving static files from the "uploads" folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
