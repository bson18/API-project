'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA //define schema in options obj
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 3,
        url: 'www.instagram.com/reviewimageaa'
      },
      {
        reviewId: 1,
        url: 'www.instagram.com/reviewimagestatueofliberty'
      },
      {
        reviewId: 2,
        url: 'www.instagram.com/reviewimagerams'
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
