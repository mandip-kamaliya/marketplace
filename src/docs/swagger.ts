import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Marketplace Backend API',
      version: '0.1.0',
      description: 'Swagger documentation for Marketplace (Seller, DeliveryPerson, Salesman, Customer)',
      contact: {
        name: 'API Support',
        url: 'http://example.com/support',
        email: 'support@example.com'
      }
    },
    servers: [
      { 
        url: 'http://localhost:4000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 1
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com'
            },
            name: {
              type: 'string',
              example: 'John Doe'
            },
            role: {
              type: 'string',
              enum: ['seller', 'salesman', 'delivery', 'customer', 'admin'],
              example: 'customer'
            },
            phone: {
              type: 'string',
              example: '+1234567890',
              nullable: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    tags: [
      {
        name: 'Users',
        description: 'User management and authentication'
      }
    ]
  },
  apis: [
    'src/routes/**/*.ts',
    'src/controllers/**/*.ts',
    'src/models/**/*.ts'
  ]
});
