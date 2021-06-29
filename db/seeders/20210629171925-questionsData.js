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
        title: "Test 1", content: "Test question 1" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 2", content: "Test question 2" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 3",
        content: "Test question 3" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 4",
        content: "Test question 4" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 5",
        content: "Test question 5" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 6",
        content: "Test question 6" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 7",
        content: "Test question 7" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 8",
        content: "Test question 8" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 9",
        content: "Test question 9" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 10",
        content: "Test question 10" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 11",
        content: "Test question 11" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 12",
        content: "Test question 12" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 13",
        content: "Test question 13" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 14",
        content: "Test question 14" , userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Test 15",
        content: "Test question 15" , userId: 1, createdAt: new Date(),
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
