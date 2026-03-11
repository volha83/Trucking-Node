const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.get("/register", (req, res) => res.render("register"));

router.post("/register", async (req, res, next) => {
  const { name, email, password, password1 } = req.body;

  if (!name || !email || !password || !password1) {
    req.flash("error", "Please fill in all fields");
    return res.redirect("/sessions/register");
  }

  if (password != password1) {
    req.flash("error", "The passwords entered do not match");
    return res.redirect("/sessions/register");
  }

  if (password.length < 6) {
    req.flash("error", "Password must be at least 6 characters");
    return res.redirect("/sessions/register");
  }

  try {
    const exists = await User.findOne({ email: email.toLowerCase() });

    if (exists) {
      req.flash("error", "Email already registered");
      return res.redirect("/sessions/register");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
    });

    req.flash("info", "Registration successful. Please log in");
    res.redirect("/sessions/logon");
  } catch (error) {
    if (error.name === "ValidationError") {
      Object.values(error.errors).forEach((err) => {
        req.flash("error", err.message);
      });
      return res.redirect("/sessions/register");
    }

    return next(error);
  }
});

router.get("/logon", (req, res) => res.render("logon"));

router.post(
  "/logon",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sessions/logon",
    failureFlash: true,
  }),
);

router.post("/logoff", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("info", "Logged off");
    res.redirect("/");
  });
});

module.exports = router;
