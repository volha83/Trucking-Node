const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function passportInit(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email.toLowerCase() });
                if (!user) return done(null, false, { message: "Wrong email or password" });

                const ok = await bcrypt.compare(password, user.passwordHash);
                if (!ok) return done(null, false, { message: "Wrong email or password" });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id).select("_id name email");
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

};