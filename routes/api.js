const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");

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
  check("upvote")
    .exists({ checkNull: true })
    .withMessage("There need to be a vote to vote"),
];

router.post(
  "/questions/:id(\\d+)/votes",
  requireAuth,
  voteValidator,
  asyncHandler(async (req, res) => {
    console.log("INSIDE THE ROUT");
    const { upvote } = req.body;
    const questionId = req.params.id;
    const { userId } = req.session.auth;

    let errors = [];
    const validationErrors = validationResult(req);
    console.log(validationErrors.isEmpty());
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

        return res.json({ vote });
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

router.put(
  "/questions/:id(\\d+)/votes",
  requireAuth,
  voteValidator,
  asyncHandler(async (req, res) => {
    console.log("INSIDE PU");
    const { upvote } = req.body;
    const questionId = req.params.id;
    const { userId } = req.session.auth;

    let errors = [];
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const vote = await db.QuestionVote.findOne({
        where: {
          questionId,
          userId,
        },
      });

      await vote.update({ upvote, questionId, userId });

      return res.json({ vote });
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
  "/questions/:id(\\d+)/votes/",
  requireAuth,
  asyncHandler(async (req, res) => {
    console.log("inside the route");
    const questionId = req.params.id;
    const { userId } = req.session.auth;
    const vote = await db.QuestionVote.findOne({
      where: {
        questionId,
        userId,
      },
    });
    if (vote && vote.userId === userId) {
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

// router.get(
//   "question/:qid(\\d+)/answers/:aid(\\d+)/votes",
//   asyncHandler(async (req, res) => {
//     const answerId = req.params.aid;
//     const questionId = req.params.qid;

//     const votesArr = await db.AnswerVote.findAll({
//       where: {
//         answerId,
//         questionId,
//       },
//     });

//     res.json({ votesArr });
//   })
// );

// const answerVoteValidator = [
//   check("userId")
//     .exists({ checkFalsy: true })
//     .withMessage("There needs to a user associated with the vote"),
//   check("answerId")
//     .exists({ checkFalsy: true })
//     .withMessage("There needs to be a question to be able to vote"),
//   check("upvote")
//     .exists({ checkFalsy: true })
//     .withMessage("There need to be a vote to vote"),
// ];

// router.post(
//   "question/:qid(\\d+)/answers/:id(\\d+)/votes",
//   answerVoteValidator,
//   asyncHandler(async (req, res) => {
//     const { userId, answerId, upvote } = req.body;

//     let errors = [];
//     const validationErrors = validationResult(req);
//     if (validationErrors.isEmpty()) {
//       let user = await db.AnswerVote.findAll({
//         where: {
//           userId,
//           answerId,
//         },
//       });

//       if (user.length) {
//         errors.push("You can't vote twice");
//       } else {
//         let vote = await db.AnswerVote.create({ userId, answerId, upvote });

//         res.json({ vote });
//       }
//     } else {
//       errors = validationErrors.array().map((error) => error.msg);
//     }
//     const err = Error("Bad request.");
//     err.errors = errors;
//     err.status = 400;
//     err.title = "Bad request.";
//     res.json({ err });
//   })
// );

// router.patch(
//   "/questions/:id(\\d+)/votes/:vid(\\d+)",
//   answerVoteValidator[2],
//   asyncHandler(async (req, res) => {
//     const voteId = req.params.vid;
//     const { upvote } = req.body;

//     let errors = [];
//     const validationErrors = validationResult(req);

//     if (validationErrors.isEmpty()) {
//       const vote = await db.QuestionVote.findByPk(voteId);

//       await vote.update({ upvote });

//       res.json({ vote });
//     } else {
//       errors = validationErrors.array().map((error) => error.msg);
//       const err = Error("Bad request.");
//       err.errors = errors;
//       err.status = 400;
//       err.title = "Bad request.";
//       res.json({ err });
//     }
//   })
// );

// router.delete(
//   "/questions/:id(\\d+)/votes/:vid(\\d+)",
//   asyncHandler(async (req, res) => {
//     const voteId = req.params.vid;
//     const vote = await db.QuestionVote.findByPk(voteId);
//     if (vote) {
//       await vote.destroy();
//       res.status(204).end();
//     } else {
//       const err = Error("Bad request.");
//       err.status = 400;
//       err.title = "Bad request.";
//       res.json({ err });
//     }
//   })
// );

module.exports = router;
