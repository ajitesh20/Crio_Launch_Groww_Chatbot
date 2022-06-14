const faqModel = require('../models/faq');

const faqHelper = {
    faqByIdPos: function (req, res) {
        const categoryId = req.params.categoryId.toString();
        const questionPos = parseInt(req.params.questionPos);
        if (
            categoryId === null ||
            categoryId === undefined ||
            questionPos === null ||
            questionPos === undefined
        ) {
            res.sendStatus(404);
        }
        else {
            faqModel.findOne({ categoryId: categoryId }, function (err, faq) {
                if (err) {
                    res.status(500).json({
                        message: "Error getting faq",
                        error: err
                    });
                }
                else {
                    if (faq === null || faq === undefined) {
                        res.sendStatus(404);
                    }
                    else {
                        if (questionPos < 0 || questionPos >= faq.answers.length) {
                            res.sendStatus(404);
                        }
                        else {
                            res.status(200).json({
                                message: "Successfully got faq",
                                faq: faq.questionAnswers[questionPos]
                            });
                        }
                    }
                }
            });
        }
    },
    faqById: function (req, res) {
        const categoryId = req.params.categoryId.toString();
        if (categoryId === null || categoryId === undefined) {
            res.sendStatus(404);
        }
        else {
            faqModel.findOne({ categoryId: categoryId }, function (err, faq) {
                if (err) {
                    res.status(500).json({
                        message: "Error getting faq",
                        error: err
                    });
                }
                else {
                    if (faq === null || faq === undefined) {
                        res.sendStatus(404);
                    }
                    else {
                        res.status(200).json({
                            message: "Successfully got faq",
                            faq: faq.questionAnswers
                        });
                    }
                }
            });
        }
    }
};

module.exports = faqHelper;