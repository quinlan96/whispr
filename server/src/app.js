import express from 'express'
import createError from 'http-errors'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import indexRouter from './routes/index'
import apiRouter from './routes/api'

const app = express()

app.use(bodyParser.json({limit: '50mb'}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', indexRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404, 'Page not found'))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	// res.locals.message = err.message
	// res.locals.error = req.app.get('env') === 'development' ? err : {}

	// return the error
	res.status(err.status || 500)
	res.json({
		status: err.status,
		message: err.message,
		stack: err.stack
	})
})

export default app