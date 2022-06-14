const userModel = require('../models/user');

let userHelper = {
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    getMaxOrders: function (req, res) {
        userModel.findOne({ _id: req.session.user._id }, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: "Error getting max orders",
                    error: err
                });
            }
            else {
                res.status(200).json({
                    message: "Successfully got max orders",
                    maxOrders: user.max_orders_per_day
                });
            }
        });
    }
};

module.exports = userHelper;