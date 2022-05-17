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
   return queryInterface.bulkInsert(
     "Users",
     [
       {
         firstName: "First",
         lastName: "FirstLastName",
         email: "demo@user.io",
         username: "Demo-lition",
         hashedPassword: bcrypt.hashSync("password"),
       },
       {
         firstName: "Two",
         lastName: "TwoLastName",
         email: "user1@user.io",
         username: "FakeUser1",
         hashedPassword: bcrypt.hashSync("password2"),
       },
       {
         firstName: "Tres",
         lastName: "TresLastName",
         email: "user2@user.io",
         username: "FakeUser2",
         hashedPassword: bcrypt.hashSync("password3"),
       },
     ],
     {}
   );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
};
