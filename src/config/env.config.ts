import DotenvFlow from 'dotenv-flow'
DotenvFlow.config()

export default {
    // To check the environment
    ENV: process.env.ENV,

    // The port on which the server will run
    APP_PORT: process.env.APP_PORT,

    // The URL of the database
    DB_URL: process.env.DB_URL,

    // The secret key for JWT
    JWT_SECRET: process.env.JWT_SECRET,

    // The URL of the frontend application
    FRONTEND_URL: process.env.FRONTEND_URL,

    // The URL of the backend application
    BACKEND_URL: process.env.BACKEND_URL,

    //JWT access token secret
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,

    // JWT refresh token secret
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}
