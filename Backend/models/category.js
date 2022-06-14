const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    product_category: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_image: {
        type: String,
        required: true
    }
});

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    products: [{
        type: productSchema
    }]
});

module.exports = mongoose.model('Category', categorySchema);