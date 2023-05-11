'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA //define schema in options obj
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo1@user.com',
        username: 'demo1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'demo2@user.com',
        username: 'demo2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'bson@bson.com',
        username: 'bson',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demo1', 'demo2', 'bson'] }
    }, {});
  }
};
