"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "demo",
          email: "demo@demo.com",
          hashedPassword:
            "$2a$10$W0dMKHhiMCNCo2pIqvaVq.cgoLeD5UMhYDD69jo6vCmbYUbMKMm6.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Test1",
          email: "Test1@Test1.com",
          hashedPassword:
            "$2a$10$W0dMKHhiMCNCo2pIqvaVq.cgoLeD5UMhYDD69jo6vCmbYUbMKMm6.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Test2",
          email: "Test2@Test2.com",
          hashedPassword:
            "$2a$10$W0dMKHhiMCNCo2pIqvaVq.cgoLeD5UMhYDD69jo6vCmbYUbMKMm6.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Test3",
          email: "Test3@Test3.com",
          hashedPassword:
            "$2a$10$W0dMKHhiMCNCo2pIqvaVq.cgoLeD5UMhYDD69jo6vCmbYUbMKMm6.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },
};
