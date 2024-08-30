const userComponent = {
    components: {
      schemas: {
        updateProfile: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Sammy',
            },
          },
        },
        updateRole: {
          type: 'object',
          properties: {
            role: {
              type: 'string',
              example: 'user',
            },
          },
        },
        updatePassword: {
          type: 'object',
          properties: {
            oldPassword: {
              type: 'string',
              example: 'user1234',
            },
            newPassword: {
              type: 'string',
              example: 'user1234',
            },
            confirmPassword: {
              type: 'string',
              example: 'user1234',
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
  
  module.exports= userComponent;
  