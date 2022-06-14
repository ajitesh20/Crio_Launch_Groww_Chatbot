let categoryHelper = require('../helpers/category');
let faqHelper = require('../helpers/faq');
let userHelper = require('../helpers/user');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { res.send("Home") })
router.get('/get-all-categories', categoryHelper.getAllCategories);
router.get('/get-answer-by-questonId/:categoryId/:questionPos', faqHelper.faqByIdPos);
router.get('/get-answer-by-category/:categoryId', faqHelper.faqById);
router.get("/getMaxOrderLimit", userHelper.getMaxOrders);
router.get("/order-specific-questions",);

module.exports = router;