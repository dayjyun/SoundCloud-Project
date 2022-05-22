'use strict';

const { Model, Validator, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, username, email } = this;
      return { id, firstName, lastName, username, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }
    static associate(models) {
      User.hasMany(models.Album, { foreignKey: "userId" });
      User.hasMany(models.Comment, { foreignKey: "userId" });
      User.hasMany(models.Playlist, { foreignKey: "userId" });
      User.hasMany(models.Song, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "Characters need to be alphabetical",
          },
          len: [1, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "Characters need to be alphabetical",
          },
          len: [1, 50],
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ["hashedPassword", "imageUrl", "username", "createdAt", "updatedAt"],
          },
        },
        loginUser: {
          attributes: {
            include: ['firstName', 'lastName', 'userName', 'email']
          },
        },
      },
    }
  );
  return User;
};
