const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        product_id: Schema.Types.ObjectId,
        product_name: String,
        product_price: Number,
        product_image: String
    }]
});

module.exports = mongoose.model('Category', categorySchema);