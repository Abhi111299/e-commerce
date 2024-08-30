const auth = require( './docs/auth/index');
const user = require( './docs/user/index');
const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'APIs',
    description: 'This includes the all the APIs.',
    contact: {
      name: 'Engineering Team',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api/v1/',
      description: 'Version-1',
    },
  ],
  paths: { ...auth, ...user },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

module.exports= swaggerDefinition;
