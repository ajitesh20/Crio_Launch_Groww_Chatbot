const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    questionAnswers: [{
        question: String,
        answer: String
    }]
});

module.exports = mongoose.model('Faq', faqSchema, 'faq');