import app from './app'
import envConfig from './config/env.config'
import logger from './config/logger'

const startServer = () => {
    const APP_PORT = envConfig.APP_PORT
    app.listen(APP_PORT, () => {
        logger.info(`Server is listening on port: ${APP_PORT}`)
    })
}
startServer()
