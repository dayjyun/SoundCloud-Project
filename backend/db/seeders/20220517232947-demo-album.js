'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Albums", [
     {
       // 1
       title: "Demo Album",
       description: "My First Demo Album",
       userId: 1,
       imageUrl: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/1.jfif",
     },
     {
       // 2
       title: "Ready Player 2",
       description: "Dedicated to all the Luigi Players in Mario Games",
       userId: 2,
       imageUrl: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/2.png",
     },
     {
       // 3
       title: "Third Time Is The Charm",
       description: "For my 3 fans",
       userId: 3,
       imageUrl: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/3.jfif",
     },
     {
       // 4
       title: "Carnavas",
       description:
         "Carnavas is the debut studio album by alternative band Silversun Pickups.",
       userId: 4,
       imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
     },
     {
       // 5
       title: "Swoon",
       description:
         "Swoon is the second full-length studio album by Los Angeles alternative rock band Silversun Pickups.",
       userId: 4,
       imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Albums', null, {})
  }
};
