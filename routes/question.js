const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator")
const { loginUser, requireAuth } = require("../auth")
const db = require("../db/models/");
const { asyncHandler, csrfProtection } = require("./utils");


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

router.post('/new', requireAuth, csrfProtection, asyncHandler(async(req,res)=>{
    const { content } = req.body;

    const question = await db.Question.build({
        userId: res.locals.user.id,
        content,
    });

    await question.save();
    req.session.save(() => res.redirect('/questions'));
}))


module.exports = router;
