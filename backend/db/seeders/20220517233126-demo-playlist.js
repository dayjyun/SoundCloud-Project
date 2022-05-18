'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Playlists', [
     { // 1
      name: 'Top Songs by Me',
      userId: 6,
     },
     { // 2
      name: 'My Playlist',
      userId: 1
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Playlists", null, {})
  }
};
