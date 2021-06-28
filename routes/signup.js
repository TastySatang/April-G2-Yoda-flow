const express = require('express');
const router = express.Router();
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.get('/', csrfProtection, asyncHandler(async (req, res) => {
    res.render('signup', { csrfToken: req.csrfToken() });
}));

module.exports = router;
