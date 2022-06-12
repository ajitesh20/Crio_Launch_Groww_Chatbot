if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const swaggerUI = require('swagger-ui-express');
const morgan = require('morgan');

const specs = require('./swaggerDoc');
const initializePassport = require('./passport-config');

initializePassport(passport,
    id => users.find(user => user.id === id)
);

const userRoutes = require('./routes/user');
const chatbotRoutes = require('./routes/chatbot');

const app = express();

//connecting to the database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MONGODB database');
    })
    .catch(err => {
        console.log(err);
    })


const corsOptions = {
    origin: [process.env.FRONTEND, process.env.ADMIN],
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('assets'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs));

app.use('/user', userRoutes);
app.use('/', chatbotRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});