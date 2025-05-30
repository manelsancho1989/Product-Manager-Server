import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products',
                description: 'API related operations to products'
            }
        ],
        info: {
            title: 'REST API Product Manager',
            version: '1.0',
            description: 'API docs for Products'
        }
    },
    apis:[
        './src/router.ts'
    ]
}

const swagerSpec = swaggerJSDoc(options)

export default swagerSpec