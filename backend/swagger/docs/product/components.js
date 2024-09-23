const productComponent = {
    components: {
      schemas: {
        createProduct: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Sammy',
            },
            price: {
                type: 'number',
                example: '1000',
              },
              category: {
                type: 'string',
                example: 'Sammy',
              },
              stock: {
                type: 'number',
                example: '2',
              },
              description: {
                type: 'string',
                example: 'Sammy',
              },
          },
        },
        updateProduct: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Footwear',
            },
            description: {
              type: 'string',
              example: 'Footwear',
            },
            ratings: {
              type: 'string',
              example: 'Footwear',
            },
            category: {
              type: 'string',
              example: 'Footwear',
            },
            stock: {
              type: 'string',
              example: 'Footwear',
            },
            price: {
              type: 'string',
              example: 'Footwear',
            },
          },
        },
        getAuthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'success | error',
            },
            data: {
              type: 'object',
            },
            message: { type: 'string' },
          },
          required: ['status', 'data'],
        },
      },
    },
  };
  
  module.exports= productComponent;
  