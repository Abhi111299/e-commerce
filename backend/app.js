const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
const user = require('./routes/userRoute');
const products = require('./routes/productsRoute');
const order = require('./routes/orderRoute');

app.use('/api/v1', user);
app.use('/api/v1', products);
app.use('/api/v1', order);

app.use(errorMiddleware);

module.exports = app;