require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

//connecting to the database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MONGODB database');
});

const corsOptions = {
    origin: [process.env.FRONTEND, process.env.ADMIN],
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});