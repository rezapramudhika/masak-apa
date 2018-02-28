'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserIngredient = sequelize.define('UserIngredient', {
    UserId: DataTypes.INTEGER,
    IngredientId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  UserIngredient.associate = function(models) {
    // associations can be defined here
  };
  return UserIngredient;
};