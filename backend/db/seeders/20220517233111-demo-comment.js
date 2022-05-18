'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Comments', [
     { // 1
       body: 'Good first song! Good first song!',
       userId: 2,
       songId: 1,
     },
     { // 2
       body: 'Jaime le chanson!!!',
       userId: 3,
       songId: 8,
     },
     { // 3
       body: "I don't know what they're saying but I like it",
       userId: 1,
       songId: 3,
     },
     { // 4
       body: 'I luv it <3',
       userId: 1,
       songId: 4,
     },
     { // 5
       body: 'I wish I thought of this song! If only I thought of this song',
       userId: 2,
       songId: 8,
     },
     { // 6
       body: 'Too long',
       userId: 6,
       songId: 2,
     },
     { // 7
       body: 'I enjoy the build up',
       userId: 1,
       songId: 7,
     },
     { // 8
       body: 'My favorite!',
       userId: 6,
       songId: 8,
     },
     { // 9
       body: 'Nice track',
       userId: 5,
       songId: 6,
     },
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {})
  }
};
