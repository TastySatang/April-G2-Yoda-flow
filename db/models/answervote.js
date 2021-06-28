'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerVote = sequelize.define('AnswerVote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    upvote: DataTypes.BOOLEAN
  }, {});
  AnswerVote.associate = function (models) {
    // associations can be defined here
  };
  return AnswerVote;
};
