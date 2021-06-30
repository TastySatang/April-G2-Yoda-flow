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
    const answers = await db.Answer.findAll({
        include: [
            db.User,
            db.Question
        ],
        where: {
            questionId
        }
    });
    if (req.session.auth) {
        const user = req.session.auth.userId
        // console.log(req.session.auth.userId)
        res.render('single-question', {
            title: 'Individual-Quesiton-Yoda-Flow',
            question,
            answers,
            user
        })
    } else {
        res.render('single-question', {
            title: 'Individual-Quesiton-Yoda-Flow',
            question,
            answers
        })
    }
}));


router.post('/:id(\\d+)', asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const question = await db.Question.findByPk(questionId);

    await question.destroy();
    req.session.save(() => res.redirect('/questions'));
}));

router.get('/:id(\\d+)/edit', csrfProtection, requireAuth, questionValidator, asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const question = await db.Question.findByPk(questionId);

    res.render('update-question', {
        question,
        csrfToken: req.csrfToken()
    })
}))

router.post('/:id(\\d+)/edit', requireAuth, csrfProtection, questionValidator, asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const question = await db.Question.findByPk(questionId);
    const { title, content } = req.body;

    const updatedQuestion = {
        title,
        content
    }

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {

        await question.update(updatedQuestion);
        req.session.save(() => res.redirect(`/questions/${questionId}`));
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        res.render('new-question', {
            csrfToken: req.csrfToken(),
            errors
        })
    }
}))



module.exports = router;
