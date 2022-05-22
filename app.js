const express = require('express');
const mongoose = require('mongoose');
const PORT = (process.env.PORT || 8081);
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const user = require('./routes/user');
const cookieParser = require('cookie-parser');

mongoose.connect('mongodb://localhost:27017/crio_externship', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Unable to connect to MongoDB', err));

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use('/user', user);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));