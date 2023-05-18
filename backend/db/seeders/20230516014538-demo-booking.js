'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA //define schema in options obj
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 3,
        startDate: '2021-05-25',
        endDate: '2021-05-30',
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2021-06-25',
        endDate: '2021-06-30',
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2021-07-25',
        endDate: '2021-07-30',
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
