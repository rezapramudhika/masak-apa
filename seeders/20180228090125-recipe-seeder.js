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
    return queryInterface.bulkInsert('Recipes', [{
      name: 'Basic Scrambled Eggs',
      instruction: '1. Beat eggs, milk, salt and pepper in medium bowl until blended.\n2. Heat butter in large nonstick skillet over medium heat until hot. Pour in egg mixture. As eggs begin to set, gently pull the eggs across the pan with a spatula, forming large soft curds.\n3. Continue cooking – pulling, lifting and folding eggs – until thickened and no visible liquid egg remains. Do not stir constantly. Remove from heat. Serve immediately.',
      image: 'https://imgur.com/gcvfGD9',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Fried Rice',
      instruction: '1. In a saucepan, combine rice and water. Bring to a boil. Reduce heat, cover, and simmer for 20 minutes.\n2. In a small saucepan, boil carrots in water about 3 to 5 minutes. Drop peas into boiling water, and drain.\n3. Heat wok over high heat. Pour in oil, then stir in carrots and peas; cook about 30 seconds. Crack in eggs, stirring quickly to scramble eggs with vegetables. Stir in cooked rice. Shake in soy sauce, and toss rice to coat. Drizzle with sesame oil, and toss again.',
      image: 'https://imgur.com/FDosMns',
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
