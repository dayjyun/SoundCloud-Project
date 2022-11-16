"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Playlists'
    await queryInterface.bulkInsert(options, [
      {
        // 1
        name: "Top Songs by Me",
        userId: 1,
        imageUrl: "image url",
      },
      {
        // 2
        name: "My Playlist",
        userId: 2,
        imageUrl: "image url",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    await queryInterface.bulkDelete(options, null, {});
  },
};
