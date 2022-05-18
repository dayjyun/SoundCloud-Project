'use strict';

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
    await queryInterface.bulkInsert("Songs", [
      { // 1
        title: "First Song",
        description: "My First Song",
        userId: 1,
        albumId: 1,
      },
      { // 2
        title: "Twice Twice",
        description: "Double the pride, double the fall",
        userId: 2,
        albumId: 2,
      },
      { // 3
        title: "Trois",
        description: "Est-ce que vous parle francais?",
        userId: 3,
        albumId: 3,
      },
      { //4
        title: "Rusted Wheel",
        description: "Good melody",
        userId: 4,
        albumId: 4,
      },
      { // 5
        title: "Dream At Tempo 119",
        description: "Fast paced, spooky",
        userId: 4,
        albumId: 4,
      },
      { // 6
        title: "Panic Switch",
        description: "Can you sleep fall asleep with a panic switch?",
        userId: 4,
        albumId: 5,
      },
      { // 7
        title: "Growing Old Is Getting Old",
        description: "Smooth intro",
        userId: 4,
        albumId: 5,
      },
      { // 8
        title: "Bittersweet Symphony",
        description: "Sued by The Rolling Stones",
        userId: 5,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Songs', null, {})
  }
};
