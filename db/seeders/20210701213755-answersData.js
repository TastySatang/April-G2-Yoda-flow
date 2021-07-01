'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Answers', [{
      content: "Oh I just remembered! Degobah!", userId: 1 , questionId: 1 , createdAt: new Date(),
      updatedAt: new Date()
    }, {
      content: "Yoda is on Degobah!", userId: 2, questionId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "It's green! Hope that helps, cheater. Give me a vote please!", userId: 4, questionId: 2, createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: "Well actually, it depends. In A New Hope and Empire Strikes Back, it's green. But he loses it in Empire, so in Return of the Jedi it is green!", userId: 5, questionId: 2, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "On Tatooine! See I did pay attention to some of these movies haha.", userId: 4, questionId: 4, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Wrong series dude!", userId: 5, questionId: 9, createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: "Please go away!", userId: 3, questionId: 9, createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: "Why would you come here and ruin our time by trolling us with Star Trek. Some of us need this, dude.", userId: 4, questionId: 9, createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
