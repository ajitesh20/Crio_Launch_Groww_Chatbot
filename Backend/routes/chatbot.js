let categoryHelper = require('../helpers/category');
const express = require('express');
const router = express.Router();

router.get('/get-all-categories', categoryHelper.getAllCategories);

module.exports = router;