import request from "supertest";
import server from "../../server";
import Product from "../../models/Product.model";


describe('POST /api/products', () => {

    it("Should Display Validation Errors", async () => {
        const res = await request(server).post('/api/products').send()

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(4)

        expect(res.status).not.toBe(200)
        expect(res.body.errors).not.toHaveLength(2)

    })

    it("Should Validate that the price is greather than 0", async () => {
        const res = await request(server).post('/api/products').send({
            "name": "Screen Curve 65 UHD test price",
            "price": 0
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(200)
        expect(res.body.errors).not.toHaveLength(2)

    })

    it("Should Validate that the price is a number and greather than 0", async () => {
        const res = await request(server).post('/api/products').send({
            "name": "Screen Curve 65 UHD test price",
            "price": "Hola"
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(2)

        expect(res.status).not.toBe(201)
        expect(res.body.errors).not.toHaveLength(4)

    })

    it("Should Create a New Product", async () => {
        const res = await request(server).post('/api/products').send({
            name: "Screen Curve 65 UHD testing",
            price: 499.99
        })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('errors')
    })

})

describe('GET /api/products', () => {

    it('Should check url /api/products exists', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).not.toBe(404)
    })

    it('Get a JSON Response with products', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')

        expect(res.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {
    it('Should return 404 response for a non-product exists', async () => {
        const productID = 2000
        const res = await request(server).get(`/api/products/${productID}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('Product not found')
    })

    it('Should a valid ID in the url', async () => {
        const res = await request(server).get('/api/products/not-valid-url')
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('Invalid ID')
    })

    it('Get a Single Product', async () => {
        const res = await request(server).get('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')

    })
})

describe('PUT /api/products/:id', () => {
    it('Should display a validation error messages when updating a product', async () => {
        const productID = 1
        const res = await request(server).put(`/api/products/${productID}`).send({})

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(5)
        expect(res.body.errors).toBeTruthy()

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')

    })

    it('Should validate the price is greather than 0', async () => {
        const productID = 1
        const res = await request(server)
            .put(`/api/products/${productID}`)
            .send({
                name: "Curve UHD 42",
                price: -599.99,
                availability: true
            })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors[0].msg).toBe('Invalid price')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')

    })

    it('Should a valid ID in the url', async () => {
        const res = await request(server)
            .put('/api/products/not-valid-url')
            .send({
                name: "Curve UHD 42",
                price: 599.99,
                availability: true
            })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('Invalid ID')
    })

    it('Should return for 404 for a none-existen product', async () => {
        const productID = 1000
        const res = await request(server)
            .put(`/api/products/${productID}`)
            .send({
                name: "Curve UHD 42",
                price: 599.99,
                availability: true
            })

        expect(res.status).toBe(404)
        expect(res.body.error).toBe('Product not found')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')

    })

    it('Should update a existing product with valid data', async () => {
        const productID = 1
        const res = await request(server)
            .put(`/api/products/${productID}`)
            .send({
                name: "Curve UHD 42",
                price: 599.99,
                availability: true
            })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('errors')

    })

})

describe('PATCH /api/products/:id', () => {
    it('Should response a 404 for a none existing product', async () => {
        const productID = 2000
        const res = await request(server).patch(`/api/products/${productID}`)

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('Product not found')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')

    })
    it('Should product availability', async () => {
        const productID = 1
        const res = await request(server).patch(`/api/products/${productID}`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data.availability).toBe(false)

        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id', () => {
    it('Should check not valid url', async () => {
        const productID = 5
        const res = await request(server).delete(`/api/products/not-valid`)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe('Invalid ID')

        expect(res.body).not.toHaveProperty('data')
        expect(res.status).not.toBe(200)

    })
    it('Should check not valid id', async () => {
        const productID = 5
        const res = await request(server).delete(`/api/products/${productID}`)

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('Product not found')

        expect(res.body).not.toHaveProperty('data')
        expect(res.status).not.toBe(200)

    })

    it('Should delete a valid id', async () => {
        const productID = 1
        const res = await request(server).delete(`/api/products/${productID}`)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toBe('The product has been removed')

        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('error')
        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('errors')
    })
})