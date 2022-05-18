'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Users",[
       { // 1
         firstName: "First",
         lastName: "FirstLastName",
         email: "demo@user.io",
         username: "Demo-lition",
         hashedPassword: bcrypt.hashSync("password"),
       },
       { // 2
         firstName: "Two",
         lastName: "TwoLastName",
         email: "user1@user.io",
         username: "FakeUser1",
         hashedPassword: bcrypt.hashSync("password2"),
       },
       { // 3
         firstName: "Tres",
         lastName: "TresLastName",
         email: "user2@user.io",
         username: "FakeUser2",
         hashedPassword: bcrypt.hashSync("password3"),
       },
       { // 4
        firstName: 'Bryan',
        lastName: 'Aubert',
        email: "sspu@sspu.com",
        username: 'FrontMan',
        hashedPassword: bcrypt.hashSync("singerMan")
       },
       { // 5
       firstName: "Richard",
       lastName: "Ashcroft",
       email: 'theverve@verve.com',
       username: "LuckyMan",
       hashedPassword: bcrypt.hashSync("RollingStonesStoleMyMoney$")
       },
       { // 6
         firstName: "Kevin",
         lastName: "Barrios",
         email: "fake@email.com",
         username: 'anonymous',
         hashedPassword: bcrypt.hashSync('Top5ecret')
       }
     ],
     {}
   );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete('Users', {
    //   username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    // }, {})
    await queryInterface.bulkDelete('Users', null, {});
  }
};
