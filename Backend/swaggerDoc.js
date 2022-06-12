const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Groww Chatbot Backend',
            version: '1.0.0',
            description: 'Groww Chatbot API description',
        },
        servers: [
            {
                url: process.env.PORT,
            }
        ],
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options);

module.exports = specs
