'use strict';
module.exports = (sequelize, DataTypes) => {
  var RecipeIngredient = sequelize.define('RecipeIngredient', {
    RecipeId: DataTypes.INTEGER,
    IngredientId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  RecipeIngredient.associate = function(models) {
    // associations can be defined here
  };
  return RecipeIngredient;
};