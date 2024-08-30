const userComponent = require('./components');
const {
  components: {
    schemas: { updateProfile, updatePassword, updateRole, getAuthResponse },
  },
} = userComponent;

const user = {
    '/admin/all_users': {
        get: {
            tags: ['User'],
            summary: 'Get All Users',
            description: 'Fetch all the users from the list.',
            operationId: 'getAllUsers',
            responses: {
                200: {
                    content: {
                        'application/json': {
                        schema: getAuthResponse,
                        },
                    },
                    description: 'User fetched successfully',
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
    '/me': {
        get: {
            tags: ['User'],
            summary: 'Get Logged In User',
            description: 'Fetch all the details of logged in user.',
            operationId: 'getLoggedInUserDetails',
            responses: {
                200: {
                    content: {
                        'application/json': {
                        schema: getAuthResponse,
                        },
                    },
                    description: 'User details fetched successfully',
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
    '/admin/single_user/{id}': {
        get: {
            tags: ['User'],
            summary: 'Get a single user by ID',
            description: 'Fetches a single user by their ID.',
            operationId: 'getUserById',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the user to fetch',
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
                description: 'Fetched user successfully',
                },
                404: {
                description: 'User not found',
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
    '/admin/delete/user/{id}': {
        delete: {
            tags: ['User'],
            summary: 'Get a single user by ID',
            description: 'Fetches a single user by their ID.',
            operationId: 'deleteUserById',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the user to fetch',
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
                description: 'Fetched user successfully',
                },
                404: {
                description: 'User not found',
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
    '/profile/update': {
        put: {
        tags: ['User'],
        summary: 'Update Profile',
        description: 'Update profile name.',
        operationId: 'updateProfile',
        requestBody: {
            required: true,
            content: {
            'application/json': {
                schema: updateProfile,
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
    '/password/update': {
        put: {
        tags: ['User'],
        summary: 'Update Password',
        description: 'Update User Password.',
        operationId: 'updatePassword',
        requestBody: {
            required: true,
            content: {
            'application/json': {
                schema: updatePassword,
            },
            },
        },
        responses: {
            200: {
            description: 'Password updated successfully',
            content: {
                'application/json': {
                schema: getAuthResponse,
                },
            },
            },
            400: {
            description: 'password mismatch',
            },
            500: {
            description: 'Internal server error',
            },
        },
        },
    },
    '/admin/role/update': {
        put: {
            tags: ['User'],
            summary: 'Update Role',
            description: 'Update Role.',
            operationId: 'updateRole',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                    schema: updateRole,
                    },
                },
            },
            responses: {
                200: {
                    description: 'Role Updated successfully',
                    content: {
                    'application/json': {
                        schema: getAuthResponse,
                    },
                    },
                },
                400: {
                    description: 'Invalid Role',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
};

module.exports = user;
