const express = require('express')
const productsRouter = require('./products.router')

function routerAPI(app) {
	const router = express.Router()

	app.use('/api/v1', router)

 	router.use('/products', productsRouter)
}

module.exports = routerAPI