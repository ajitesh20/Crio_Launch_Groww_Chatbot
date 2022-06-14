let userHelper = require('../helpers/user');
const express = require('express');
const passport = require("passport");
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user');

router.post('/register', async (req, res) => {
    bcrypt.genSalt(parseInt(process.env.ROUND), function (err, salt) {
        if (err) console.log(err);
        else
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                    res.redirect('/register');
                } else {
                    if (req.body.mobile == null || req.body.mobile == '' || req.body.mobile == undefined) {
                        req.body.kyc = false;
                    }
                    else req.body.kyc = true;
                    const user = new userModel({
                        name: req.body.name,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        password: hash,
                        kyc: req.body.kyc,
                        profile_photo: './assets/profile_photos/default.png',
                        owned_products: []
                    });
                    user.save((err, user) => {
                        if (err) {
                            console.log(err);
                            res.status(409).json({
                                message: "user already exists"
                            });
                        }
                        else {
                            req.session.user = user;
                            req.session.save();
                            res.status(200).json({
                                message: "Successfully registered user",
                            });
                        }
                    });
                }
            });
    });
});

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    else res.send('login');
});

router.post('/login', (req, res) => {
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/login');
        }
        else if (!user) {
            res.redirect('/login');
        }
        else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect('/login');
                }
                else if (result) {
                    req.session.user = user;
                    req.session.save();
                    req.login(user, function (err) {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                message: "Error while logging in"
                            });
                        }
                        res.redirect('/');
                    });
                }
            });
        }
    });
});

router.get('/logout', function (req, res) {
    req.logout((err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: "Error logging out"
            });
        }
        else {
            res.status(200).clearCookie('connect.sid', {
                path: '/'
            });
            req.session.destroy(function (err) {
                res.redirect('/');
            });
        }
    });
});

module.exports = router;