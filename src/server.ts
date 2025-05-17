import app from './app'
import envConfig from './config/env.config'
import logger from './config/logger'

const startServer = () => {
    const APP_PORT = envConfig.APP_PORT
    app.listen(APP_PORT, () => {
        logger.info(`Server is listening on port: ${APP_PORT}`)
    })
    ;(() => {
        try {
            // Database connection
            logger.info('APPLICATION_STARTED', {
                meta: {
                    PORT: envConfig.APP_PORT,
                    BACKEND_URL: envConfig.BACKEND_URL
                }
            })
        } catch (error) {
            logger.error(`APPLICATION_ERROR`, { meta: error })

            if (error) {
                logger.error(`APPLICATION_ERROR`, { meta: error })
            }

            process.exit(1)
        }
    })()
}
startServer()
