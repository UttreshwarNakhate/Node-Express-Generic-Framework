import express from 'express'
import { register, getUserInfoByUserId } from '../controllers/auth-controller'

// Create an instance of Express Router
const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.post('/getUserByUserId', getUserInfoByUserId)

export default authRoutes
