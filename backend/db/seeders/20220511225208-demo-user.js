"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.bulkInsert(
      options,
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
          username: "demouser2",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl: "image url",
        },
        {
          // 3
          firstName: "Tres",
          lastName: "TresLastName",
          email: "user2@user.io",
          username: "demouser3",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl: "image url",
        },
        {
          // 4
          firstName: "Bryan",
          lastName: "Aubert",
          email: "sspu@sspu.com",
          username: "demouser4",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl: "image url",
        },
        {
          // 5
          firstName: "Richard",
          lastName: "Ashcroft",
          email: "theverve@verve.com",
          username: "demouser5",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl: "image url",
        },
        {
          // 6
          firstName: "Kevin",
          lastName: "Barrios",
          email: "fake@email.com",
          username: "demouser6",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl: "image url",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete('Users', {
    //   username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    // }, {})
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, null, {});
  },
};
