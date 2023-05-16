'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA //define schema in options obj
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 123,
        ownerId: 1
      },
      {
        address: '123 Dark Drive',
        city: 'New York City',
        state: 'New York',
        country: 'United States of America',
        lat: 54.7645358,
        lng: -50.4730327,
        name: 'Statue of Liberty',
        description: 'Big Statue Lady',
        price: 450,
        ownerId: 2
      },
      {
        address: '7334 Nowhere Road',
        city: 'St. Louis',
        state: 'Missouri',
        country: 'United States of America',
        lat: 34.7645358,
        lng: 43.4730327,
        name: 'Rams Center',
        description: 'Ghost town',
        price: 75,
        ownerId: 3
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['App Academy', 'Statue of Liberty', 'Rams Center'] }
    }, {});
  }
};
