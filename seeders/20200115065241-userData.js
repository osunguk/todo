'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
        username: 'test1',
        password: 'test1',
        salt: 'test1',
        email: 'test@test.com',
        createdAt: "2020-01-01",
        updatedAt: "2020-01-01"
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
