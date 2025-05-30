import { Router } from "express";
import { createProducts, getProducts, getProductByID, updateProduct, updateAvailavility, deleteProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name
 *                      example: Screeen
 *                  price:
 *                      type: number
 *                      description: The Product Price
 *                      example: 39.99
 *                  availability:
 *                      type: boolean
 *                      description: The Product Availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of Products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a Product based on it's unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product Not Found
 *              400:
 *                  description: Invalid ID
 * 
 * 
 * 
 * 
 */
router.get('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    getProductByID
)
/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a New Product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Curved Screen"
 *                              price:
 *                                  type: number
 *                                  example: 399.99
 *          responses:
 *              201:
 *                  description: Product Updated Succesfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'  
 *              400:
 *                  description: Bad Request - Invalid Input Data
 * 
 * 
 */

router.post('/',
    //Validate
    body('name')
        .notEmpty().withMessage('The name is required'),
    body('price')
        .notEmpty().withMessage('The price is required')
        .isNumeric().withMessage('Value is not a number')
        .custom(value => value > 0).withMessage('Invalid price'),
    handleInputErrors,
    createProducts
)
/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a Product
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Curved Screen"
 *                              price:
 *                                  type: number
 *                                  example: 399.99
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Product Updated Succesfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'        
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 * 
 * 
 * 
 * 
 */

router.put('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    body('name')
        .notEmpty().withMessage('The name is required'),
    body('price')
        .notEmpty().withMessage('The price is required')
        .isNumeric().withMessage('Value is not a number')
        .custom(value => value > 0).withMessage('Invalid price'),
    body('availability').isBoolean().withMessage('Invalid value'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update Product availability
 *          tags: 
 *              - Products
 *          description: Returns the Updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Product Updated Succesfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'        
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 * 
 */

router.patch('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    updateAvailavility
)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a Product By ID
 *          tags: 
 *              - Products
 *          description: Returns a string "The product has been removed"
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: The product has been removed
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: "The product has been removed"
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 * 
 */

router.delete('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    deleteProduct
)

export default router