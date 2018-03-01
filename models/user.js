'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type:DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "Name cannot be empty"
        },
        isAlphanumeric: {
          args: true,
          msg: "You cannot use special character for Name"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        notNull: {
          args:true,
          msg: "email cannot be empty"
        },
        isEmail: true,
        isUnique(value, next) {
          console.log(value)
          User.findAll({where: {email: value}})
          .then(data => {
            // console.log(data)
            if(data.length > 0) {
              next("This email already registered")
            } else {
              next();
            }
          })
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "password cannot be empty"
        },
        len: {
          args: [5,255],
          msg: "Password length must be at least 5 character"
        }
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};