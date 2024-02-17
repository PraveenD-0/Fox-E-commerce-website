const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
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

const frontendURL = 'https://65cf53c2f290bd06551b1f88--glowing-taffy-a100b0.netlify.app'; 

if(process.env.NODE_ENV === "production") {
    app.use(express.static(frontendURL + '/build'));
    app.get('*', (req, res) =>{
        res.sendFile(frontendURL + '/build/index.html');
    });
}

app.use(errorMiddleware);

module.exports = app;
