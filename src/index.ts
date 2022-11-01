import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { PORT } from './config/env'
import logger from './lib/logger.js'
import { mainRouter } from './routes/index'
import database from './config/database'
import errorHandler from './lib/error.handler.js'

const httpReqLogFormat =
    ':method :url :status :res[content-length] - :response-time ms'
const httpReqLogger = morgan(httpReqLogFormat, { stream: logger.stream })

const app = express()

const port = process.env.PORT || 80;

// middlewares
app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use(httpReqLogger)
app.use(errorHandler)
app.use('/api', mainRouter)

database.connect()

app.listen(port, () => {
    console.log(`Server running on port ${PORT}`)
})
