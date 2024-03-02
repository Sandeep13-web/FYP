'use strict';

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([

      queryInterface.sequelize.query("ALTER TABLE translations ALTER COLUMN word TYPE text USING word::text;", {returning: true}),
      queryInterface.sequelize.query(" ALTER TABLE translations ALTER COLUMN \"translation\" TYPE text USING \"translation\"::text;", {returning: true})
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.sequelize.query("ALTER TABLE translations ALTER COLUMN word TYPE text USING word::text;", {returning: true}),
      queryInterface.sequelize.query(" ALTER TABLE translations ALTER COLUMN \"translation\" TYPE text USING \"translation\"::text;", {returning: true})
    ]);
  }
};
