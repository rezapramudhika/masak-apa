'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('RecipeIngredients', [{
      RecipeId: 2,
      IngredientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      RecipeId: 2,
      IngredientId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      RecipeId: 2,
      IngredientId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      RecipeId: 3,
      IngredientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      RecipeId: 3,
      IngredientId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      RecipeId: 3,
      IngredientId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
