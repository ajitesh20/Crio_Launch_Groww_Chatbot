const express = require('express');
const authHelper = require('../helpers/auth_helper');
const authValidator = require('../validators/auth_validators');
const requireLogin = require('../utils/requireLogin');

let router = express.Router();

router.post('/register', authValidator.registerValidation, authHelper.registerUser);
router.post('/login', authValidator.loginValidation, authHelper.loginUser);
router.post('/logout', authHelper.logoutUser);
router.get('/kyc', requireLogin, authHelper.updateKycStatus);

module.exports = router;