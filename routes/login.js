const express = require("express");
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");

const { loginUser } = require("../auth")
const db = require("../db/models/");
const { asyncHandler, csrfProtection } = require("./utils");

const router = express.Router();

router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const email = null;
    res.render("login", {
      title: "Login-Yoda-Flow",
      email,
      csrfToken: req.csrfToken(),
    });
  })
);

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
]

router.post(
  "/",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const errors = [];
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (user !== null) {
        const passwordMatched = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );
        if (passwordMatched) {
          loginUser(req, res, user);
          return req.session.save(() => res.redirect("/"));
        }
      }
      errors.push('Login failed for email and password')
    } else {
      errors = validationErrors.array().map(error => error.msg)
    }

    res.render('login', {
      csrfToken: req.csrfToken(),
      title: 'Login-Yoda-Flow',
      email,
      errors,
    })
  })
);

router.post('/demo', asyncHandler(async (req, res) => {
  req.session.auth = {
    userId: 1
  }
  req.session.save(() => res.redirect("/"));
}))

module.exports = router;
