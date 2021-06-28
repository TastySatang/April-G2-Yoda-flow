const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { loginUser } = require("../auth");
const db = require("../db/models/");
const { asyncHandler, csrfProtection } = require("./utils");

const router = express.Router();

const signupValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for username")
    .isLength({ max: 50 })
    .withMessage("Name is too long, please provide a name under 50 characters"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please enter email")
    .isLength({ max: 100 })
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please input a password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      "Please provide a password with at least one lowercase letter, one uppercase letter, one number, and one special character: !@#$%^&*"
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please put in the password again")
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error(`Passwords don't match`);
      }
      return true;
    }),
];

router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = db.User.build();
    res.render("signup", {
      csrfToken: req.csrfToken(),
      user,
      title: "SignUp-Yoda-Flow",
    });
  })
);

router.post(
  "/",
  csrfProtection,
  signupValidators,
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = db.User.build({
      name,
      email,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;

      await user.save();
      loginUser(req, res, user);
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("signup", {
        csrfToken: req.csrfToken(),
        user,
        errors,
        title: "SignUp-Yoda-Flow",
      });
    }
  })
);

module.exports = router;
