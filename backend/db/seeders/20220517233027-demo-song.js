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
        imageUrl: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/1.jfif",
      },
      {
        // 2
        title: "Twice Twice",
        description: "Double the pride, double the fall",
        userId: 2,
        albumId: 2,
        url: "asdf",
        imageUrl: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/2.png",
      },
      {
        // 3
        title: "Trois",
        description: "Est-ce que vous parle francais?",
        userId: 3,
        albumId: 3,
        url: "asdf",
        imageUrl: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/3.jfif",
      },
      {
        //4
        title: "Rusted Wheel",
        description: "Good melody",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/08+Rusted+Wheel.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 5
        title: "Dream At Tempo 119",
        description: "Fast paced, spooky",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/09+Dream+At+Tempo+119.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 6
        title: "Panic Switch",
        description: "Can you sleep fall asleep with a panic switch?",
        userId: 4,
        albumId: 5,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Swoon/05+Panic+Switch.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
      },
      {
        // 7
        title: "Growing Old Is Getting Old",
        description: "Smooth intro",
        userId: 4,
        albumId: 5,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Swoon/03+Growing+Old+Is+Getting+Old.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
      },
      {
        // 8
        title: "Bittersweet Symphony",
        description: "Sued by The Rolling Stones",
        userId: 5,
        url: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/01+Bitter+Sweet+Symphony.mp3",
        imageUrl:
          "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Uknown+Album.png",
      },
      {
        // 9
        title: "Melatonin",
        description: "Smooth intro",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/01+Melatonin.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 10
        title: "Waste It On",
        description: "Nice Bass",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/06+Waste+It+On.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 11
        title: "Future Foe Scenarios",
        description: "Niiice",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/05+Future+Foe+Scenarios.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 12
        title: "Lazy Eye",
        description: "Great Success",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/07+Lazy+Eye.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
      },
      {
        // 13
        title: "The Royal We",
        description: "Part 2 of track 1",
        userId: 4,
        albumId: 5,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Swoon/02+The+Royal+We.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
      },
      {
        // 14
        title: "Catch and Release",
        description: "Checkout the strings",
        userId: 4,
        albumId: 5,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Swoon/09+Catch+%26+Release.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {})
  }
};
