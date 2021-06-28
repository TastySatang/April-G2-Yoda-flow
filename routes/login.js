const express = require("express");
const router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");

/* GET home page. */
router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const email = null;
    res.render("login", { title: "Login-Yoda-Flow", email });
  })
);

module.exports = router;
