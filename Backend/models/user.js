const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    kyc: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Male'
    },
    profile_photo: {
        type: String,
        default: './assets/profile_photos/default.png'
    },
    owned_products: [{
        product_category: String,
        product_id: Schema.Types.ObjectId,
        product_name: String,
        product_price: Number,
        product_image: String
    }]
});