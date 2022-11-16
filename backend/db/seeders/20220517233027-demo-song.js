"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Songs";
    await queryInterface.bulkInsert(options, [
      {
        // 1
        title: "First Song",
        description: "Clair De Lune",
        userId: 1,
        albumId: 1,
        url: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Clair+De+Lune.mp3",
        imageUrl: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/1.jfif",
      },
      {
        // 2
        title: "Twice Twice",
        description:
          "Double the pride, double the fall. Binary Sunset Theme but with more Binary and more Sunset",
        userId: 2,
        albumId: 2,
        url: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/The+Force+Suite.mp3",
        imageUrl: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/2.png",
      },
      {
        // 3
        title: "Trois",
        description: "Est-ce que vous parle francais? Gymnopedie",
        userId: 3,
        albumId: 3,
        url: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Gymnopedie.mp3",
        imageUrl: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/3.jfif",
      },
      {
        //4
        title: "Rusted Wheel",
        description:
          "The song is about stagnancy. About feeling like your life isn't moving whilst everything around you continues to do so. Seasons change (summer and winter) whilst the singer remains still, like a rusted wheel planted in the ground.",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/08+Rusted+Wheel.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 5
        title: "Dream At Tempo 119",
        description:
          "Dream at Tempo 119 · Silversun Pickups. ℗ 2006 Dangerbird Records ℗ 2006 Dangerbird Records LLC Released on: 2006-07-25 Music Publisher: Silversun Pickups Music (ASCAP) Music Publisher: Boredom Mending Music (BMI)",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/09+Dream+At+Tempo+119.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 6
        title: "Panic Switch",
        description:
          "It was the first single released from the group's second album, Swoon (2009), on March 17, 2009. “Panic Switch” could be about someone going through an anxiety attack, or otherwise having a very bad, sleepless day for whatever reason.",
        userId: 4,
        albumId: 5,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Swoon/05+Panic+Switch.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
      },
      {
        // 7
        title: "Growing Old Is Getting Old",
        description:
          "Inspired by the band's experiences performing live for a long time, which in turn has allowed them to reflect on what they've done and want to do. It's about realizing that we are getting older, and that death, inevitably, is coming for us.",
        userId: 4,
        albumId: 5,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Swoon/03+Growing+Old+Is+Getting+Old.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
      },
      {
        // 8
        title: "Bittersweet Symphony",
        description:
          "The “Bitter Sweet Symphony” which the lead singer is referring to is life itself.  He considers the whole experience to be “bittersweet” as he perceives it as one where you ceaselessly toil to make “ends meet” only to die in the end.",
        userId: 5,
        url: "https://soundcloudmisc.s3.us-east-2.amazonaws.com/01+Bitter+Sweet+Symphony.mp3",
        imageUrl:
          "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Uknown+Album.png",
      },
      {
        // 9
        title: "Melatonin",
        description:
          "This song is about a dream that the singer had after taking melatonin to combat his insomnia.",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/01+Melatonin.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 10
        title: "Waste It On",
        description:
          "LICENSES The Orchard Music, INgrooves (on behalf of MapleMusic Recordings); Tangible Medium Publishing, LatinAutorPerf, BMI - Broadcast Music Inc., and 5 Music Rights Societies",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/06+Waste+It+On.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 11
        title: "Future Foe Scenarios",
        description:
          "We love each other now but there is a strong chance that we will be foes in the future.",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/05+Future+Foe+Scenarios.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 12
        title: "Lazy Eye",
        description:
          "“Lazy Eye” is about someone that loves someone else and at first was hesitant about doing so due to their imperfections, but eventually comes around to loving them anyway.",
        userId: 4,
        albumId: 4,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Carnavas/07+Lazy+Eye.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Carnavas.jfif",
      },
      {
        // 13
        title: "The Royal We",
        description:
          "With lyrics as vicious as their sharp growling guitars, Silversun Pickups' third single off Swoon along with “Panic Switch” helped cement the band in the alternative scene while capturing mainstream success.",
        userId: 4,
        albumId: 5,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Swoon/02+The+Royal+We.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
      },
      {
        // 14
        title: "Catch and Release",
        description: "Follow me",
        userId: 4,
        albumId: 5,
        url: "https://sspu.s3.us-east-2.amazonaws.com/sspu_music/Swoon/09+Catch+%26+Release.mp3",
        imageUrl: "https://sspu.s3.us-east-2.amazonaws.com/SSPU_Swoon.jfif",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Songs";
    await queryInterface.bulkDelete(options, null, {});
  },
};
