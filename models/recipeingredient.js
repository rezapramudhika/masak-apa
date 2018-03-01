'use strict';
module.exports = (sequelize, DataTypes) => {
  var RecipeIngredient = sequelize.define('RecipeIngredient', {
    RecipeId: DataTypes.INTEGER,
    IngredientId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  RecipeIngredient.associate = function(models) {
    RecipeIngredient.belongsTo(models.Recipe);
    RecipeIngredient.belongsTo(models.Ingredient);
  };
  return RecipeIngredient;
};