const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
	response.send('Hello! Wellcome to my server express.')
})

app.get('/products', (request, response) => {
	response.json({
		name: 'Product 1',
		price: 1000
	})
})

app.listen(port, () => {
	console.log('Mi puerto: ' + port)
})