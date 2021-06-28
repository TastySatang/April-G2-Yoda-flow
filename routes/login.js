const express = require("express");
const router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models/");
const bcrypt = require("bcryptjs");
const { loginUser } = require("../auth")
const { check, validationResult } = require("express-validator")

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
          return res.redirect("/");
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

module.exports = router;
