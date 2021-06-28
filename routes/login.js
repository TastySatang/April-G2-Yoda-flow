const express = require("express");
const router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models/");
const bcrypt = require("bcryptjs");

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

router.post(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

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
        //add logIn user
        return res.redirect("/");
      }
    }
  })
);

module.exports = router;
