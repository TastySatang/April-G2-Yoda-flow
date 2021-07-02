"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "QuestionVotes",
      [
        {
          userId: 1,
          questionId: 1,
          upvote: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          questionId: 1,
          upvote: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          questionId: 1,
          upvote: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          questionId: 2,
          upvote: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          questionId: 2,
          upvote: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          questionId: 2,
          upvote: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("QuestionVotes", null, {});
  },
};
