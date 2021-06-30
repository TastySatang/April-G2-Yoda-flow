const express = require('express');
const router = express.Router();
const {csrfProtection, asyncHandler}= require('./utils');
const db =require('../db/models');
const { check, validationResult } = require("express-validator")
const { loginUser, requireAuth } = require("../auth")
const { questionId } =require('./question')


router.get('/question/:questionId(\\d+)/answer/new', csrfProtection, requireAuth, asyncHandler(async(req, res, next)=> {

    res.render('new-answer', {
        title: "Answer-Yoda-Flow",
        csrfToken: req.csrfToken(),
    })

}));

module.exports = router;
