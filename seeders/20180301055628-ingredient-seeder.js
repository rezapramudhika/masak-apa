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
    return queryInterface.bulkInsert('Ingredients', [{
      name: 'Egg',
      metric: 'pc',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Milk',
      metric: 'ml',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Butter',
      metric: 'tsp',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Rice',
      metric: 'cup',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Oil',
      metric: 'ml',
      image: '',
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
