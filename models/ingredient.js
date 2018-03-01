'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Recipe, {through: models.RecipeIngredient});
    Ingredient.hasMany(models.RecipeIngredient);
  };
  return Ingredient;
};