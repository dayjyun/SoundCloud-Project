"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs'
    await queryInterface.bulkInsert(options, [
      {
        playlistId: 1,
        songId: 4,
      },
      {
        playlistId: 1,
        songId: 5,
      },
      {
        playlistId: 1,
        songId: 6,
      },
      {
        playlistId: 1,
        songId: 7,
      },
      {
        playlistId: 1,
        songId: 8,
      },
      {
        playlistId: 2,
        songId: 1,
      },
      {
        playlistId: 2,
        songId: 2,
      },
      {
        playlistId: 2,
        songId: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs'
    await queryInterface.bulkDelete(options, null, {});
  },
};
