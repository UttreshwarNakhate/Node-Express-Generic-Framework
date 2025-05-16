import app from './app'
import envConfig from './config/env.config'

const startServer = () => {
    const APP_PORT = envConfig.APP_PORT
    app.listen(APP_PORT, () => {
        // console.log(`Server is listening on port: ${APP_PORT}`)
    })
    // ;(() => {
    //     try {
    //         // Database connection
    //         // console.info('APPLICATION_STARTED', {
    //         //     meta: {
    //         //         PORT: envConfig.APP_PORT,
    //         //         BACKEND_URL: envConfig.BACKEND_URL
    //         //     }
    //         // })
    //     } catch (error) {
    //         // console.error(`APPLICATION_ERROR`, { meta: error })

    //         // if (error) {
    //         //     console.error(`APPLICATION_ERROR`, { meta: error })
    //         // }

    //         process.exit(1)
    //     }
    // })()
}
startServer()
