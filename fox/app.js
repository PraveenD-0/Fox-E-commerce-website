const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const url = require('url'); // Import the url module
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, 'config/config.env') });

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/url/', products);
app.use('/api/url/', auth);
app.use('/api/url/', order);
app.use('/api/url/', payment);

if (process.env.NODE_ENV === 'production') {
    const frontendURL = new URL('https://example.com'); 
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, frontendURL.pathname, 'index.html'));
    });
}

app.use(errorMiddleware);

module.exports = app;
