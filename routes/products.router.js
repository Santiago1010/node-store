const express = require('express')
const ProductsServices = require('../services/product.service.js')
const validatorHandler = require('../middlewares/validator.handler.js')

const router = express.Router()
const service = new ProductsServices()
const { createProductSchema, getProductSchema, updateProductSchema } = require('../schemas/product.schema.js')

// GET

router.get('/', async (request, response) => {
	const products = await service.find()

	response.json(products)
})

router.get('/filter', async (request, response) => {
	response.send('I am a filter.')
})

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (request, response, next) => {
	const { id } = request.params

	try {
		response.json(await service.findOne(id))
	} catch (error) {
		next(error)
	}
})

router.get('/categories/:catgoryId/:productId', async (request, response) => {
	const { catgoryId, productId } = request.params

	response.json({
		catgoryId,
		productId
	})
})

// POST

router.post('/', validatorHandler(createProductSchema, 'body'), async (request, response) => {
	const body = request.body
	const newProduct = await service.create(body)

	response.status(201).json(newProduct)
})

// PATCH & PUT

router.patch('/:id', async (request, response, next) => {
	const { id } = request.params
	const body = request.body

	try {
		response.json(await service.update(id, body))
	} catch (error) {
		next(error)
	}
})

// DELETE

router.delete('/:id', async (request, response) => {
	const { id } = request.params
	const rta = await service.delete(id)

	response.json(rta)
})

module.exports = router