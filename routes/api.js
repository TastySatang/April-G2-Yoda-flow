const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler } = require("./utils");

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

    votesArr.forEach((vote) => {
      if (vote.upvote) {
        votes += 1;
      } else {
        votes -= 1;
      }
    });

    res.json({ votes });
  })
);

module.exports = router;
