const productComponent = require('./components');
const {
    components: {
      schemas: { createProduct, getAuthResponse, updateProduct },
    },
  } = productComponent;


const products = {
    '/admin/products/create': {
      post: {
        tags: ['Product'],
        summary: 'Create a new product',
        description: 'This API allows adding a new product.',
        operationId: 'addProduct',
        requestBody: {
          description: 'Product details to add',
          content: {
            'application/json': {
              schema: createProduct,
            },
          },
        },
        responses: {
          200: {
            description: 'Product added successfully',
            content: {
              'application/json': {
                schema: getAuthResponse,
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: getAuthResponse,
              },
            },
          },
          400: {
            description: 'Invalid input data',
            content: {
              'application/json': {
                schema: getAuthResponse,
              },
            },
          },
        },
      },
    },
    '/products': {
    get: {
      tags: ['Product'],
      summary: 'Get All product',
      description: 'Get all products.',
      operationId: 'all_products',
      responses: {
        200: {
          content: {
            'application/json': {
              schema: getAuthResponse,
            },
          },
          description: 'All products fetched successfully',
        },
        500: {
          content: {
            'application/json': {
              schema: getAuthResponse,
            },
          },
        },
      },
    },
  },
  '/admin/deleteProducts/{id}': {
        delete: {
            tags: ['Product'],
            summary: 'Delete product',
            description: 'Delete a single product by their ID.',
            operationId: 'deleteProductById',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the product to delete',
                    schema: {
                        type: 'string',
                        example: '66c6cad547138d7e5f0e2762',
                    },
                },
            ],
            responses: {
                200: {
                content: {
                    'application/json': {
                    schema: getAuthResponse,
                    },
                },
                description: 'Product deleted successfully',
                },
                404: {
                description: 'Product not found',
                },
                500: {
                    content: {
                        'application/json': {
                        schema: getAuthResponse,
                        },
                    },
                },
            },
        },
    },
    '/admin/products/{id}': {
        put: {
        tags: ['Product'],
        summary: 'Update Product',
        description: 'Update complete Product.',
        operationId: 'updateProduct',
        requestBody: {
            required: true,
            content: {
            'application/json': {
                schema: updateProduct,
            },
            },
        },
        responses: {
            200: {
            description: 'Profile updated successfully',
            content: {
                'application/json': {
                schema: getAuthResponse,
                },
            },
            },
            400: {
            description: 'Invalid token or password mismatch',
            },
            500: {
            description: 'Internal server error',
            },
        },
        },
    },
};
  
  module.exports = products;
  