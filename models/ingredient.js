'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Recipe, {through: models.RecipeIngredient});
    Ingredient.belongsToMany(models.User, {through: models.UserIngredient});
    Ingredient.hasMany(models.RecipeIngredient);
    Ingredient.hasMany(models.UserIngredient);
  };
  return Ingredient;
};