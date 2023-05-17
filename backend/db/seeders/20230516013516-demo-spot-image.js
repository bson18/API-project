'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA //define schema in options obj
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'www.appacademy.io/image',
        preview: true
      },
      {
        spotId: 2,
        url: 'www.statueofliberty.com/image',
        preview: true
      },
      {
        spotId: 3,
        url: 'www.rams.gone/image',
        preview: true
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['www.appacademy.io/image', 'www.statueofliberty.com/image', 'www.rams.gone/image'] }
    }, {});
  }
};
