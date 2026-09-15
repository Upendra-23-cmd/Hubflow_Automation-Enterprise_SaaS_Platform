const swaggerJsDoc = require('swagger-jsdoc');
const config = require('./env');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hubflow Automation API',
      version: '1.0.0',
      description: 'REST API backend for Hubflow Automation SaaS platform including auth, contacts, campaigns, and dashboard endpoints.',
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v1`,
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Provide your JWT authorization token in the format: Bearer <TOKEN>',
        },
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Resource not found' },
            errors: { type: 'array', items: { type: 'string' }, nullable: true },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
