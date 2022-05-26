'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert(
     "Users",
     [
       {
         // 1
         firstName: "First",
         lastName: "FirstLastName",
         email: "demo@user.io",
         username: "Demo-lition",
         hashedPassword: bcrypt.hashSync("password"),
         imageUrl: "image url",
       },
       {
         // 2
         firstName: "Two",
         lastName: "TwoLastName",
         email: "user1@user.io",
         username: "FakeUser1",
         hashedPassword: bcrypt.hashSync("password2"),
         imageUrl: "image url",
       },
       {
         // 3
         firstName: "Tres",
         lastName: "TresLastName",
         email: "user2@user.io",
         username: "FakeUser2",
         hashedPassword: bcrypt.hashSync("password3"),
         imageUrl: "image url",
       },
       {
         // 4
         firstName: "Bryan",
         lastName: "Aubert",
         email: "sspu@sspu.com",
         username: "FrontMan",
         hashedPassword: bcrypt.hashSync("singerMan"),
         imageUrl: "image url",
       },
       {
         // 5
         firstName: "Richard",
         lastName: "Ashcroft",
         email: "theverve@verve.com",
         username: "LuckyMan",
         hashedPassword: bcrypt.hashSync("RollingStones$toleMyMoney"),
         imageUrl: "image url",
       },
       {
         // 6
         firstName: "Kevin",
         lastName: "Barrios",
         email: "fake@email.com",
         username: "anonymous",
         hashedPassword: bcrypt.hashSync("Top5ecret"),
         imageUrl: "image url",
       },
     ],
     {}
   );
  },

  async down (queryInterface, Sequelize) {
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete('Users', {
    //   username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    // }, {})
    await queryInterface.bulkDelete('Users', null, {});
  }
};
