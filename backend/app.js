const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
app.use(express.json());
const products = require('./routes/productsRoute');

app.use('/api/v1', products);

app.use(errorMiddleware);

module.exports = app;