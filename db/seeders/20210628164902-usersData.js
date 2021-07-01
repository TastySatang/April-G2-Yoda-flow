'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'demo',
      email: 'demo@demo.com',
      hashedPassword: '$2a$10$I5jnHhIY14y1ntVQ1hGxHevJV5GYmb04ko.fLNefFDuDCuPyYrBAq',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
        name: 'Obi Wan Kenobi',
        email: 'obiwan@kenobi.com',
        hashedPassword: '$2a$10$I5jnHhIY14y1ntVQ1hGxHevJV5GYmb04ko.fLNefFDuDCuPyYrBAq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Darth Vader',
        email: 'vader@vader.com',
        hashedPassword: '$2a$10$I5jnHhIY14y1ntVQ1hGxHevJV5GYmb04ko.fLNefFDuDCuPyYrBAq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Leslie Knopes',
        email: 'leslie@pawnee.gov',
        hashedPassword: '$2a$10$I5jnHhIY14y1ntVQ1hGxHevJV5GYmb04ko.fLNefFDuDCuPyYrBAq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rick Sanchez',
        email: 'rick@genius.com',
        hashedPassword: '$2a$10$I5jnHhIY14y1ntVQ1hGxHevJV5GYmb04ko.fLNefFDuDCuPyYrBAq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jean Luc-Picard',
        email: 'jean@enterprise.fed',
        hashedPassword: '$2a$10$I5jnHhIY14y1ntVQ1hGxHevJV5GYmb04ko.fLNefFDuDCuPyYrBAq',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
