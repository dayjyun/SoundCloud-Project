"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      Playlist.belongsToMany(models.Song, {
        through: "PlaylistSong",
        otherKey: "songId",
        foreignKey: "playlistId",
      }),
        Playlist.belongsTo(models.User, {
          foreignKey: "userId",
        });
    }
  }
  Playlist.init(
    {
      name: {
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
    },
    {
      sequelize,
      modelName: "Playlist",
    }
  );
  return Playlist;
};
