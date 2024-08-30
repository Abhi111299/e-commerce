const authComponent = {
  components: {
    schemas: {
      addUserRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            require: true,
            description: 'enter user Name',
          },
          email: {
            type: 'string',
            format: 'email',
            require: true,
            description: 'enter user Email',
          },
          password: {
            type: 'string',
            require: true,
            description:
              'enter password at least with 8 characters',
          },
        },
      },
      userLogin: {
        type: 'object',
        required: ['password', 'email'],
        properties: {
          email: {
            type: 'string',
            description: 'User Email',
          },
          password: {
            type: 'string',
            description: 'User Password',
          },
        },
      },
      forgotPasswordEmail: {
        type: 'object',
        required: ['email'],
        properties: {
          email: {
            type: 'string',
            description: 'User Email',
          },
        },
      },
      passwordResetRequest: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
            example: '12345678',
          },
          confirmPassword: {
            type: 'string',
            example: '12345678',
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

module.exports= authComponent;
