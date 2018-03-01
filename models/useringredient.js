'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserIngredient = sequelize.define('UserIngredient', {
    UserId: DataTypes.INTEGER,
    IngredientId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  UserIngredient.associate = function(models) {
    UserIngredient.belongsTo(models.User);
    UserIngredient.belongsTo(models.Ingredient);
  };

  UserIngredient.getIngredientId = function(id){
    return new Promise(function(resolve,reject){
      UserIngredient.findAll({
        where : {UserId :  id}
        ,raw:true
      })
      .then(ingredientId => {
        resolve(ingredientId);
      })
      .catch(err => {
        reject(err);
      })
    })
  }

  return UserIngredient;
};