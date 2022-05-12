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
   return queryInterface.bulkInsert('Users', [
     {
       email: 'demo@user.io',
       username: 'Demo-lition',
       hashedPassword: bcrypt.hashSync('password')
     },
     {
       email: "user1@user.io",
       username: 'FakeUser1',
       hashedPassword: bcrypt.hashSync('password2')
     },
     {
       email: 'user2@user.io',
       username: 'FakeUser2',
       hashedPassword: bcrypt.hashSync('password3')
     }
   ], {})
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
