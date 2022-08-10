const faker = require('faker')
const boom = require('@hapi/boom')

class ProductsServices {
	constructor() {
		this.products = []
		this.generate()
	}

	generate() {
		for (var i = 0; i < 100; i++) {
			this.products.push({
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.imageUrl(),
				isBlock: faker.datatype.boolean()
			})
		}
	}

	async create(data) {
		const newProduct = {
			id: faker.datatype.uuid(),
			...data
		}

		this.products.push(newProduct)
		return newProduct
	}

	async find() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.products)
			}, 1000)
		})
	}

	async findOne(id) {
		const product = this.products.find(item => item.id === id)

		if (!product) {
			throw boom.notFound('Product not found.')
		}

		if (product.isBlock) {
			throw boom.conflict('Product is block.')
		}

		return product
	}

	update(id, changes) {
		const index = this.products.findIndex(item => item.id === id)

		if (index === -1) {
			throw boom.notFound('Product not found.')
		}

		const product = this.products[index]

		this.products[index] = {
			...product,
			...changes
		}
		return this.products
	}

	async delete(id) {
		const index = this.products.findIndex(item => item.id === id)

		if (index === -1) {
			throw boom.notFound('Product not found.')
		}

		this.products.splice(index, 1)
		return this.products
	}
}

module.exports = ProductsServices