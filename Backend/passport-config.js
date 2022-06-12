const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

function initialize(passport, getUserbyId) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email: email })
            .then(async user => {
                if (!user) {
                    return done(null, false, {message: 'No user found'});
                }

                try {
                    if (await bcrypt.compare(password, user.password)) {
                        return done(null, user);
                    } else return done(null, false, {message: 'Incorrect password'});
                } catch (err) {
                    return done(err);
                }
            })
            .catch(err => done(err));
    }));
    passport.serializeUser((user, done) => { return done(null, user.id); });
    passport.deserializeUser((id, done) => { return done(null, getUserbyId(id)); });
}

module.exports = initialize;