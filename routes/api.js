const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");

router.get(
  "/questions/:id(\\d+)/votes",
  asyncHandler(async (req, res) => {
    let votes = 0;
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
    .withMessage("There needs to a user associated with the vote")
    .custom(async (value, { req }) => {
      let user = await db.QuestionVote.findAll({
        where: {
          userId: value,
          questionId: req.body.questionId,
        },
      });
      if (user) {
        Promise.reject("You cannont vote on a question more than once");
      }
    }),
  check("questionId")
    .exists({ checkFalsy: true })
    .withMessage("There needs to be a question to be able to vote"),
  check("upvote")
    .exists({ checkFalsy: true })
    .withMessage("There need to be a vote to vote"),
];

router.post(
  "/questions/:id(\\d+)/votes",
  asyncHandler(async (req, res) => {
    const { userId, questionId, upvote } = req.body;
    let vote = await db.QuestionVote.create({ userId, questionId, upvote });

    res.json({ vote });
  })
);

router.put(
  "/questions/:id(\\d+)/votes/:vid(\\d+)",
  asyncHandler(async (req, res) => {
    const voteId = req.params.vid;
    const { userId, questionId, upvote } = req.body;

    const vote = await db.QuestionVote.findByPk(voteId);

    await vote.update({ userId, questionId, upvote });

    res.json({ vote });
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
    }
  })
);

module.exports = router;
