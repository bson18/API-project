'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA //define schema in options obj
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 3,
        review: 'Great place',
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Nice view',
        stars: 4
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Pretty empty',
        stars: 1
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
