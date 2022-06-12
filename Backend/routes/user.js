/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - mobile
 *              - password
 * 
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              mobile:
 *                  type: string
 *              password:
 *                  type: string
 *              kyc:
 *                  type: boolean
 *              gender:
 *                  type: string
 *              profile_photo:
 *                  type: string
 *              owned_products:
 *                  type: array of product objects
 */

/**
 * @swagger
 * /user/register:
 *     post:
 *        description: Register a new user
 *        parameters:
 *          - in: body
 *            name: user
 *            schema:
 *            type: string
 *          - email: user
 *            schema:
 *            type: string
 *          - mobile: user
 *            in: body
 *            schema:
 *            type: string
 *          - password: user
 *            in: body
 *            schema:
 *            type: string
 *          - kyc: user
 *            in: body
 *            schema:
 *            type: boolean
 *          - gender: user
 *            in: body
 *            schema:
 *            type: string
 * 
 *        responses:
 *         '200':
 *              description: A successful response
 *              content:
 *                application/json:
 *                  schema:
 *                   items:
 *                      $ref: '#/components/schemas/User'
 */

let userHelper = require('../helpers/user');
const express = require('express');
const passport = require("passport");
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, process.env.ROUND);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashedPassword,
            kyc: false,
            profile_photo: './assets/profile_photos/default.png',
            owned_products: []
        });
        user.save();
        res.redirect('/login');
    } catch (err) {
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.send('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;