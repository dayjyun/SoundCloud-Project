'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this;
      return { id, username, email };
    }
    validatePassword(password) {
      
    }
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email')
          }
        }
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
