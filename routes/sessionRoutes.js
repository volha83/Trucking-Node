const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.get("/register", (req, res) => res.render("register"));
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
        req.flash("error", "Email already registered");
        return res.redirect("/sessions/register");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ name, email: email.toLowerCase(), passwordHash });
    req.flash("success", "Registration successful. Please log in");
    res.redirect("/sessions/logon");
});

router.get("/logon", (req, res) => res.render("logon"));
router.post("/logon", passport.authenticate("local", {
    successRedirect: "/weeks",
    failureRedirect: "/sessions/logon",
    failureFlash: true,
})
);
router.post("/logoff", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logged off");
        res.redirct("/");
    });
});
module.exports = router;

