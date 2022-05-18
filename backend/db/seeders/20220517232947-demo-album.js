'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Albums', [
     { // 1
       title: 'Demo Album',
       description: 'My First Demo Album',
       userId: 1
     },
     { // 2
      title: "Ready Player 2",
      description: 'Dedicated to Luigi Players in Mario Games',
      userId: 2
     },
     { // 3
      title: "Third Time Is The Charm",
      description: 'For my 3 fans',
      userId: 3
     },
     { // 4
      title: 'Carnavas',
      description: 'Contains songs like Rusted Wheel and Dream At Tempo 119 ',
      userId: 4
     },
     { // 5
      title: "Swoon",
      description: "Contains songs like Panic Switch and Growing Old Is Getting Old",
      userId: 4
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Albums', null, {})
  }
};
