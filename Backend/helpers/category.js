const mongoose = require('mongoose');
let categoryModel = require('../models/category');

let categoryHelper = {
    getAllCategories: function (req, res, next) {
        let searchPara = {};
        if (req.query.id !== undefined)
            searchPara._id = req.query.id;

        categoryModel.find(searchPara, function (err, categories) {
            if (err) {
                res.status(500).json({
                    message: "Error getting categories",
                    error: err
                });
            } else {
                res.status(200).json({
                    message: "Successfully got categories",
                    categories: categories
                });
            }
        });
    }
}

module.exports = categoryHelper;