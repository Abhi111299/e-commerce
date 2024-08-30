const authComponents = require('./components');
const {
  components: {
    schemas: { addUserRequest, userLogin, passwordResetRequest, forgotPasswordEmail, getAuthResponse },
  },
} = authComponents;

const auth = {
  '/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user',
      description: 'This API allows adding a new user.',
      operationId: 'addUser',
      requestBody: {
        description: 'User details to add',
        content: {
          'application/json': {
            schema: addUserRequest,
          },
        },
      },
      responses: {
        200: {
          description: 'User registered successfully',
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
  '/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login user',
      description: 'Login with email and password to receive a JWT token.',
      operationId: 'loginUser',
      requestBody: {
        description: 'User login credentials',
        content: {
          'application/json': {
            schema: userLogin,
          },
        },
      },
      responses: {
        200: {
          description: 'User logged in successfully',
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
          description: 'Invalid email or password',
          content: {
            'application/json': {
              schema: getAuthResponse,
            },
          },
        },
      },
    },
  },
  '/password/forgot': {
    post: {
      tags: ['Auth'],
      summary: 'Forgot Password',
      description: 'Forgot password using this get a url to update the password again',
      operationId: 'forgotPassword',
      requestBody: {
        description: 'Forgot Password Email',
        content: {
          'application/json': {
            schema: forgotPasswordEmail,
          },
        },
      },
      responses: {
        200: {
          description: 'Forgot password email sent successfully',
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
          description: 'Invalid email',
          content: {
            'application/json': {
              schema: getAuthResponse,
            },
          },
        },
      },
    },
  },
  '/password/reset/{token}': {
    put: {
      tags: ['Auth'],
      summary: 'Reset Password',
      description: 'Reset the user password using a token.',
      operationId: 'resetPassword',
      parameters: [
        {
          name: 'token',
          in: 'path',
          required: true,
          description: 'Token for resetting the password',
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: passwordResetRequest,
          },
        },
      },
      responses: {
        200: {
          description: 'Password reset successfully',
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
  '/logout': {
    get: {
      tags: ['Auth'],
      summary: 'Logout user',
      description: 'Logs out the currently authenticated user.',
      operationId: 'logout',
      responses: {
        200: {
          content: {
            'application/json': {
              schema: getAuthResponse,
            },
          },
          description: 'User logged out successfully',
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
};

module.exports = auth;
