const express = require('express')
const cors = require('cors')
const router = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler.js')

const app = express()
const port = 3000

app.use(express.json())

const whiteList = ['http://localhost:8080/', 'https://valtec.systems']
const options = {
	origin: (origin, callback) => {
		if (whiteList.includes('origin')) {
			callback(null, true)
		}else {
			callback(new Error('No permissions.'))
		}
	} 
}
app.use(cors(options))

app.get('/', (request, response) => {
	response.send('Hello! Wellcome to my server express.')
})

router(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
	console.log('Mi puerto: ' + port)
})