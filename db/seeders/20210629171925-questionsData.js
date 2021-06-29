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
    return queryInterface.bulkInsert('Questions', [
      {
        content: "Test question 1" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 2" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 3" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 4" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 5" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 6" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 7" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 8" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 9" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 1" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 10" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 11" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 12" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 13" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Test question 14" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
