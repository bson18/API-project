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
        city: 'La Grange',
        state: 'California',
        country: 'United States',
        lat: 37.7645358,
        lng: -80.4730327,
        name: 'Bell-Zwart Lodge',
        description: 'Getaway to the Bell-Zwart Lodge located on a working cattle ranch in La Grange, CA.',
        price: 257,
        ownerId: 1
      },
      {
        address: '123 Mountain Cove',
        city: 'Gaviota',
        state: 'California',
        country: 'United States',
        lat: 54.7645358,
        lng: -50.4730327,
        name: 'The Farmhouse',
        description: 'This country home is located in the beautiful hills near Nojoqui Falls park!',
        price: 650,
        ownerId: 2
      },
      {
        address: '7334 Outside Drive',
        city: 'Pioneertown',
        state: 'California',
        country: 'United States',
        lat: 34.7645358,
        lng: 43.4730327,
        name: 'Sol to Soul',
        description: 'We invite you to experience the otherworldly at Sol to Soul, a private 10-acre sanctuary in a mystical theater of boulders.',
        price: 487,
        ownerId: 3
      },
      {
        address: '4738 Walking Street',
        city: 'Big Bear Lake',
        state: 'California',
        country: 'United States',
        lat: 54.7645358,
        lng: -83.4730327,
        name: 'The Baby Bear Haus',
        description: 'Experience the ultimate in mountain living at The Baby Bear Haus.',
        price: 181,
        ownerId: 1
      },
      {
        address: '4738 Wilderness Lane',
        city: 'Smartsville',
        state: 'California',
        country: 'United States',
        lat: 57.7645358,
        lng: 23.4730327,
        name: 'Pipi House',
        description: 'Welcome to Pipi House!  This property is one of the most stunning properties in the Gold Country!',
        price: 450,
        ownerId: 2
      },
      {
        address: '445 Desert Lane',
        city: 'Joshua Tree',
        state: 'California',
        country: 'United States',
        lat: 17.7645358,
        lng: 54.4730327,
        name: 'The Dome',
        description: 'Re-energize in solace under the desert sky in this modern-bohemian dome.',
        price: 128,
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
