const express = require('express');
const router = express.Router();
const {csrfProtection, asyncHandler}= require('./utils');
const db =require('../db/models');
const { check, validationResult } = require("express-validator")
const { loginUser, requireAuth } = require("../auth")
const { questionId } =require('./question')

const answerValidator = [
    check("content")
        .exists({ checkFalsy: true })
        .withMessage("Please enter a valid answer here.")
]

router.get('/questions/:questionId(\\d+)/answer/new', csrfProtection, requireAuth, asyncHandler(async(req, res, next)=> {
    const questionId = req.params.questionId;
    const question = await db.Question.findByPk(questionId);

    res.render('new-answer', {
        title: "Answer-Yoda-Flow",
        csrfToken: req.csrfToken(),
        question
    })

}));

router.post(`/questions/:questionId(\\d+)/answer/new`, csrfProtection, requireAuth, answerValidator, asyncHandler(async(req, res)=>{
    const questionId = req.params.questionId;
    const question = await db.Question.findByPk(questionId);

    const { content } = req.body;

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
        const answer = db.Answer.build({
            userId: res.locals.user.id,
            content,
            questionId
        })
        await answer.save();
        req.session.save(() => res.redirect(`/questions/${question.id}`));
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        res.render('new-answer', {
            title: "Answer-Yoda-Flow",
            csrfToken: req.csrfToken(),
            errors,
            question
        })
    }
}))


router.post('/questions/:questionId(\\d+)/answer/:answerId(\\d+)', asyncHandler(async (req, res) => {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const answer = await db.Answer.findByPk(answerId);

    await answer.destroy();
    req.session.save(() => res.redirect(`/questions/${questionId}`));
}));

router.get('/questions/:questionId(\\d+)/answer/:answerId(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async(req, res) => {
    const answerId = req.params.answerId;
    const answer = await db.Answer.findByPk(answerId, {
        include: db.Question,
        where: {
            questionId
        }
    });
    // const question = await db.Question.findByPk(req.params.questionId)

    if (req.session.auth.userId === answer.userId) {
        res.render('update-answer', {
            csrfToken: req.csrfToken(),
            title: "Update-Yoda-Flow",
            answer,
            // question
        })
    } else {
        res.send(403)
    }
}))

router.post('/questions/:questionId(\\d+)/answer/:answerId(\\d+)/edit', requireAuth, answerValidator, csrfProtection, asyncHandler(async (req, res) => {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const answer = await db.Answer.findByPk(answerId, {
        include: db.Question,
        where: {
            questionId
        }
    });
    const { content } = req.body;

    const updatedAnswer = {
        content
    }

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        await answer.update(updatedAnswer);
        req.session.save(() => res.redirect(`/questions/${questionId}`));
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        res.render('update-answer', {
            title: "Update-Yoda-Flow",
            csrfToken: req.csrfToken(),
            errors,
            answer
        })
    }

}))

module.exports = router;
