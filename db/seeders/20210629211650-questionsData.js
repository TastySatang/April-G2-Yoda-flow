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
        title: "What planet did Yoda flee to?", content: "Hello. I am wondering what planet Luke found Yoda on in Empire Strikes Back. I need to do for my exams!", userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What color is Luke Skywalker's lightsaber?", content: "I am just wondering. Definitely not taking an A/a assessment that asked me this or anything...", userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Looking for a good cantina on Tatooine.",
        content: "Hello. Just moved to the planet, wondering where a good place to get a stiff drink is?", userId: 2, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What planet does Obi-Wan Kenobi live on?",
        content: "Hey there! Just recently discovered these films exist. I wanna know what planet Obi-wan Kenobi is hiding out on after episode 3?", userId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Where is a good place to buy Star Wars merchandise?",
        content: "Hello! I'm throwing a family friendly picnic in the park this upcoming May 4th, and I figured it would be a good idea to have it be Star Wars day considering the date! Anyone know where I can get some decorations?", userId: 4, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "A good Star Wars comic to start with and read?",
        content: "Hey it's me again! Really been getting on the Star Wars thing again recently, haha. I was wondering what comics might be good to read? Should I start with stuff in the Legends continuity, or read any of the canon comics? I've heard the new Vader and the new Doctor Aphra comics are neat. What do you suggest?", userId: 4, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Who thought of the physics for these movies?",
        content: "This isn't how physics works at all. It's nonsensical, ships don't float like boats in space! Who made up the rules?!", userId: 5, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What did Luke Skywalker lose to Darth Vader in his first fight with him?",
        content: "Hey I'm just wondering what was it Luke lost! I'm confused haha, I was on my phone right at that scene but he started screaming and I was confused.", userId: 4, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What's a good wine to drink?",
        content: "You're gonna need it cause I'm gonna explain to you why the Federation is so great!", userId: 6, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What nickname does Han Solo call Luke Skywalker?",
        content: "Just wondering. Got a side kick of my own and I'm just trying to find a way to annoy him since he's very inept!", userId: 5, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Who freed Princess Leia?",
        content: "Hey I was on my phone during the scene they're at the slugs house. Leia was chained up, but next thing I knew she was free? What happened?", userId: 4, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What language does R2D2 speak?",
        content: "Hey I'm just wondering if R2D2 has a language or anything. Anyone know?", userId: 1, createdAt: new Date(),
        updatedAt: new Date()
      }
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
