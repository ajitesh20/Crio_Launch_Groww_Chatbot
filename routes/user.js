const { User, validateUser } = require('../models/user');
const express = require('express');
const app = express.Router();

app.post('/create', async (req, res) => {
    const { error } = validateUser(req.body);  // validated details
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    // checking if user exists in the database
    let userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(400).send('User already exists');
    }
    else {
        // if not present then saving user in the database
        user = await user.save();
        res.send(user);
    }
});

module.exports = app;