import mongoose from 'mongoose'
import envConfig from '../config/env.config'

export default {
    connect: async () => {
        try {
            await mongoose.connect(envConfig.DB_URL as string)
            return mongoose.connect
        } catch (error) {
            throw error
        }
    }
}
