const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator")
const { loginUser } = require("../auth")
const db = require("../db/models/");
const { asyncHandler, csrfProtection } = require("./utils");


router.get('/', asyncHandler(async (req, res) => {

    const questions = await db.Question.findAll({
        limit: 10,
        order: [['updatedAt', 'DESC']]
    });

    res.render('questions', { questions });

}));

router.get('/new', csrfProtection, asyncHandler(async (req, res) => {
    res.render('new-question', {
        title: "New Question Yoda Flow"
    });
}))


module.exports = router;
