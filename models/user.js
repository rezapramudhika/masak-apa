'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: {
      type:DataTypes.STRING,
      validate: {
        // notNull: {
        //   args: true,
        //   msg: "Name cannot be empty"
        // },
        isAlphanumeric: {
          args: true,
          msg: "You cannot use special character for Name"
        }
      }
    },
    lastName: {
      type:DataTypes.STRING,
      validate: {
        // notNull: {
        //   args: true,
        //   msg: "Name cannot be empty"
        // },
        isAlphanumeric: {
          args: true,
          msg: "You cannot use special character for Name"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        // notNull: {
        //   args:true,
        //   msg: "email cannot be empty"
        // },
        isEmail: true,
        isUnique(value, next) {
          console.log(value)
          User.findAll({where: {email: value}})
          .then(data => {
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
        // notNull: {
        //   args: true,
        //   msg: "password cannot be empty"
        // },
        len: {
          args: [5,255],
          msg: "Password length must be at least 5 character"
        }
      }
    }
  }, {
    hooks: {
      beforeDestroy: (instance, options) => {
        let userId = instance.id;
        sequelize.models.UserIngredient.destroy({where: {UserId:userId}})
        .then(() => {})
        .catch(err => {console.log(err)})
      }
    }
  });
  User.associate = function(models) {
    User.belongsToMany(models.Ingredient, {through: models.UserIngredient});
    User.hasMany(models.UserIngredient);
  };

  User.prototype.fullName = function () {
    return `${this.firstName} ${this.lastName}`
  }
  return User;
};