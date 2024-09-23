const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
const user = require('./routes/userRoute');
const products = require('./routes/productsRoute');
const order = require('./routes/orderRoute');
const  swaggerJsDoc = require ('swagger-jsdoc');
const swaggerUi = require( 'swagger-ui-express');
const swaggerDefinition = require( '../backend/swagger/swaggerDefinition');
app.use('/api/v1', user);
app.use('/api/v1', products);
app.use('/api/v1', order);

app.use(errorMiddleware);

let swaggerOptions = {
    swaggerDefinition,
    apis: ['.v1/routes.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;