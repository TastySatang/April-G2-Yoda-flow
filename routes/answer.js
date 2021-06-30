const express = require('express');
const router = express.Router();
const {csrfProtection, asyncHandler}= require('./utils');
const db =require('../db/models');
const { check, validationResult } = require("express-validator")
const { loginUser, requireAuth } = require("../auth")
const { questionId } =require('./question')


router.get('/questions/:questionId(\\d+)/answer/new', csrfProtection, requireAuth, asyncHandler(async(req, res, next)=> {
    const questionId = req.params.questionId;
    const question = await db.Question.findByPk(questionId);

    res.render('new-answer', {
        title: "Answer-Yoda-Flow",
        csrfToken: req.csrfToken(),
        question
    })

}));

router.post(`/questions/:questionId(\\d+)/answer/new`, csrfProtection, requireAuth, asyncHandler(async(req, res)=>{
    const questionId = req.params.questionId;
    const question = await db.Question.findByPk(questionId);

    const { content } = req.body;

    const answer = db.Answer.build({
        userId: res.locals.user.id,
        content,
        questionId
    })
    await answer.save();
    req.session.save(() => res.redirect(`/questions/${question.id}`));
}))


router.post('/questions/:questionId(\\d+)/answer/:answerId(\\d+)', asyncHandler(async (req, res) => {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const answer = await db.Answer.findByPk(answerId);

    await answer.destroy();
    req.session.save(() => res.redirect(`/questions/${questionId}`));
}));
module.exports = router;
