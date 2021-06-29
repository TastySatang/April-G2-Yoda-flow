const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator")
const { loginUser } = require("../auth")
const db = require("../db/models/");
const { asyncHandler, csrfProtection } = require("./utils");

router.get('/', asyncHandler(async (req, res) => {

    const questions = await db.Question.findAll();

    res.render('questions', { questions });

}));



module.exports = router;
