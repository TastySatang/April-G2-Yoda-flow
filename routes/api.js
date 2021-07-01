const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");

router.get(
  "/questions/:id(\\d+)/votes",
  asyncHandler(async (req, res) => {
    const questionId = req.params.id;

    const votesArr = await db.QuestionVote.findAll({
      where: {
        questionId,
      },
    });

    res.json({ votesArr });
  })
);

const voteValidator = [
  check("userId")
    .exists({ checkFalsy: true })
    .withMessage("There needs to a user associated with the vote"),
  check("questionId")
    .exists({ checkFalsy: true })
    .withMessage("There needs to be a question to be able to vote"),
  check("upvote")
    .exists({ checkFalsy: true })
    .withMessage("There need to be a vote to vote"),
];

router.post(
  "/questions/:id(\\d+)/votes",
  voteValidator,
  asyncHandler(async (req, res) => {
    const { userId, questionId, upvote } = req.body;

    let errors = [];
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      let user = await db.QuestionVote.findAll({
        where: {
          userId,
          questionId,
        },
      });

      if (user.length) {
        errors.push("You can't vote twice");
      } else {
        let vote = await db.QuestionVote.create({ userId, questionId, upvote });

        res.json({ vote });
      }
    } else {
      errors = validationErrors.array().map((error) => error.msg);
    }
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    res.json({ err });
  })
);

router.patch(
  "/questions/:id(\\d+)/votes/:vid(\\d+)",
  voteValidator[2],
  asyncHandler(async (req, res) => {
    const voteId = req.params.vid;
    const { upvote } = req.body;

    let errors = [];
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const vote = await db.QuestionVote.findByPk(voteId);

      await vote.update({ upvote });

      res.json({ vote });
    } else {
      errors = validationErrors.array().map((error) => error.msg);
      const err = Error("Bad request.");
      err.errors = errors;
      err.status = 400;
      err.title = "Bad request.";
      res.json({ err });
    }
  })
);

router.delete(
  "/questions/:id(\\d+)/votes/:vid(\\d+)",
  asyncHandler(async (req, res) => {
    const voteId = req.params.vid;
    const vote = await db.QuestionVote.findByPk(voteId);
    if (vote) {
      await vote.destroy();
      res.status(204).end();
    } else {
      const err = Error("Bad request.");
      err.status = 400;
      err.title = "Bad request.";
      res.json({ err });
    }
  })
);

module.exports = router;
