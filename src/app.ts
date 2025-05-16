import express from 'express'
import path from 'path'
import authRoutes from './routes/auth-routes'
const app = express()

// middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// Routes
app.use('/api/v1', authRoutes)
export default app
