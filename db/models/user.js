'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING.BINARY
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Question, { foreignKey: 'userId' })
    User.hasMany(models.Answer, { foreignKey: 'userId' });
    User.hasMany(models.QuestionVote, { foreignKey: 'userId' })
    User.hasMany(models.AnswerVote, { foreignKey: 'userId' })
  };
  return User;
};
