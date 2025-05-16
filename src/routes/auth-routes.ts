import { Router } from 'express'
import self from '../controllers/auth-controller'
const authRoutes = Router()

authRoutes.get('/self', self)
export default authRoutes
