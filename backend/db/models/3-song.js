"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {
      Song.belongsToMany(models.Playlist, {
        through: "PlaylistSong",
        otherKey: "playlistId",
        foreignKey: "songId"
      }),
        Song.belongsTo(models.User, {
          foreignKey: "userId",
          as: "Artist"
        }),
        Song.belongsTo(models.Album, { foreignKey: "albumId" }),
        Song.hasMany(models.Comment, {
          foreignKey: "songId",
        });
    }
  }
  Song.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
      },

      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      imageUrl: {
        type: DataTypes.STRING,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      albumId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
