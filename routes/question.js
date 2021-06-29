const { User } = require('discord.js');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator")
const { loginUser, requireAuth } = require("../auth")
const db = require("../db/models/");
const { asyncHandler, csrfProtection } = require("./utils");

const questionValidator = [
    check("title")
        .exists({ checkFalsy: true })
        .withMessage("Please enter a valid title.")
        .isLength({ max: 100 })
        .withMessage("Please keep the title under 100 characters!")
    ,
    check("content")
        .exists({ checkFalsy: true })
        .withMessage("Please enter a valid question here.")
]

router.get('/', asyncHandler(async (req, res) => {

    const questions = await db.Question.findAll({
        limit: 10,
        order: [['updatedAt', 'DESC']]
    });

    res.render('questions', { questions });

}));


router.get('/new', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    res.render('new-question', {
        title: "New Question Yoda Flow",
        csrfToken: req.csrfToken()
    });
}));

router.post('/new', requireAuth, csrfProtection, questionValidator, asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
        const question = await db.Question.build({
            userId: res.locals.user.id,
            title,
            content,
        });

        await question.save();
        req.session.save(() => res.redirect('/questions'));
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        res.render('new-question', {
            csrfToken: req.csrfToken(),
            errors
        })
    }
}))

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const question = await db.Question.findByPk(questionId, {
        include: db.User
    })
    res.render('single-question', {
        title: 'Individual-Quesiton-Yoda-Flow',
        question
    })
}))


module.exports = router;
