const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    max_orders_per_day: {
        type: Number,
        default: 10
    },
    owned_products: [{
        product_category: String,
        product_id: Schema.Types.ObjectId,
        product_name: String,
        product_price: Number,
        product_image: String
    }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema, 'user');