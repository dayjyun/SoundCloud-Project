'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Songs", [
      {
        // 1
        title: "First Song",
        description: "My First Song",
        userId: 1,
        albumId: 1,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 2
        title: "Twice Twice",
        description: "Double the pride, double the fall",
        userId: 2,
        albumId: 2,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 3
        title: "Trois",
        description: "Est-ce que vous parle francais?",
        userId: 3,
        albumId: 3,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        //4
        title: "Rusted Wheel",
        description: "Good melody",
        userId: 4,
        albumId: 4,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 5
        title: "Dream At Tempo 119",
        description: "Fast paced, spooky",
        userId: 4,
        albumId: 4,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 6
        title: "Panic Switch",
        description: "Can you sleep fall asleep with a panic switch?",
        userId: 4,
        albumId: 5,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 7
        title: "Growing Old Is Getting Old",
        description: "Smooth intro",
        userId: 4,
        albumId: 5,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 8
        title: "Bittersweet Symphony",
        description: "Sued by The Rolling Stones",
        userId: 5,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 9
        title: "Melatonin",
        description: "Smooth intro",
        userId: 4,
        albumId: 4,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 10
        title: "Waste It On",
        description: "Nice Bass",
        userId: 4,
        albumId: 4,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 11
        title: "Future Foe Scenarios",
        description: "Niiice",
        userId: 4,
        albumId: 4,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 12
        title: "Lazy Eye",
        description: "Great Success",
        userId: 4,
        albumId: 4,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 13
        title: "The Royal We",
        description: "Part 2 of track 1",
        userId: 4,
        albumId: 5,
        url: "asdf",
        imageUrl: "image url",
      },
      {
        // 14
        title: "Catch and Release",
        description: "Checkout the strings",
        userId: 4,
        albumId: 5,
        url: "asdf",
        imageUrl: "image url",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {})
  }
};
