'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    instruction: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Recipe.associate = function(models) {
    Recipe.belongsToMany(models.Ingredient, {through: models.RecipeIngredient});
    Recipe.hasMany(models.RecipeIngredient);
  };
  return Recipe;
};