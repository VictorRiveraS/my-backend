import cors from 'cors'
import config from 'config'
import morgan from 'morgan'
import express from 'express'
import logger from './lib/logger.js'
import { mainRouter } from './routes/index'
import { initializeDB } from './config/db.js'
import errorHandler from './lib/error.handler.js'

const httpReqLogFormat =
    ':method :url :status :res[content-length] - :response-time ms'
const httpReqLogger = morgan(httpReqLogFormat, { stream: logger.stream })

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(httpReqLogger)
app.use(errorHandler)
app.use('/api', mainRouter)

initializeDB()

const PORT = process.env.PORT || config.get('port')
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})