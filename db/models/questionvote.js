'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionVote = sequelize.define('QuestionVote', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    upvote: DataTypes.BOOLEAN
  }, {});
  QuestionVote.associate = function(models) {
    // associations can be defined here
  };
  return QuestionVote;
};